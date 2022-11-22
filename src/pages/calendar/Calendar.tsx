// import React, {useEffect, useState} from "react";
// import FullCalendar, {formatDate} from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import listPlugin from "@fullcalendar/list";
// import { Grid, Typography, Divider, Hidden, Box } from "@material-ui/core";
// import Checkbox from '@mui/material/Checkbox';
//
// import "./style.css";
// import useFetch from "../../hooks/useFetch";
// import LessonPopup from "../../components/LessonPopup";
// import {Lesson} from "../../models/entities/Lesson";
//
//
//
// const Calendar =  (props) => {
//   const { darkMode } = props;
//   const roleCheck = localStorage.getItem('role');
//   const userRole = roleCheck !== null ? roleCheck : "unAuth";
//
//
//   const [open, setOpen] = React.useState(false);
//
//   const handleOpen = () => {
//     setOpen(true);
//   }
//
//   const handleClose = () => {
//     setOpen(false);
//   };
//
//   const lessons = useFetch('https://localhost:7280/api/lessons');
//
//     const lessonsArray = lessons.map((lesson) => {
//       return (
//         { id: lesson.id,
//           title: lesson.teacherReadDto.danceType.name,
//           start: lesson.dateTime,
//           extendedProps: {
//             teacher: lesson.teacherReadDto.user.name.concat(" ").concat(lesson.teacherReadDto.user.surname),
//             room: lesson.roomReadDto.number,
//             freePlaces: lesson.freePlaces,
//               danceType: lesson.teacherReadDto.danceType.name,
//               clientId: localStorage.getItem("id")
//           },
//         })
//     })
//
//   const [lessonId, setLessonId] = useState(0);
//     const [teacher, setTeacher] = useState("");
//   const [room, setRoom] = useState();
//   const [freePlaces, setFreePlaces] = useState();
//     const [danceType, setDanceType] = useState();
//     const [clientId, setClientId] = useState();
//
//   const showModalWindow = (id, teacher, room, freePlaces, danceType, clientId) => {
//       setLessonId(id);
//       setTeacher(teacher);
//       setRoom(room)
//       setFreePlaces(freePlaces);
//       setDanceType(danceType);
//       setClientId(clientId);
//       handleOpen()
//   }
//
//
//     if (userRole === "client") {
//          return (
//             <div id="Calendar">
//                 <Grid container>
//                     <LessonPopup id={lessonId}
//                                  teacher={teacher}
//                                  room={room}
//                                  freePlaces={freePlaces}
//                                  danceType={danceType}
//                                  clientId = {clientId}
//                                  handleClickOpen={open}
//                                  handleClickClose={handleClose}/>
//                     <Grid item xs={1}/>
//                     <Grid item container justifyContent="center" xs={10}>
//                         <Typography style={{marginBottom: 10}} variant="h3">
//                             <Box style={{marginTop: 20, color: "#ada09c"}} fontWeight="fontWeightBold">Calendar</Box>
//                         </Typography>
//                         <Hidden xsDown={true}>
//                             {userRole === "client" ?
//                             <FullCalendar
//                                 dayHeaderClassNames={darkMode ? "fc-widget-header" : ""}
//                                 height="auto"
//                                 plugins={[dayGridPlugin]}
//                                 initialView={"dayGridMonth"}
//                                 events = {lessonsArray}
//                                 eventColor="#ff9999"
//                                 eventClick={(args) => showModalWindow(args.event.id,
//                                     args.event.extendedProps['teacher'],
//                                     args.event.extendedProps['room'],
//                                     args.event.extendedProps['freePlaces'],
//                                     args.event.extendedProps['danceType'],
//                                     args.event.extendedProps['clientId'],
//                                     args.event.start)}
//                                 eventDisplay="block"
//                                 displayEventEnd={true}
//                             /> :
//                                 <FullCalendar
//                                     dayHeaderClassNames={darkMode ? "fc-widget-header" : ""}
//                                     height="auto"
//                                     plugins={[dayGridPlugin]}
//                                     initialView={"dayGridMonth"}
//                                     events = {lessonsArray}
//                                     eventColor="#c62828"
//                                     eventClick={(args) => showModalWindow(args.event.id,
//                                         args.event.extendedProps['teacher'],
//                                         args.event.extendedProps['room'],
//                                         args.event.extendedProps['freePlaces'],
//                                         args.event.extendedProps['danceType'],
//                                         args.event.extendedProps['clientId'],
//                                         args.event.start)}
//                                     eventDisplay="block"
//                                     displayEventEnd={true}/>}
//
//                         </Hidden>
//                         <Hidden smUp={true}>
//                             <FullCalendar
//                                 height="auto"
//                                 plugins={[listPlugin]}
//                                 initialView={"listMonth"}
//                                 events={lessonsArray}
//                                 eventColor="#c62828"
//                                 eventDisplay="block"
//                                 displayEventEnd={true}
//                             />
//                         </Hidden>
//                         <Divider style={{width: "100%", marginTop: 25, marginBottom: 10}}/>
//                     </Grid>
//                     <Grid item xs={1}/>
//                 </Grid>
//             </div>
//         )
//     }
//
//     else {
//         return (
//             <div>
//                 Log in as client
//             </div>
//         )
//     }
// };
//
// export default Calendar;

import React, {useEffect, useState} from "react";
import FullCalendar, {EventInput, formatDate} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { Grid, Typography, Divider, Hidden, Box } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import { Theme } from '@mui/material/styles';
import "./style.css";
import useFetch from "../../hooks/useFetch";
import LessonPopup from "../../components/LessonPopup";
import {Lesson} from "../../models/entities/Lesson";
import {useMediaQuery} from "@mui/material";
import useFetchArray from "../../hooks/useFetchArray";



const Calendar =  () => {
    //const { darkMode } = props;
    const roleCheck = localStorage.getItem('role');
    const userRole = roleCheck !== null ? roleCheck : "unAuth";


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const lessons : Lesson[] = useFetchArray<Lesson>('https://localhost:7280/api/lessons');

    const lessonsArray : EventInput = lessons.map((lesson: Lesson) => {
        return (
            { id: lesson.id,
                title: lesson.teacherReadDto.danceType.name,
                start: lesson.dateTime,
                extendedProps: {
                    teacher: lesson.teacherReadDto.user.name.concat(" ").concat(lesson.teacherReadDto.user.surname),
                    room: lesson.roomReadDto.number,
                    freePlaces: lesson.freePlaces,
                    danceType: lesson.teacherReadDto.danceType.name,
                    clientId: localStorage.getItem("id")
                },
            })
    })

    const [lessonId, setLessonId] = useState(0);
    const [teacher, setTeacher] = useState("");
    const [room, setRoom] = useState(0);
    const [freePlaces, setFreePlaces] = useState(0);
    const [danceType, setDanceType] = useState("");
    const [clientId, setClientId] = useState(0);

    const showModalWindow = (id: number, teacher: string, room: number, freePlaces: number, danceType: string, clientId: number) => {
        setLessonId(id);
        setTeacher(teacher);
        setRoom(room)
        setFreePlaces(freePlaces);
        setDanceType(danceType);
        setClientId(clientId);
        handleOpen()
    }

if (userRole === "client") {
    return (
        <div id="Calendar">
            <Grid container>
                <LessonPopup id={lessonId}
                             teacher={teacher}
                             room={room}
                             freePlaces={freePlaces}
                             danceType={danceType}
                             clientId = {clientId}
                             handleClickOpen={open}
                             handleClickClose={handleClose}/>
                <Grid item xs={1}/>
                <Grid item container justifyContent="center" xs={10}>
                    <Typography style={{marginBottom: 10}} variant="h3">
                        <Box style={{marginTop: 20, color: "#ada09c"}} fontWeight="fontWeightBold">Calendar</Box>
                    </Typography>
                            <FullCalendar
                                height="auto"
                                plugins={[dayGridPlugin]}
                                initialView={"dayGridMonth"}
                                events = {lessonsArray}
                                eventColor="#ff9999"
                                eventClick={(args) => showModalWindow(parseInt(args.event.id),
                                    args.event.extendedProps['teacher'],
                                    args.event.extendedProps['room'],
                                    args.event.extendedProps['freePlaces'],
                                    args.event.extendedProps['danceType'],
                                    args.event.extendedProps['clientId']
                                )}
                                eventDisplay="block"
                                displayEventEnd={true}
                            />
                    <Divider style={{width: "100%", marginTop: 25, marginBottom: 10}}/>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </div>
    )
}

else {
    return (
        <div>
            Log in as client
        </div>
    )
}
};

export default Calendar;


