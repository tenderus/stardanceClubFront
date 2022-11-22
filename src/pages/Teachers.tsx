import {
    Button,
    Card,
    CardActions,
    CardContent, CardMedia,
    Checkbox,
    FormControlLabel,
    Pagination,
    Stack,
    Typography
} from '@mui/material';
import React, {useState} from 'react';
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import {PaginatedResult} from "../models/RequestFilters/PaginatedResult";
import {TeacherReadDto} from "../models/entities/TeacherReadDto";
import {Filter} from "../models/RequestFilters/Filter";
import {FormGroup} from "@material-ui/core";
import "./teachers.css"


function Teachers() {

    const [pageIndex, setPageIndex] = useState(1);
    const [filters, setFilters] = useState<Filter[]>([]);

    function changePage(event: React.ChangeEvent<unknown>, page: number) {
        setPageIndex(page);
        console.log(pageIndex)
    }

    const setFilterOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setFilters([...filters, {
                path: "DanceType.Name",
                value: event.target.value.toString(),
                expression: 0
            }
            ]);
        }
        else{
            const clearedFilters = filters.filter(x => x.value !== event.target.value.toString());
            setFilters(clearedFilters);
        }
    }

    const filteredResult: PaginatedResult<TeacherReadDto> = usePaginatedFetch("https://localhost:7280/api/teachers/paginated", pageIndex-1, 3, filters);
    const filteredTeachers = filteredResult.items;


    return (
        <div style={{margin: '0 auto', marginTop: '3%', marginLeft: '7%'}} >
            <div style={{width: '10%', marginTop: '5%',  height: '40%', padding: '2%', boxShadow: '#ada09c 0px 5px 15px', float: 'left'}}>
                <FormGroup style={{fontFamily: 'Montserrat'}}>
                    <FormControlLabel control={<Checkbox value="Ballet" onChange={setFilterOnChange}/>} label="Ballet"  />
                    <FormControlLabel control={<Checkbox value="Hip-hop" onChange={setFilterOnChange}/>} label="Hip-hop" />
                    <FormControlLabel control={<Checkbox value="Salsa" onChange={setFilterOnChange}/>} label="Salsa"  />
                    <FormControlLabel control={<Checkbox value="Twerk" onChange={setFilterOnChange}/>} label="Twerk" />
                    <FormControlLabel control={<Checkbox value="Country" onChange={setFilterOnChange}/>} label="Country"  />
                    <FormControlLabel control={<Checkbox value="Bellydance" onChange={setFilterOnChange}/>} label="Bellydance" />
                </FormGroup>
            </div>
     {filteredTeachers.map((teacher: TeacherReadDto) => {
            return (
        <Card sx={{width: 300, margin: '2%', display: 'inline-block', fontFamily: 'Montserrat'}}>
            <CardContent>
                <CardMedia
                    component="img"
                    height="300"
                    image={"/images/" + teacher.user.id + ".jpg"}
                    alt="Image of teacher"
                    sx={{marginBottom: '10%'}}
                />
                <Typography variant="h5" component="div" style={{color: '#ada09c'}}>
                    {teacher.user.name} {teacher.user.surname}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    Type of dance: {teacher.danceType.name}
                </Typography>
                <div style={{textAlign: 'left', padding: '0 auto', fontSize: '2%'}}>
                <Typography component="div" style={{color: '#ada09c', fontFamily: 'Montserrat'}}>
                    Age: {teacher.age}
                </Typography>
                <Typography component="div" style={{color: '#ada09c', fontFamily: 'Montserrat'}}>
                    Work experience in years: {teacher.yearsOfExperience}
                </Typography>
                <Typography component="div" style={{color: '#ada09c', fontFamily: 'Montserrat'}}>
                    Description: {teacher.description}
                </Typography>
                </div>

            </CardContent>
        </Card>
            );
    })}
            <Stack spacing={2} style={{margin: '0 auto', display: 'block'}}>
                <Pagination count={Math.ceil(filteredResult.total/filteredResult.pageSize)} page={pageIndex} onChange={changePage} />
            </Stack>

    </div>
)
}

export default Teachers;

