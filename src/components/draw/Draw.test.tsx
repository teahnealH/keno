import {TestRenderer} from 'react-redux-test-renderer';
import {Draw, DRAW_INTERVAL_MILLISECOND, DRAW_TOTAL} from "./Draw";
import {DrawStatus} from "../../state/draw/DrawSlice";
import {screen} from "@testing-library/react";
import {RootState} from "../../store";
import {MAX_TICKETS_SELECTED} from "../ticket/Ticket";
import { fakeSchedulers } from "rxjs-marbles/jest";

describe('draw', () => {
    let testRenderer: TestRenderer;
    let props: object | undefined;
    let state: RootState;
    beforeEach(() => {
        props = {};
        state = {
            draw: {drawNumbers: [], drawStatus: DrawStatus.DRAWING},
            ticket: {ticketNumbers: [], totalTicketsSelected: 0},
        };
    });

    it('should dispatch action', () => {
        state.draw.drawStatus = DrawStatus.DRAWING;
        testRenderer = new TestRenderer(Draw, props, state);
        testRenderer.renderWithStore();
        expect(screen.getByText(/DRAWING.../i)).toBeInTheDocument();
    });

    it('should display score and show reset button when drawing is complete', () => {
        state.ticket.totalTicketsSelected = MAX_TICKETS_SELECTED;
        state.ticket.ticketNumbers = [undefined, true, false, true, false, true]; // Numbers start from 1 so 0 is undefined
        state.draw.drawNumbers = [undefined, true, true, false, false, true];
        state.draw.drawStatus = DrawStatus.COMPLETE;
        testRenderer = new TestRenderer(Draw, props, state);
        testRenderer.renderWithStore();

        expect(screen.getByText(new RegExp(`Your score was 2!`,'i'))).toBeInTheDocument();

        const resetButton: HTMLButtonElement =screen.getByText(/RESET/i);

        resetButton.click();

        expect(resetButton).toBeInTheDocument();
        expect(testRenderer.getActionsOfType('drawNumbers/setDrawStatus')[0].payload).toEqual(DrawStatus.PICKING);
        expect(testRenderer.getActionsOfType('drawNumbers/setDrawnNumbers')[0].payload).toEqual([]);
        expect(testRenderer.getActionsOfType('ticketNumbers/resetTicketNumbers')[0]).toBeTruthy();

    });

    it(`should show please select numbers text with less than ${MAX_TICKETS_SELECTED} are selected`, () => {
        state.draw.drawStatus = DrawStatus.PICKING;
        testRenderer = new TestRenderer(Draw, props, state);
        testRenderer.renderWithStore();
        expect(screen.getByText(new RegExp(`Please Select ${MAX_TICKETS_SELECTED} Numbers!`,'i'))).toBeInTheDocument();
    });

    describe('draw with intervals', () => {

        beforeEach(() => {
            jest.useFakeTimers()
        });

        it(`should pick ${DRAW_TOTAL} numbers when DRAW is pressed`, fakeSchedulers((advance) => {
            state.draw.drawStatus = DrawStatus.PICKING;
            state.ticket.totalTicketsSelected = MAX_TICKETS_SELECTED;
            testRenderer = new TestRenderer(Draw, props, state);
            testRenderer.renderWithStore();
            const drawButton: HTMLButtonElement = screen.getByText(/DRAW/i);
            expect(drawButton).toBeInTheDocument();

            drawButton.click();

            expect(testRenderer.getActionsOfType('drawNumbers/setDrawStatus')[0].payload).toEqual(DrawStatus.DRAWING);
            expect(testRenderer.getActionsOfType('drawNumbers/setDrawnNumbers')[0].payload).toEqual([]);
            for(let i = 0; i < DRAW_TOTAL; i++) {
                advance(DRAW_INTERVAL_MILLISECOND);
                const drawNumbers: boolean[] = testRenderer.getActionsOfType('drawNumbers/setDrawnNumbers')[i + 1].payload;
                const numberOfValues = drawNumbers.reduce((total, currentValue) => currentValue ? ++total : total, 0);
                expect(numberOfValues).toEqual(i + 1);
            }
        }));
    })
})