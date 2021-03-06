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
import nock from "nock";
import waitForExpect from "wait-for-expect";

import history from "browserHistory";
let pushSpy: jest.SpyInstance;
let app: RenderResult;
afterEach(() => {
    cleanup();
});

beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/plan"]} initialIndex={0}>
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
        fireEvent.click(app.getByTestId("planHeaderNetflixLogo"));
    });
    history.push("/");
    expect(pushSpy).toBeCalledWith("/");
    pushSpy.mockRestore();
});

test("Steps exist", async () => {
    expect(app.getByTestId("step1")).toBeInTheDocument();
    expect(app.getByTestId("step2")).toBeInTheDocument();
});

test("Register form on submit", async () => {
    const signInResponse = {
        token: "asdfsadf12",
        refreshToken: "asdufahsfd",
    };

    const expectedMockFormValues = {
        email: "hi@gmail.com",
        password: "123",
    };

    fireEvent.change(app.getByTestId("email"), {
        target: { value: expectedMockFormValues.email },
    });
    fireEvent.change(app.getByTestId("password"), {
        target: { value: expectedMockFormValues.password },
    });
    act(() => {
        fireEvent.click(app.getByTestId("emailAndPasswordContinueButton"));
    });

    const signUpScope = nock("http://localhost:5000")
        .post("/api/signup", expectedMockFormValues)
        .reply(200, signInResponse, { "Access-Control-Allow-Origin": "*" });

    await waitForExpect(() => {
        if (!signUpScope.isDone()) {
            console.error("pending mocks: %j", signUpScope.pendingMocks());
        }
        expect(signUpScope.isDone()).toBe(true);
    });
    expect(app.getByTestId("monthlyPlanTable")).toBeInTheDocument();

    act(() => {
        fireEvent.click(app.getByTestId("planContinueButton"));
        history.push("/browse");
        expect(pushSpy).toBeCalledWith("/browse");
        pushSpy.mockRestore();
    });
}, 30000);
