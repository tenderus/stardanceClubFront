import usePaginatedFetch from "../hooks/usePaginatedFetch";
import React, {useContext, useEffect, useState} from "react";
import {Filter} from "../models/RequestFilters/Filter";
import {PaginatedResult} from "../models/RequestFilters/PaginatedResult";
import {TeacherReadDto} from "../models/entities/TeacherReadDto";
import useFetch from "../hooks/useFetch";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {ClientReadDto} from "../models/entities/ClientReadDto";
import {Lesson} from "../models/entities/Lesson";
import useFetchArray from "../hooks/useFetchArray";
import {markClientAsAbsent} from "../services/ClientService";
import {AuthContext} from "../App";

const TeacherAdmin = () => {

    const [idTeacher, setIdTeacher] = useState(localStorage.getItem('id'));
    const [updateNeeded, setUpdateNeeded] = useState(false);
    const sortColumn = "DateTime";
    const teacher: ClientReadDto = useFetch<ClientReadDto>(`https://localhost:7280/api/clients/${idTeacher}`);
    const {token} = useContext(AuthContext);


    const [filter, setFilter] = useState<Filter[]>([
        {
            path: "Teacher.UserId",
            value: idTeacher,
            expression: 0
        }
    ]);

    const [pageIndex, setPageIndex] = useState<number>(0);

    const filteredResult: PaginatedResult<Lesson> = usePaginatedFetch<Lesson>("https://localhost:7280/api/lessons/paginated", pageIndex, 20, filter, sortColumn, updateNeeded);
    const filteredLessons= filteredResult.items;


    const updateAbsences = async (updateNeeded: boolean, clientId: number, lessonId: number) => {
        await markClientAsAbsent({
            lessonId: lessonId,
            clientId: clientId
        }, token)
        setUpdateNeeded(!updateNeeded);
    }


    return(
        <div>
            <div>
            <Card sx={{ width: 350, marginTop: '5%', marginLeft: '10%', float: 'left' }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={"/images/" + teacher.id + ".jpg"}
                    alt="Teacher"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {teacher.name} {teacher.surname}
                    </Typography>
                </CardContent>
                <Button variant="outlined" style={{marginBottom: '2%', borderColor: '#ff9999', color: '#ff9999'}}>Add lesson</Button>
            </Card>
            </div>

            <div style={{ float: 'right', width: '50%', height: '50', marginTop: '5%', marginRight: '10%'}}>
                {filteredLessons.map(lesson => {
                    const date = new Date(lesson.dateTime)
                    return (
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{date.toUTCString()}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <div>
                                    {lesson.clients.map((client: ClientReadDto) => {
                                        return (
                                            <div style={{width: '80%', marginLeft: '10%'}}>
                                            <h4 style={{textAlign: 'left'}}>{client.name} {client.surname}
                                                {!lesson.absences.find(a => a.clientId === client.id && a.lessonId === lesson.id) ?
                                                    <Button style={{float: 'right', margin: '0 auto'}}
                                                            onClick={() => updateAbsences(updateNeeded, client.id, lesson.id)}>
                                                        Put absence
                                                    </Button>
                                                    :
                                                    <h5 style={{float: 'right', margin: '0 auto'}}> Absent</h5>
                                                }
                                            </h4>
                                            </div>
                                        )
                                    })}
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </div>
        </div>

    )
}

export default TeacherAdmin