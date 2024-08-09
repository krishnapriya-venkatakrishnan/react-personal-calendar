## React- Personal Calendar

### Overview
This is a personal calendar website, that uses react-calendar library. The user can save the workout information for the respective date.
Local storage holds the data.

### Tree view
Displayed using ReacTree

![Tree](https://github.com/user-attachments/assets/672af889-3789-4c88-9c16-f5034fad56c9)

### Components and its usage
- App: This parent component acts as a bridge to pass the data from CalendarComponent to NotesComponent and vice versa.
- CalendarComponent: This component uses "react-calendar" to maintain the logic of traversing through the months and years.
  This component handles the logic of displaying the dates and the indication, that the user has exericed(pink colored heart),
  or has noted down something(yellow colored heart) or both(orange colored heart).
  When a date is selected, it shares the selected date and its respective data to the parent, which is shared to NotesComponent.
  Local storage is maintained in CalendarComponent.
- NotesComponent: This displays the already stored data if any or an empty form to receive the content. Once the form is submitted,
  the data is passed to the parent, which is passed to the CalendarComponent to save in the local storage.

### Concepts used:
- Hooks: useState and useEffect
- Form element is used to receive the notes for the respective date.

### Live Demo
(https://scrimba-krishna-v-react-calendar.netlify.app/)
