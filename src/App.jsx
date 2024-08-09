import React, { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import NotesComponent from "./NotesComponent"

export default function App(){

    const [displayNote, setDisplayNote] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")
    const [monthData, setMonthData] = useState("")

    function updateDisplayNote(value){
        setDisplayNote(true)
        setSelectedDate(value)
    }

    function updateMonthData(data, value){
        if (!data?.notes && !data?.hadExercised){
            setMonthData({
                id: "",
                notes: "",
                hadExercised: false
            })
        } else
        
            setMonthData({
                notes: data.notes,
                hadExercised: data.hadExercised
            })
    }

    function updateMonthDataFromNotes(data){
        setMonthData({
            id: selectedDate.split('-')[0],
            notes: data.notes,
            hadExercised: data.hadExercised
        })
    }

    return (
        <>
        
        <div className="main-container">
            <div className="calendar-container">
                <CalendarComponent 
                updateDisplayNote={updateDisplayNote}
                updateMonthData={updateMonthData}
                monthData={monthData}
                />
            </div>
            
            {displayNote && 
            <div className="notes-container">
                <NotesComponent 
                selectedDate = {selectedDate}
                monthData={monthData}
                setDisplayNote = {setDisplayNote}
                updateMonthDataFromNotes = {updateMonthDataFromNotes}
                />
            </div>}
        </div>
        
        </>
    )
}