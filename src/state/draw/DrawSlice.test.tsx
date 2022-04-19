import DrawSlice, {drawSlice, DrawStatus, setDrawnNumbers, setDrawStatus} from "./DrawSlice";
import {AnyAction} from "@reduxjs/toolkit";

describe('DrawSlice', () => {

    it('should return the initial state', () => {
        expect(drawSlice.reducer(undefined, {} as AnyAction)).toEqual(
            {
                drawStatus: DrawStatus.PICKING,
                drawNumbers: [],
            }
        )
    });

    it('should handle setDrawnNumbers being added to an existing list', () => {
        const previousState = {
            drawStatus: DrawStatus.PICKING,
            drawNumbers: [undefined, true],
        };
        expect(drawSlice.reducer(previousState, setDrawnNumbers([undefined, true, false]))).toEqual(
            {
                drawStatus: DrawStatus.PICKING,
                drawNumbers: [undefined, true, false],
            }
        )
    })

    it('should handle setDrawStatus being added to an existing list', () => {
        const previousState = {
            drawStatus: DrawStatus.PICKING,
            drawNumbers: [undefined, true],
        };
        expect(drawSlice.reducer(previousState, setDrawStatus(DrawStatus.DRAWING))).toEqual(
            {
                drawStatus: DrawStatus.DRAWING,
                drawNumbers: [undefined, true],
            }
        )
    })


})