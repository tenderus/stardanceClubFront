// import React from "react";
//
// type ButtonProps = {
//     handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
// }
//
// export const Button = (props: ButtonProps) => {
//     return <button onClick={props.handleClick}>Узнать больше</button>
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import {useState} from "react";


type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function InfoButton(props: ButtonProps) {
    return (
            <Button variant="contained" onClick={props.handleClick}></Button>
    );
}