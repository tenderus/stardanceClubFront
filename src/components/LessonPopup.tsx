import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React, {useContext, useState} from 'react';
import {
    addClientToLesson,
    checkClientIsAtLesson,
    checkClientIsInQueue,
    deleteClientFromQueue,
    getNumberOfQueueOrder
} from "../services/ClientService";
import {addClientToQueue} from "../services/ClientService";
import {deleteClientFromLesson} from "../services/ClientService";
import useFetch from "../hooks/useFetch";
import "./lessonPopup.css";
import {AuthContext} from "../App";

type LessonPopupProps = {
    id?: number,
    teacher?: string,
    freePlaces?: number,
    room?: number,
    danceType?: string,
    clientId?: number,
    handleClickOpen: boolean,
    updateNeeded? : boolean,
    setUpdateNeeded?: (updateNeeded: boolean) => void,
    handleClickClose : () => void,
}


export default function LessonPopup(props: LessonPopupProps) {
    const addClientToLessonProps = {
        lessonId: props.id,
        clientId: props.clientId
    }

    const [clientIsAtLessonResult, setClientIsAtLessonResult] = useState(true);
    const [clientIsInQueueResult, setClientIsInQueueResult] = useState(true);
    const [numberOfQueueOrderResult, setNumberOfQueueOrderResult] = useState(0);
    const {isAuth, token} = useContext(AuthContext);


    if (props.handleClickOpen) {
        let clientIsAtLesson = checkClientIsAtLesson(addClientToLessonProps)
        clientIsAtLesson.then((response: any) => response.json().then((value: any) => setClientIsAtLessonResult(value)));

        let clientIsInQueue = checkClientIsInQueue(addClientToLessonProps)
        clientIsInQueue.then((response: any) => response.json().then((value: any) => setClientIsInQueueResult(value)));

        let numberOfQueueOrder = getNumberOfQueueOrder(addClientToLessonProps)
        numberOfQueueOrder.then((response: any) => response.json().then((value: any) => setNumberOfQueueOrderResult(value)));

        if (numberOfQueueOrderResult === 1 && props.freePlaces !== 0) {
            addClientToLesson(addClientToLessonProps, token).then((response: any) => response.json());
        }
    }

    const updateLessons = () => {
        props.handleClickClose();
        if(props.setUpdateNeeded !== undefined) {
         props.setUpdateNeeded(!props.updateNeeded)
        }
    }

    console.log(props.teacher)
    console.log(props.freePlaces)
    console.log(props.clientId)
    return (
        <Dialog
            open={props.handleClickOpen}
            onClose={props.handleClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{fontFamily: 'Montserrat', textAlign: 'center'}}>
                {"Info about lesson"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>
                    <h3>Teacher: {props.teacher}</h3>
                    <h3>Dance type: {props.danceType}</h3>
                    <h3>Room: {props.room}</h3>
                    <h3>Available spaces: {props.freePlaces}</h3>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {!clientIsInQueueResult ?
                    !clientIsAtLessonResult ?
                        props.freePlaces === 0 ?
                <Button style={{backgroundColor: '#ff9999', margin: '0 auto', color: 'white', fontFamily: 'Montserrat'}} onClick={() => addClientToQueue(addClientToLessonProps, token)
                    .then(r => props.handleClickClose())}>Put me in queue</Button>
                :
                <Button style={{backgroundColor: '#ff9999', margin: '0 auto', color: 'white', fontFamily: 'Montserrat'}} onClick={() => addClientToLesson(addClientToLessonProps, token)
                    .then(r => props.handleClickClose())}>Enroll me</Button>
                :
                        <div>
                            <h3 style={{fontWeight: 'normal', color: '#ada09c', fontFamily: 'Montserrat'}}>You are enrolled at this lesson </h3>
                    <Button style={{backgroundColor: '#ff9999', display: 'block', margin: '0 auto', color: 'white', fontFamily: 'Montserrat'}} onClick={() => deleteClientFromLesson(addClientToLessonProps, token)
                        .then(r => updateLessons())}>Delete me from the lesson</Button>
                        </div>
                    :
                    <div>
                        <h3 style={{fontWeight: 'normal', color: '#ada09c', fontFamily: 'Montserrat'}}>You are in queue for this lesson. Number of order: {numberOfQueueOrderResult} </h3>
                    <Button style={{backgroundColor: '#ff9999', display: 'block', margin: '0 auto', color: 'white', fontFamily: 'Montserrat'}} onClick={() => deleteClientFromQueue(addClientToLessonProps, token)
                        .then(r => updateLessons())}>Delete me from the queue</Button>
                    </div>
                    }
            </DialogActions>
        </Dialog>
    )
}