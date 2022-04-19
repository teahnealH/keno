import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";

export enum DrawStatus {
    PICKING,
    DRAWING,
    COMPLETE
}

interface DrawSlice {
    drawStatus: DrawStatus;
    drawNumbers: (boolean | undefined)[];
}

const initialState: DrawSlice = {
    drawStatus: DrawStatus.PICKING,
    drawNumbers: [],
}

export const drawSlice = createSlice({
    name: 'drawNumbers',
    initialState,
    reducers: {
        setDrawnNumbers: (state, action: PayloadAction<(boolean | undefined)[]>) => {
            state.drawNumbers = action.payload;
            return state;
        },
        setDrawStatus: (state, action: PayloadAction<DrawStatus>) => {
            state.drawStatus = action.payload;
            return state;
        }
    }
    ,
})

export const {setDrawnNumbers, setDrawStatus} = drawSlice.actions;

export const selectDraw = (state: RootState) => state.draw.drawNumbers;

export default drawSlice.reducer;