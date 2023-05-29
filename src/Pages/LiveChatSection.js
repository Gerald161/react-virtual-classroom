import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const LiveChatSection = () => {
    const messageOutputRef = useRef();

    const { id } = useParams();

    const messageInputRef = useRef();

    const formRef = useRef();

    var url = `ws://127.0.0.1:8000/ws/socket-server/`;

    const chatSocket = new WebSocket(url);

    // var username = JSON.parse(localStorage.getItem("username"))["username"];

    var username = useRef();

    function broadCastMessage(e){
        e.preventDefault();

        if(messageInputRef.current.value.length !== 0){
            chatSocket.send(JSON.stringify({
                "message": messageInputRef.current.value,
                "username": username.current
            }))

            formRef.current.reset();
        }
    }

    useEffect(()=>{
        getUsername().catch(error=>{
            console.log("Error likely internet connection")
        })

        chatSocket.onmessage = function(e){
            let data = JSON.parse(e.data)

            if(data["type"] === "chat"){
                messageOutputRef.current.innerHTML += `<p><strong>${data.username}: </strong> ${data.message}</p>`
            }else{
                // console.log(data)
            }
        }

    }, [])

    const API_HOST = 'http://127.0.0.1:8000';

    async function getUsername(){
        var response = await fetch(
            `${API_HOST}/classroom/getChatParticipant?room=${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                },
            }
        );

        if(response.ok){
            var data = await response.json();

            username.current = data["username"];
        }
    }

    return ( 
        <div className="questionSection">
            <h2>Class Chat</h2>

            <div className="message_content_section">
                <div id="chat-window">
                    <div id="output" ref={messageOutputRef}>
                        
                    </div>
                </div>

                <form ref={formRef} action="" onClick={(e)=>{broadCastMessage(e)}} className="messageForm">
                    <div className="message_compose_section">  
                        <input ref={messageInputRef} id="message" style={{margin: "0"}} type="text" placeholder="Message" />
                        <button id="send">Send</button>
                    </div>
                </form>
            </div>

        </div>
    );
}
 
export default LiveChatSection;