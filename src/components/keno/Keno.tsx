import React from "react";
import {Ticket} from "../ticket/Ticket";
import {Draw} from "../draw/Draw";
import {Card, CardContent} from "@mui/material";
import logo from '../../assets/images/keno-logo.svg';
import './Keno.css';

export const Keno = () => {

    return (
        <div>
            <img alt="keno" src={logo}/>
            <Card className="keno-card">
                <CardContent>
                    <Draw/>
                    <div className="ticket-form">
                        <Ticket/>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}