import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const VideoCallSection = () => {
    const { id } = useParams();

    const { roomusername } = useParams();

    var url = `ws://127.0.0.1:8000/ws/classroom/${id}/${roomusername}`;

    const [teacherName, setteacherName] = useState("Teacher's Name");

    const [enlargenTeacherVideo, setenlargenTeacherVideo] = useState(false);

    const [videoList, setVideoList] = useState([]);

    var teacherVideoRef = useRef(null);

    var studentVideosContainerRef = useRef(null);

    var userName = useRef();

    var token = useRef();

    var yourStudentIndex = useRef(0);

    var shouldSwitchPeerOfferToAnswer = useRef(false);

    var peerConnections = useRef([]);

    var yourStream = useRef();

    var nameOfTeacher = useRef(null);

    var screenShareVideoRef = useRef();

    var teacherScreenSharePeers = useRef([]);

    var studentScreenSharePeer = useRef(new RTCPeerConnection({
        configuration : {
          offerToReceiveAudio: false,
          offerToReceiveVideo: true
        },
        iceServers: [
          {
              urls: "stun:numb.viagenie.ca",
              username: "sultan1640@gmail.com",
              credential: "98376683"
          },
          {
              urls: "turn:numb.viagenie.ca",
              username: "sultan1640@gmail.com",
              credential: "98376683"
          }
      ]
      }));

    function shareTeacherScreen(){
        if(enlargenTeacherVideo === false){
            async function getTeacherDisplayMedia(){
                var displayMediaOptions = {
                    video: {
                        cursor: "always"
                    },
                    audio: false
                };
    
                var stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

                screenShareVideoRef.current.srcObject = stream;

                teacherScreenSharePeers.current.forEach((peerConnection)=>{
                    peerConnection.pc.addStream(stream);

                    peerConnection.pc.createOffer({
                        mandatory: {
                          offerToReceiveAudio: false,
                          offerToReceiveVideo: false
                        },
                      })
                      .then(sdp => {
                        peerConnection.pc.setLocalDescription(sdp);

                        chatSocket.current.send(JSON.stringify({
                            "screen_offer_negotiation": true,
                            "screen_offer_sdp": JSON.stringify(sdp),
                            "to_user": peerConnection.toUser
                        }));
                      }, e => {});
                })
    
                setenlargenTeacherVideo(true);
            }

            
            getTeacherDisplayMedia()
        }else{
            setenlargenTeacherVideo(false);
        }
        
    }

    const chatSocket = useRef(new WebSocket(url));

    useEffect(()=>{
        if(teacherVideoRef.current !== null && studentVideosContainerRef.current !== null){
            chatSocket.current.onopen = ((e)=>{
                if(token.current === undefined){
                    chatSocket.current.send(JSON.stringify({
                        "get_token": true,
                    }))
                }else{
                    chatSocket.current.send(JSON.stringify({
                        "new_user": true,
                        "token": token.current,
                    }));
                }
            })
    
            chatSocket.current.onmessage = ((e)=>{
                let data = JSON.parse(e.data);
    
                if(userName.current === undefined){
                    if(data["type"] === "new_token"){
                        userName.current = data["username"];
    
                        token.current = data["token"];
    
                        chatSocket.current.send(JSON.stringify({
                            "new_user": true,
                            "token": token.current,
                            "reload": data["reload"]
                        }));
                    }
                }
    
                if(data["type"] === "new_user"){
                    if(data["reload"] === true){
                        //For testing purposes I limited it to the amount that have a token this
                        //here is to ensure that it does not give you an error,again I will make it
                        //better this is purely for demonstration purposes

                        window.location.reload();
                    }

                    if(data["rank"] === "teacher"){
                        setteacherName(userName.current);

                        nameOfTeacher.current = userName.current
                    }else{
                        data["user_list"].forEach((user, index)=>{
                            if(user.rank === "teacher"){
                                setteacherName(user.user);

                                nameOfTeacher.current = user.user
                            }
    
                            if(userName.current === user.user){
                                yourStudentIndex.current = index
                            }
                        })
                    }
    
                    setVideoList(data["user_list"]);
                }

                if(data["type"] === "negotiation"){
                    if(data["user_name"] === userName.current){
                        peerConnections.current.forEach((peerConnection)=>{
                            if(peerConnection.type === "offer" && peerConnection.owner === userName.current){
                                peerConnection.pc.createOffer({
                                    mandatory: {
                                      offerToReceiveAudio: false,
                                      offerToReceiveVideo: true
                                    },
                                  })
                                  .then(sdp => {
                                    peerConnection.pc.setLocalDescription(sdp)

                                    chatSocket.current.send(JSON.stringify({
                                        "offer_negotiation": true,
                                        "name": userName.current,
                                        "offer_sdp": JSON.stringify(sdp),
                                        "to_user": peerConnection.toUser
                                    }));
                                  }, e => {})
                            }
                        })
                    }
                }

                if(data["type"] === "answer_offer_sdp"){
                    if(data["user_to_answer"] === userName.current){
                        peerConnections.current.forEach((peerConnection, index)=>{
                            if(peerConnection.toUser === data["user_offering"] && peerConnection.type === "answer" && data["user_to_answer"] === peerConnection.owner){
                                const desc = JSON.parse(data["offer_sdp"])

                                var answerSDP;

                                peerConnection.pc.setRemoteDescription(new RTCSessionDescription(desc))

                                peerConnection.pc.createAnswer({
                                    mandatory: {
                                      offerToReceiveAudio: false,
                                      offerToReceiveVideo: true
                                    }
                                })
                                .then(sdp => {
                                    peerConnection.pc.setLocalDescription(sdp);

                                    answerSDP = JSON.stringify(sdp);
                                }, e => {})

                                peerConnection.pc.onicecandidate = (e) => {
                                    if(e.candidate){
                                        chatSocket.current.send(JSON.stringify({
                                            "answer_negotiation_sdp_complete": true,
                                            "candidate": JSON.stringify(e.candidate),
                                            "answer_sdp": answerSDP,
                                            "to_user": peerConnection.toUser,
                                            "who_answered": peerConnection.owner
                                        }));
                                    }
                                }

                                peerConnection.pc.ontrack = (e) => {
                                    if(peerConnection.toUser === nameOfTeacher.current){
                                        var answerteachervideoContainer = teacherVideoRef.current

                                        answerteachervideoContainer.srcObject = e.streams[0];
                                    }else{
                                        var answervideoContainer = studentVideosContainerRef.current.children[index + 1].children[0].children[0];
    
                                        answervideoContainer.srcObject = e.streams[0];
                                    }
                                }
                            }
                        })
                    }
                }

                if(data["type"] === "offer_set_sdp"){
                    if(userName.current === data["to_user"]){
                        peerConnections.current.forEach((peerConnection, index)=>{
                            if(peerConnection.owner === userName.current && peerConnection.type === "offer" &&  data["who_answered"] === peerConnection.toUser){
                                const desc = JSON.parse(data["answer_sdp"]);

                                const candidate = JSON.parse(data["candidate"]);

                                peerConnection.pc.setRemoteDescription(new RTCSessionDescription(desc));
                                
                                peerConnection.pc.addIceCandidate(new RTCIceCandidate(candidate));

                                peerConnection.pc.ontrack = (e) => {
                                    if(peerConnection.toUser === nameOfTeacher.current){
                                        var videoContainer = teacherVideoRef.current

                                        videoContainer.srcObject = e.streams[0];
                                    }else{
                                        var studentvideoContainer = studentVideosContainerRef.current.children[index].children[0].children[0];
    
                                        studentvideoContainer.srcObject = e.streams[0];
                                    }
                                }
                            }
                        })
                    }
                }
                
                if(data["type"] === "screen_offer_negotiation"){
                    console.log("yooo")

                    if(data["to_user"] === userName.current){
                        const desc = JSON.parse(data["offer_sdp"]);

                        var answerSDP;

                        studentScreenSharePeer.current.setRemoteDescription(desc);

                        studentScreenSharePeer.current.createAnswer({
                            mandatory: {
                              offerToReceiveAudio: false,
                              offerToReceiveVideo: true
                            }
                        })
                        .then(sdp => {
                            studentScreenSharePeer.current.setLocalDescription(sdp);

                            answerSDP = JSON.stringify(sdp);
                        }, e => {});

                        studentScreenSharePeer.current.ontrack = (e) => {
                            screenShareVideoRef.current.srcObject = e.streams[0];
                        }

                        studentScreenSharePeer.current.onicecandidate = (e) => {
                            if(e.candidate){
                                chatSocket.current.send(JSON.stringify({
                                    "answer_negotiation_sdp_screenshot_complete": true,
                                    "candidate": JSON.stringify(e.candidate),
                                    "answer_sdp": answerSDP,
                                    "who_answered": data["to_user"]
                                }));

                                setenlargenTeacherVideo(true);
                            }
                        }
                    }
                }

                if(data["type"] === "screen_offer_set_sdp"){
                    teacherScreenSharePeers.current.forEach((peerConnection)=>{
                        if(peerConnection.toUser === data["to_user"]){
                            const desc = JSON.parse(data["answer_sdp"]);

                            const candidate = JSON.parse(data["candidate"]);

                            peerConnection.pc.setRemoteDescription(new RTCSessionDescription(desc));
                            
                            peerConnection.pc.addIceCandidate(new RTCIceCandidate(candidate));
                        }
                    })
                }

                if(data["type"] === "user_disconnected"){
                    //I felt too lazy to implement this part from scratch basically you get who disconnected
                    //here => data["user_disconnected"]
                    //I will work on a better approach in the future but for now I will simply restart the app
                    //on disconnection easy fix for project demo purposes, I will use SFU next time

                    // setVideoList(prevItems =>
                    //     prevItems.filter(item => item.user !== data["user_disconnected"])
                    // );

                    // Add Additional Error Handling for the future

                    window.location.reload();
                }
            })
        }
    }, [])

    useEffect(()=>{
        function setUpVideoPeerConnection(stream){
            videoList.forEach((user)=>{
                var addNewConnectionPeer = true;

                if(userName.current !== user.user){
                    peerConnections.current.forEach((peerConnection)=>{
                        if(peerConnection.toUser === user.user){
                            addNewConnectionPeer = false
                        }
                    })

                    if(addNewConnectionPeer){
                        var screenPC = new RTCPeerConnection({
                            configuration : {
                              offerToReceiveAudio: false,
                              offerToReceiveVideo: false
                            },
                            iceServers: [
                              {
                                  urls: "stun:numb.viagenie.ca",
                                  username: "sultan1640@gmail.com",
                                  credential: "98376683"
                              },
                              {
                                  urls: "turn:numb.viagenie.ca",
                                  username: "sultan1640@gmail.com",
                                  credential: "98376683"
                              }
                            ]
                          })

                        teacherScreenSharePeers.current.push({"toUser": user.user, "pc": screenPC})


                        var pc = new RTCPeerConnection({
                            configuration : {
                                offerToReceiveAudio: false,
                                offerToReceiveVideo: true
                            },
                            iceServers: [
                                {
                                    urls: "stun:numb.viagenie.ca",
                                    username: "sultan1640@gmail.com",
                                    credential: "98376683"
                                },
                                {
                                    urls: "turn:numb.viagenie.ca",
                                    username: "sultan1640@gmail.com",
                                    credential: "98376683"
                                }
                            ]
                        })

                        pc.addStream(stream)

                        var peerOfferOrAnswerType = "";

                        if(shouldSwitchPeerOfferToAnswer.current){
                            peerOfferOrAnswerType = "answer"; 
                        }else{
                            peerOfferOrAnswerType = "offer"
                        }

                        peerConnections.current.push({"toUser": user.user, "pc": pc, "type": peerOfferOrAnswerType, "owner": userName.current})
                    }
                }else{
                    shouldSwitchPeerOfferToAnswer.current = true
                }
            })

            if(peerConnections.current.length > 0){
                chatSocket.current.send(JSON.stringify({
                    "negotiation": true,
                    "name": userName.current
                }));
            }
        }

        async function getTeacherDisplayMedia(){
            var displayMediaOptions = {
                video: {
                    cursor: "always"
                },
                audio: false
            };

            var stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

            var videoContainer = teacherVideoRef.current

            videoContainer.srcObject = stream

            return stream;
        }

        async function fireTeacherDisplayMediaFunctions(){
            if(userName.current === teacherName && teacherVideoRef.current.srcObject === null){
                yourStream.current = await getTeacherDisplayMedia().catch(()=>{
                    console.log('errors with the media device')
                });
            }

            setUpVideoPeerConnection(yourStream.current);
        }

        if(videoList.length !== 0){
            if(yourStudentIndex.current !== 0){
                var yourStudentMedia = studentVideosContainerRef.current.children[yourStudentIndex.current].children[0].children[0].srcObject

                async function getYourStudentMediaDisplay(){
                    var displayMediaOptions = {
                        video: {
                            cursor: "always"
                        },
                        audio: false
                    };

                    var stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

                    var videoContainer = studentVideosContainerRef.current.children[yourStudentIndex.current].children[0].children[0];
    
                    videoContainer.srcObject = stream;

                    return stream;
                }

                async function fireStudentDisplayMediaFunctions(){
                    if(yourStudentMedia === null){
                        yourStream.current = await getYourStudentMediaDisplay().catch(() => {
                            console.log('errors with the media device')
                        });
                    }   

                    setUpVideoPeerConnection(yourStream.current);
                }

                fireStudentDisplayMediaFunctions();
            }else{
                fireTeacherDisplayMediaFunctions();
            }
        }

    }, [videoList, teacherName])

    return ( 
        <div className="mainVideoCallingSection">
            <h3 style={{textAlign: "center"}}>Video title of this lecture</h3>

            <div className="teacherVideoSection">
                <div className="teacherVideo" 
                    style={{
                        height: enlargenTeacherVideo === false? "250px" : "150px", 
                        width: enlargenTeacherVideo === false? "400px" : "200px"
                    }}>
                    {
                        <video autoPlay ref={teacherVideoRef}></video>
                    }
                </div>
                    
                <div className="screenShareVideo" 
                    style={{
                            display: enlargenTeacherVideo === false ? "none" : "block"
                        }}>
                        <video autoPlay ref={screenShareVideoRef}></video>
                </div>

                {
                    teacherName === userName.current ?

                    <div className="screenCastContainer" onClick={(e)=>{shareTeacherScreen()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="screencast"><rect width="256" height="256" fill="none"></rect><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="M31.99414 96V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8V200a8 8 0 0 1-8 8h-72M31.99414 192a16 16 0 0 1 16 16M31.99414 160a48 48 0 0 1 48 48M31.99414 128a80 80 0 0 1 80 80"></path></svg>
                    </div>

                    :
                    <p></p>
                }
            </div>

            <h3 style={{color: "dodgerblue", textAlign: "center", marginBottom: "15px", textTransform: "capitalize"}}>
                {
                    teacherName === userName.current ? `${teacherName} (Mine)` : teacherName
                }
            </h3>

            <div className="studentVideoSection">
                <div className="studentsJoinedVideoSection" ref={studentVideosContainerRef}>
                    {
                        videoList.map((data, index)=>
                            data.rank !== "teacher" ? <div key={index} className="studentVideo">
                                <div className="studentVideoContainer">
                                    <video autoPlay></video>
                                </div>
                                <h3 style={{color: "dodgerblue", textTransform: "capitalize"}}>
                                    {
                                        data.user === userName.current ? `${data.user} (Mine)` : data.user
                                    }
                                </h3>
                            </div> : <div key={index} style={{display: "none"}}></div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
 
export default VideoCallSection;