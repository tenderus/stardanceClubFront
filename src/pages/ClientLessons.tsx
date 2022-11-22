import React, {useState} from "react";
import FullCalendar, {EventInput} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Grid, Typography, Divider, Box } from "@material-ui/core";

import LessonPopup from "../components/LessonPopup";
import useFetchArray from "../hooks/useFetchArray";
import {Lesson} from "../models/entities/Lesson";


const ClientLessons = () => {

    const clientIdForFetch = localStorage.getItem("id");
    const [updateNeeded, setUpdateNeeded] = useState<boolean>(false);

    const lessons: Lesson[] = useFetchArray<Lesson>(`https://localhost:7280/api/lessons/lessonsOfClient/${clientIdForFetch}`, updateNeeded);


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const lessonsArray: EventInput = lessons.map((lesson) => {
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

    return (
        <div id="Calendar">
            <Grid container>
                <LessonPopup id={lessonId}
                             teacher={teacher}
                             room={room}
                             freePlaces={freePlaces}
                             danceType={danceType}
                             clientId = {clientId}
                             updateNeeded = {updateNeeded}
                             setUpdateNeeded={setUpdateNeeded}
                             handleClickOpen={open}
                             handleClickClose={handleClose}/>
                <Grid item xs={1}/>
                <Grid item container justifyContent="center" xs={10}>
                    <Typography style={{marginBottom: 10}} variant="h3">
                        <Box style={{marginTop: 20, color: "#ada09c"}} fontWeight="fontWeightBold">My lessons</Box>
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

};

export default ClientLessons;
