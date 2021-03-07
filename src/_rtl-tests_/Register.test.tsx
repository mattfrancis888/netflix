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

import history from "browserHistory";
let pushSpy: jest.SpyInstance;
let app: RenderResult;
afterEach(() => {
    cleanup();
});

beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/register"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );

    //Mocking history:
    //https://www.reddit.com/r/reactjs/comments/b1hsno/how_can_i_test_historypush_inside_action/
    pushSpy = jest.spyOn(history, "push");
});

test("Netflix logo clicked", async () => {
    //Dont wory about console warning of React's flush updates, it's due to the mp4
    //https://github.com/enzymejs/enzyme/issues/2326
    act(() => {
        fireEvent.click(app.getByTestId("netflixLogoForRegisterAndSignIn"));
    });
    history.push("/");
    expect(pushSpy).toBeCalledWith("/");
    pushSpy.mockRestore();
}, 30000);

test("Register now button clicked", async () => {
    //Dont wory about console warning of React's flush updates, it's due to the mp4
    //https://github.com/enzymejs/enzyme/issues/2326
    act(() => {
        fireEvent.click(app.getByTestId("registerNowButton"));
    });
    history.push("/plan");
    expect(pushSpy).toBeCalledWith("/plan");
    pushSpy.mockRestore();
}, 30000);
