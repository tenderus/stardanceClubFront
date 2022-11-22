import React, {useEffect, useRef, useState} from 'react';
import QuiltedImageList from "../components/QuiltedImageList";
import HomeDesc from "../components/HomeDesc";
import BasicCard from "../components/Card";
import {ThemeContextProvider} from "../context/ThemeContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";


function Homepage() {
    // const divElement = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);
    const [divElem, setDivElem] = useState<HTMLElement | null>();

    useEffect(() => {
        // setHeight(divElement.current?.offsetHeight);
        setDivElem(document.getElementById('myDiv'));
    }, []);

    useEffect( () => {
        if (divElem) {
            divElem.setAttribute("height", height.toString())
        }
    }, [height])

    const Dances = [
        {
            typeOfDance: "Ballet",
            description: "One of the classic and most popular types of dance...",
            numberOfPersons: 10,
        },
        {
            typeOfDance: "Hip-hop",
            description: "Hip-hop is suitable for people of all age groups and any gender...",
            numberOfPersons: 15,
        },
        {
            typeOfDance: "Tango",
            description: "A hot and passionate kind of dance suitable for couples...",
            numberOfPersons: 10,
        },
        {
            typeOfDance: "Salsa",
            description: "Crazy energy is an essential attribute of salsa...",
            numberOfPersons: 20,
        },
        {
            typeOfDance: "Bellydance",
            description: "Beautiful, feminine, elegant, unique, magical - oriental!",
            numberOfPersons: 10,
        },
        {
            typeOfDance: "Pooldance",
            description: "A daring kind of dance that makes you feel wanted...",
            numberOfPersons: 15,
        },
    ]
    return (
        <ThemeContextProvider>
            <QuiltedImageList/>
            <HomeDesc/>
            <div style={{color: '#ff9999', fontSize: '2em', textAlign: 'center', marginTop: '200px', width: '900px', margin: '0 auto'}}>
                <hr style={{width: "200px", backgroundColor:'#ff9999'}}/>
                Today, we train in almost all dance directions: historical ballroom dancing, European standard, Latin American dances, Salsa, Bachata, Merengue, Club dances, Club Latin, and even belly dance and Hip-Hop. Our teachers are real professionals, in groups an individual approach to everyone is practiced, both in beginner groups and in continuing ones. You can see for yourself by visiting our classes!
                <hr style={{width: "200px"}}/>
            </div>
            <div style={{marginTop: '100px'}}>
            <h1 style={{ color: '#ff9999', fontSize: '4em'}}>What we teach</h1>
            {Dances.map((dance) => (
                <BasicCard danceInfo={dance}/>
            ))}

            </div>
        </ThemeContextProvider>
    )
}

export default Homepage