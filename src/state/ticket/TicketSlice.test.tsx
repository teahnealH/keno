import {AnyAction} from "@reduxjs/toolkit";
import {resetTicketNumbers, ticketSlice, updateTicketNumbers} from "./TicketSlice";

describe('TicketSlice', () => {

    it('should return the initial state', () => {
        expect(ticketSlice.reducer(undefined, {} as AnyAction)).toEqual(
            {
                ticketNumbers: [],
                totalTicketsSelected: 0,
            }
        )
    });

    it('should handle updateTicketNumbers being added to an existing list', () => {
        const previousState = {
            ticketNumbers: [undefined, true],
            totalTicketsSelected: 1,
        };
        expect(ticketSlice.reducer(previousState, updateTicketNumbers(3))).toEqual(
            {
                ticketNumbers: [undefined, true, undefined, true],
                totalTicketsSelected: 2,
            }
        )
    })

    it('should handle updateTicketNumbers switching an existing value', () => {
        const previousState = {
            ticketNumbers: [undefined, true],
            totalTicketsSelected: 1,
        };
        expect(ticketSlice.reducer(previousState, updateTicketNumbers(1))).toEqual(
            {
                ticketNumbers: [undefined, false],
                totalTicketsSelected: 0,
            }
        )
    })

    it('should handle resetTicketNumbers being added to an existing list', () => {
        const previousState = {
            ticketNumbers: [undefined, true],
            totalTicketsSelected: 0,
        };
        expect(ticketSlice.reducer(previousState, resetTicketNumbers())).toEqual(
            {
                ticketNumbers: [],
                totalTicketsSelected: 0,
            }
        )
    })


})