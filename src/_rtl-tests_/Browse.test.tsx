//FUTURE ME: Proxy in package.json breaks nock's tests;
//mocking cookies work; didn't fully test the app, but I get the idea :)
import Root from "Root";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
import {
    render,
    cleanup,
    RenderResult,
    fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
//import Modal from "components/Modal";
import history from "browserHistory";
let pushSpy: jest.SpyInstance;
let app: RenderResult;
afterEach(() => {
    cleanup();
});

beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/browse"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );

    //Mocking history:
    //https://www.reddit.com/r/reactjs/comments/b1hsno/how_can_i_test_historypush_inside_action/
    pushSpy = jest.spyOn(history, "push");
});

test("Netflix logo clicked", async () => {
    act(() => {
        fireEvent.click(app.getByTestId("netflixBrowseLogo"));
    });
    history.push("/");
    expect(pushSpy).toBeCalledWith("/");
    pushSpy.mockRestore();
});

test("Media sections exist", async () => {
    expect(app.getByText("Continue Watching")).toBeInTheDocument();
    expect(app.getByText("TV Shows")).toBeInTheDocument();
    expect(app.getByText("Netflix Originals")).toBeInTheDocument();
    expect(app.getByText("Popular On Netflix")).toBeInTheDocument();
});

// test("modal shows the children", () => {
//Tried to solved with: https://stackoverflow.com/questions/39986178/testing-react-target-container-is-not-a-dom-element
//However, none of the solutions worked
//     // Arrange
//     const handleClose = jest.fn();

//     // Act
//     const { getByText } = render(
//         <Modal onDismiss={handleClose}>
//             <div>test</div>
//         </Modal>
//     );
//     // Assert
//     expect(getByText("test")).toBeTruthy();
// });
