import Button from "@mui/material/Button";
import React from "react";
import {finalize, interval, take} from "rxjs";
import {MAX_TICKETS_SELECTED, TOTAL_NUMBERS} from "../ticket/Ticket";
import {DrawStatus, setDrawnNumbers, setDrawStatus} from "../../state/draw/DrawSlice";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks";
import {CircularProgress} from "@mui/material";
import './Draw.css';
import {resetTicketNumbers} from "../../state/ticket/TicketSlice";

export const DRAW_TOTAL = 20;
export const DRAW_INTERVAL_MILLISECOND = 2000;

export const Draw = () => {
    const dispatch = useDispatch();
    const drawStatus = useAppSelector((state) => state.draw.drawStatus);
    const ticketNumbers = useAppSelector((state) => state.ticket.ticketNumbers);
    const drawNumbers = useAppSelector((state) => state.draw.drawNumbers);
    const totalTicketsSelected = useAppSelector((state) => state.ticket.totalTicketsSelected);

    const startNumberDraw = () => {
        const randomDrawNumber = () => Math.floor((Math.random() * TOTAL_NUMBERS) + 1);
        const drawNumbers: boolean[] = [];

        dispatch(setDrawStatus(DrawStatus.DRAWING));
        dispatch(setDrawnNumbers([]));

        interval(DRAW_INTERVAL_MILLISECOND).pipe(
            take(DRAW_TOTAL),
            finalize(() => dispatch(setDrawStatus(DrawStatus.COMPLETE))),
        ).subscribe(() => {
            let randomNumber;
            do {
                randomNumber = randomDrawNumber();
            } while (drawNumbers[randomNumber])

            drawNumbers[randomNumber] = true;
            dispatch(setDrawnNumbers([...drawNumbers]));
        });
    }

    const getScore = () => {
        return ticketNumbers.reduce((total, currentValue, index) => currentValue && drawNumbers[index] ? ++total : total, 0);
    }

    const reset = () => {
        dispatch(setDrawStatus(DrawStatus.PICKING));
        dispatch(setDrawnNumbers([]));
        dispatch(resetTicketNumbers());
    }
    switch (drawStatus) {
        case DrawStatus.PICKING:
            if (totalTicketsSelected < MAX_TICKETS_SELECTED) {
                return (<span>Please Select {MAX_TICKETS_SELECTED} Numbers!</span>);
            } else {
                return (
                    <Button variant="outlined" onClick={(e) => {
                        startNumberDraw()
                    }}>Draw</Button>
                );
            }
        case DrawStatus.DRAWING:
            return (
                <div>
                    <span>DRAWING...</span><br/><br />
                    <CircularProgress color="inherit"/>
                </div>
            );
        case DrawStatus.COMPLETE:

            return (
                <div>
                    <span>DRAWING Complete<br/> Your score was {getScore()}!</span><br /><br />
                    <Button variant="outlined" onClick={(e) => {
                        reset()
                    }}>RESET</Button>
                </div>
            );

    }
}