import { configureStore } from '@reduxjs/toolkit'
import {drawSlice} from "./state/draw/DrawSlice";
import {ticketSlice} from "./state/ticket/TicketSlice";

export const store = configureStore({
    reducer: {
        ticket: ticketSlice.reducer,
        draw: drawSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;