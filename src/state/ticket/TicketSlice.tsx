import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";

interface TicketSlice {
    ticketNumbers: (boolean | undefined)[];
    totalTicketsSelected: number;
}

const initialState: TicketSlice = {
    ticketNumbers: [],
    totalTicketsSelected: 0,
}

export const ticketSlice = createSlice({
    name: 'ticketNumbers',
    initialState,
    reducers: {
        updateTicketNumbers: (state, action: PayloadAction<number>) => {
            state.ticketNumbers[action.payload] = !state.ticketNumbers[action.payload];
            state.totalTicketsSelected = state.ticketNumbers.reduce((total, currentValue) => currentValue ? ++total : total, 0);
            return state;
        },
        resetTicketNumbers: (state) => {
            state = initialState;
            return state;
        },
    },
})

export const { updateTicketNumbers, resetTicketNumbers } = ticketSlice.actions;

export const selectTicket = (state: RootState) => state.ticket.ticketNumbers;

export default ticketSlice.reducer;