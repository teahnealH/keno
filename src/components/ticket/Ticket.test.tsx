import {TestRenderer} from "react-redux-test-renderer";
import {RootState} from "../../store";
import {DrawStatus} from "../../state/draw/DrawSlice";
import {screen} from "@testing-library/react";
import {MAX_TICKETS_SELECTED, Ticket, TOTAL_NUMBERS} from "./Ticket";

describe('Ticket', () => {
    let testRenderer: TestRenderer;
    let props: object | undefined;
    let state: RootState;
    beforeEach(() => {
        props = {};
        state = {
            draw: {drawNumbers: [], drawStatus: DrawStatus.PICKING},
            ticket: {ticketNumbers: [], totalTicketsSelected: 0},
        };
    });

    it('should render all ticket buttons', () => {
        testRenderer = new TestRenderer(Ticket, props, state);
        testRenderer.renderWithStore();

        for (let i = 1; i <= TOTAL_NUMBERS; i++) {
            expect(screen.getByText(`${i}`).tabIndex).toEqual(i);
        }
    });

    it('should set correct className', () => {
        state.ticket.totalTicketsSelected = MAX_TICKETS_SELECTED;
        state.ticket.ticketNumbers = [undefined, true, false, true, false];
        state.draw.drawNumbers = [undefined, true, true, false, false];
        testRenderer = new TestRenderer(Ticket, props, state);
        testRenderer.renderWithStore();

        expect(screen.getByText(`1`).className).toContain('selected-draw-number');
        expect(screen.getByText(`2`).className).toContain('draw-number');
        expect(screen.getByText(`3`).className).toContain('selected-number');
        expect(screen.getByText(`4`).className).toContain('button-disabled');
    });

    it('should dispatch when click', () => {
        testRenderer = new TestRenderer(Ticket, props, state);
        testRenderer.renderWithStore();
        const buttonFive: HTMLButtonElement = screen.getByText(5);

        buttonFive.click();

        expect(testRenderer.getActionsOfType('ticketNumbers/updateTicketNumbers')[0].payload).toEqual(5);
    });

    it('should disable button when draw status is Drawing', () => {
        state.draw.drawStatus = DrawStatus.DRAWING;
        testRenderer = new TestRenderer(Ticket, props, state);
        testRenderer.renderWithStore();
        const buttonFive: HTMLButtonElement = screen.getByText(5);

        expect(buttonFive.disabled).toBeTruthy();
    });

    it('should disable button when draw status is Complete', () => {
        state.draw.drawStatus = DrawStatus.COMPLETE;
        testRenderer = new TestRenderer(Ticket, props, state);
        testRenderer.renderWithStore();
        const buttonFive: HTMLButtonElement = screen.getByText(5);

        expect(buttonFive.disabled).toBeTruthy();
    });


})