import { useEffect, useRef } from "react";
import "../CssFiles/classSchedule.css";

const ScheduleClass = () => {
    useEffect(()=>{
        document.title = "Schedule Class"

        updateTiming();
    })

    const startTimeRef = useRef();

    const endTimeRef = useRef();

    const loadingRef = useRef();

    const errorMessageRef = useRef(); 

    const scheduleButtonRef = useRef();

    async function updateStudents(startTimeMilliSeconds, endTimeMilliSeconds){
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "key=AAAAGzWyGJA:APA91bEI_icowhzLRvVlFzLQNMGkm6LL_h7_J8a9AyXeXlL1NKO6qMHGYmkuC-BBTQU7sB6nBhktVxxho2yxKRtF3QnGW3_VnekHA3E2gHGVc-I0XXbcXfSGome9aH7zDYB5nYaSb_HG");

        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "to": "cN0UTiZDTvqkbpcB-Bd_Aw:APA91bFZa94KzQwQjzvfaffqYPo6H8pz7fauArXWHtS0I10vc1B9FWBOhG84ABUqcy0Bb6Fv6TltpSQyfOH6Bx6nyUD4QVlZbAoZaYuzBge-tKzGeMGfDxmsHCHYKykNOmU0CF2z0c6N",
          "collapse_key": "type_a",
          "data": {
            "start": startTimeMilliSeconds,
            "end": endTimeMilliSeconds
          }
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
          .then(response => response.text())
          .then(result => {
                scheduleButtonRef.current.classList.remove("show_loader");

                errorMessageRef.current.classList.remove("show_loader");

                loadingRef.current.classList.add("show_loader");
            }
          )
          .catch(error => console.log('error', error));
    }

    function updateTiming(){
        if(startTimeRef.current !== undefined){
            let startTime = startTimeRef.current

            let endTime = endTimeRef.current
            
            const date = new Date();
    
            let currentDate = date.toJSON();
    
            startTime.value = currentDate.split(".")[0].slice(0, -3);
    
            startTime.min = currentDate.split(".")[0].slice(0, -3);
    
            var d1 = new Date ();
    
            var d2 = new Date (d1);
    
            d2.setMinutes(d1.getMinutes() + 30);
    
            endTime.value = d2.toJSON().split(".")[0].slice(0, -3);
    
            endTime.min = d2.toJSON().split(".")[0].slice(0, -3);
        }
    }

    function sendClassSchedule(e){
        e.preventDefault();

        let loading = loadingRef.current;

        var startTimeMilliSeconds = new Date(startTimeRef.current.value).getTime();

        var endTimeMilliSeconds = new Date(endTimeRef.current.value).getTime();

        if(endTimeMilliSeconds - startTimeMilliSeconds <= 0){
            errorMessageRef.current.classList.remove("show_loader");

            errorMessageRef.current.innerHTML = "Ending of the meeting must be greater than the start time";
        }else if(endTimeMilliSeconds - startTimeMilliSeconds < 1800000){
            errorMessageRef.current.classList.remove("show_loader");

            errorMessageRef.current.innerHTML = "Meeting duration must last for at least 30 minutes";
        }else{
            //send to server
            scheduleButtonRef.current.classList.add("show_loader");

            errorMessageRef.current.innerHTML = ``;

            errorMessageRef.current.classList.add("show_loader");

            loading.classList.remove("show_loader");

            updateStudents(startTimeMilliSeconds, endTimeMilliSeconds);
        }
    }


    return ( 
        <div className="mainSchedulePage">
            <h2>Schedule Classes</h2>

            <label htmlFor="start-time">Choose a time for start of class:</label>

            <input 
                type="datetime-local" 
                id="start-time" 
                ref={startTimeRef}
                name="start-time" 
                defaultValue={"2022-02-20T00:00"} 
                min="2022-02-20T00:00"
            />

            <label htmlFor="end-time">Choose a time for end of class:</label>

            <input
                ref={endTimeRef}
                id="end-time"
                type="datetime-local"
                name="end-time"
                defaultValue={"2023-02-01T08:30"} 
            />  

            <button ref={scheduleButtonRef} onClick={(e)=>{sendClassSchedule(e)}}>Schedule</button>

            <p className="schedule_error_message" ref={errorMessageRef}></p>

            <div style={{marginBottom: "3vh"}} className="loading show_loader" ref={loadingRef}></div>
        </div>
    );
}
 
export default ScheduleClass;