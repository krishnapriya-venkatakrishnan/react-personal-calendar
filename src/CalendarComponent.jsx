import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent({updateDisplayNote, updateMonthData, monthData}) {
    
    const [activeStartDate, setActiveStartDate] = useState(new Date())
    const year = activeStartDate.getFullYear()
    const month = activeStartDate.getMonth()

    // an array used to display the days title
    const daysArray = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

    // calculate the number of days in the selected month
    const datesInMonth = new Date(year, month+1, 0).getDate()
    
    const localStorageId = "workout-"+year+"-"+(month+1)
    
    // 
    // 
    // 
    // localStorage.clear(localStorageId)
    // 
    // 
    // 

    const [storageData, setStorageData] = useState(JSON.parse(localStorage.getItem(localStorageId)) || [])
    
    const [datesInMonthArray, setDatesInMonthArray] = useState(Array.from({ length: datesInMonth }, (_, index) => index + 1))
    
    if (monthData.id){
        const num = parseInt(monthData.id, 10)
        monthData.id = ""
        const updatedStorageData = datesInMonthArray.map((item, index) => {
            if (item === num)
                return {notes: monthData.notes, hadExercised: monthData.hadExercised}
            else if (storageData[index])
                return storageData[index]
            else {
                return {notes: "", hadExercised: false}
            }
        })
        setStorageData(updatedStorageData)
        localStorage.setItem(localStorageId, JSON.stringify(updatedStorageData))
    }
    
    useEffect(()=> {
        setStorageData(JSON.parse(localStorage.getItem(localStorageId)) || [])
        setDatesInMonthArray(Array.from({ length: datesInMonth }, (_, index) => index + 1))
    }, [activeStartDate])

    // looping index to point to the datesInMonthArray, while placing the values in the grid.
    let d = -1;

    // the dates are displayed in a grid.
    // it is 7 x 7 grid
    // initially set it up with null
    // then based on the selected month, display the dates under the respective days
    let initialDatesArrayEl = Array(42).fill(null)
    
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    function handleActiveStartDateChange({ activeStartDate }) {
        setActiveStartDate(activeStartDate) // setting this date, will re-render the component.
        // the selected month calendar is displayed.
    }

    // this is a hardcoded days array. this is displayed as title.
    const daysArrayEl = daysArray.map((day, index) =>  (<div key={index} className="days">{day}</div>))

    function checkIfWeekend(day, month, year){
        // this is specifically for displaying the weekend in red color.
        const testDate = new Date(year, month, day)
        const dayOfWeek = testDate.getDay()
        return dayOfWeek === 0 || dayOfWeek === 6
    }

    function displayNote(event){
        const id = event.target.id
        updateDisplayNote(id)
        const num = parseInt(id, 10)
        updateMonthData(storageData[num-1], num)
    }

    function onClickHeart(event) {
        event.stopPropagation()
    }
    
    const datesArrayEl = initialDatesArrayEl.map((initial, index) => {
        // display null values based on when the first day of the month.
        // if all the dates of the month are displayed, fill the grid with null values.

        if (
            (firstDayOfMonth === 0 && index < 6) ||
            (index < firstDayOfMonth-1) || 
            (d >= 0 && !datesInMonthArray[d])
        ){
            return (<div key={index} className='grid'>{initial}</div>)
        } else {
            // move the index of the datesInMonthArray 
            if (index >= firstDayOfMonth-1)
                d = d+1

            if (!datesInMonthArray[d])
                return
            // weekend dates are to be displayed in red color.
            let gridClass = checkIfWeekend(datesInMonthArray[d], month, year) ? "weekend" : ""
            return (
            <div key={index} className="grid">
                <button id={`${datesInMonthArray[d]}-${month+1}-${year}`}
                onClick={displayNote} 
                className={gridClass}
                >
                    {datesInMonthArray[d]}
                    {((storageData[d]?.hadExercised && storageData[d]?.notes) && 
                        <sub onClick={onClickHeart} className="heart">🧡</sub>)
                    ||
                    ((storageData[d]?.hadExercised && 
                        <sub onClick={onClickHeart} className="heart">🩷</sub>))
                    ||
                    (storageData[d]?.notes && 
                        <sub onClick={onClickHeart} className="heart">💛</sub>)
                    ||
                    (<sub onClick={onClickHeart} className="heart dummy">d.</sub>)
                    }
                    
                </button>
                
            </div>
            )
            
        }
    })

    return (
        <>
        <div>
            <Calendar 
            onActiveStartDateChange={handleActiveStartDateChange}
            />
            <div className="calendar">
                <div className="days-container">
                    {daysArrayEl}
                </div>
                <div className='dates-container'>
                    {datesArrayEl}
                </div>
            </div>
        </div>
        
    </>
    )
}

export default CalendarComponent
