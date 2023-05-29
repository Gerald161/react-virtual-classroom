import "../CssFiles/calendar.css";
import { useRef, useEffect } from "react";

const Calendar = () => {
    useEffect(()=>{
        document.title = "Check schedule"

        updateCalendar();
    }, [])

    const yearInputRef = useRef();

    const monthInputRef = useRef();

    // Define custom events
    const events = [
        { date: '2023-02-14', title: 'Valentine\'s Day' },
        { date: '2023-03-17', title: 'St. Patrick\'s Day' },
        { date: '2023-04-01', title: 'April Fool\'s Day' },
        { date: '2023-05-11', title: "Baffoe's Birthday" },
        { date: '2023-05-01', title: 'May Day' },
    ];
    
    // Define weekday names
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get current date
    const today = new Date();

    var todaysDateCorrected = ""

    function updateCalendar(){
        // Get selected year and month
        if(yearInputRef.current !== undefined){
            if(todaysDateCorrected === ""){
                yearInputRef.current.value = today.getFullYear();
        
                monthInputRef.current.value = today.getMonth();
            }

            var year = parseInt(yearInputRef.current.value);

            var month = parseInt(monthInputRef.current.value);

            // Create calendar HTML
            let calendarHtml = '';

            // Add weekday headers
            weekdayNames.forEach((weekdayName) => {
                calendarHtml += `<div class="weekday">${weekdayName}</div>`;
            });

            // Get number of days in month
            const monthDays = new Date(year, month + 1, 0).getDate();

            // Get the day of the week of the first day of the month
            const firstDay = new Date(year, month, 1).getDay();

            // Add blank "placeholder" divs before the first day to align it with the appropriate weekday
            for (let i = 0; i < firstDay; i++) {
                calendarHtml += '<div class="day placeholder"></div>';
            }

            // Add days to calendar
            for (let i = 1; i <= monthDays; i++) {
                const date = new Date(year, month, i);

                const dateString = date.toISOString().slice(0, 10);

                let classNames = '';

                const event = events.find(e => e.date === dateString);

                if (event) {
                    classNames += 'event ';
                }

                var formattedDate = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1 }-${i < 10 ? `0${i}` : i}`

                if (dateString === today.toISOString().slice(0, 10)) {
                    classNames += 'today ';

                    todaysDateCorrected = formattedDate
                }

                if(month !== today.getMonth() || year !== today.getFullYear()){
                    todaysDateCorrected = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1 }-01`
                }

                console.log(todaysDateCorrected);

                calendarHtml += `<div class="${classNames}day" data-day=${formattedDate}>${i}${event ? ` (${event.title})` : ''}</div>`;
            }

            document.getElementById('calendar').innerHTML = calendarHtml;
        }
    }

    return ( 
        <div>
            <div className="monthYearContainer">
                <div>
                    <label htmlFor="year">Year:</label>
                    
                    <input type="number" onChange={(e)=>{updateCalendar()}} ref={yearInputRef} id="year" min="2023" max="2100" defaultValue={"2023"}/>
                </div>

                <div className="calendarSelectContainer">
                    <label htmlFor="month">Month:</label>

                    <select id="month" ref={monthInputRef} onChange={(e)=>{updateCalendar()}}>
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                </div>
            </div>

            <div id="calendar">
                <div className="weekday">Sunday</div>
                <div className="weekday">Monday</div>
                <div className="weekday">Tuesday</div>
                <div className="weekday">Wednesday</div>
                <div className="weekday">Thursday</div>
                <div className="weekday">Friday</div>
                <div className="weekday">Saturday</div>
            </div>
        </div>
    );
}
 
export default Calendar;