import React from "react";
import {chunk} from "lodash";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../hooks";
import './Ticket.css';
import {DrawStatus} from "../../state/draw/DrawSlice";
import {updateTicketNumbers} from "../../state/ticket/TicketSlice";

export const TOTAL_NUMBERS = 80;
export const MAX_TICKETS_SELECTED = 10;

const GetAllTicketButtons = () => {
    const numberButtons = [];
    const ticketNumbers = useAppSelector((state) => state.ticket.ticketNumbers);
    const drawing = useAppSelector((state) => state.draw.drawStatus);
    const totalTicketsSelected = useAppSelector((state) => state.ticket.totalTicketsSelected);
    const drawNumbers = useAppSelector((state) => state.draw.drawNumbers);
    const dispatch = useAppDispatch();
    const buttonDisabled = (i: number) => drawing !== DrawStatus.PICKING || (totalTicketsSelected >= MAX_TICKETS_SELECTED && !ticketNumbers[i]);
    const className = (i: number) => {

        if (ticketNumbers[i] && drawNumbers[i]) {
            return 'selected-draw-number';
        }
        if (drawNumbers[i]) {
            return 'draw-number';
        }
        if (ticketNumbers[i]) {
            return 'selected-number';
        }
        if (buttonDisabled(i)) {
            return 'button-disabled';
        }
    }

    for (let i = 1; i <= TOTAL_NUMBERS; i++) {
        numberButtons.push(<Button disabled={buttonDisabled(i)} className={className(i)} variant="outlined" key={i}
                                   tabIndex={i}
                                   onClick={(e) => {
                                       dispatch(updateTicketNumbers(i))
                                   }}>{i}</Button>)
    }

    return numberButtons;
}

export const Ticket = () => {

    const ticketRows = chunk(GetAllTicketButtons(), 10).map((row, index) => (
        <div key={index} className='col-md-4'>{row}</div>));

    return (
        <div className='row'>{ticketRows}</div>
    )

}