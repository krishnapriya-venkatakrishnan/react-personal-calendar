import React, {useState} from "react";

export default function NotesComponent({selectedDate, setDisplayNote, monthData, updateMonthDataFromNotes}){
    
    const [formData, setFormData] = useState({
        notes: monthData.notes ? monthData.notes : "",
        hadExercised: monthData.hadExercised ? monthData.hadExercised : false
    })
    
    function handleSubmit(event){
        event.preventDefault()
        updateMonthDataFromNotes(formData)
        setDisplayNote(false)
    }

    function handleChange(event){
        const {name, type, value, checked} = event.target

        setFormData(prevFormData => {
            return ({
                ...prevFormData,
                [name] : type === "checkbox" ? checked : value
            })
        })

    }

    function closeNote(){
        setDisplayNote(false)
    }
    
    return (
        <>
        <div className="top">
            <h1>{selectedDate}</h1>
            <button onClick={closeNote} className="close-btn">x</button>
        </div>
        <form onSubmit={handleSubmit}>
            <textarea
            name="notes"
            value={formData.notes}
            placeholder="Workout diary..."
            onChange={handleChange}
            ></textarea>
            <div className="inp-chk">
            <input type="checkbox"
            checked={formData.hadExercised}
            name="hadExercised"
            onChange={handleChange}
            />Did you workout? 💪🏻🎖️
            </div>
            <button className="submit-btn" type="submit">Submit</button>
        </form>
        </>
    )
}