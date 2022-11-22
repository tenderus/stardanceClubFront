import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InfoButton from "./Button";
import {useContext, useState} from "react";
import Button from "@mui/material/Button";
import {theme} from "../context/Theme";
import {ThemeContextProvider} from "../context/ThemeContext";
import {ThemeContext} from "../context/ThemeContext";



type CardProps = {
    danceInfo: {
        typeOfDance: string,
        description: string,
        numberOfPersons: number,
    }
}

export default function BasicCard(props: CardProps) {
    const [opened, setOpened] = useState(false);
    const theme = useContext(ThemeContext);

    return (
        <Card sx={{ width: 400, m: 4 }} style={{display: 'inline-block'}}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
                   Info about dance type
                </Typography>
                <Typography component="div" style={{color: '#ff9999'}}>
                    <h2>{props.danceInfo.typeOfDance}</h2>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <h4>Group size: {props.danceInfo.numberOfPersons}</h4>
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.primary">
                    <Button style={{backgroundColor: "#ff9999", fontFamily: "Montserrat"}} variant="contained" onClick={() => {
                        setOpened(!opened);
                    }}>
                        {opened ? 'Hide details' : 'Show details'}
                    </Button>
                    {opened ? <h3>Description: {props.danceInfo.description}</h3> : null}


                </Typography>
                <Typography>

                </Typography>
            </CardContent>
        </Card>
    );
}