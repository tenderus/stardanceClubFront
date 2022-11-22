import React, {useState, useEffect, useRef} from 'react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import InfoButton from "./Button";
import {Link, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import useFetch from "../hooks/useFetch";

type clientType = {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    id: number;
}

const Clients = () => {

    return (
        <div className="posts-container">
            {/*{clients && clients.map((client: clientType) => {*/}
            {/*    return (*/}
            {/*        <Card sx={{ width: 350, m: 5 }} style={{display: 'inline-block'}}>*/}
            {/*            <CardContent>*/}
            {/*                <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>*/}
            {/*                    Информация о клиенте*/}
            {/*                </Typography>*/}
            {/*                <Typography component="div">*/}
            {/*                    <h2 style={{color: '#2872ed'}}>{client.firstName} {client.lastName}</h2>*/}
            {/*                </Typography>*/}
            {/*                <Typography sx={{ mb: 1.5 }} color="text.primary">*/}
            {/*                    <h3>Адрес: {client.address}</h3>*/}
            {/*                </Typography>*/}
            {/*                <Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
            {/*                    <h4>Телефон {client.phone}</h4>*/}
            {/*                </Typography>*/}

            {/*                <Link to={`/clients/${client.id}/lessons`}>*/}
            {/*                    <Button variant="contained">*/}
            {/*                        Посмотреть занятия*/}
            {/*                    </Button>*/}
            {/*                </Link>*/}

            {/*            </CardContent>*/}
            {/*        </Card>*/}
            {/*    );*/}
            {/*})}*/}
        </div>
    );
};

export default Clients;