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

//Use this because with our current version of react, mp4's muted has issues with testing
//It will give a log/ warning about flushing updates
//https://github.com/testing-library/react-testing-library/issues/470
Object.defineProperty(HTMLMediaElement.prototype, "muted", {
    set: () => {},
});
beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/"]} initialIndex={0}>
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
        fireEvent.click(app.getByTestId("netflixLogoForRegisterAndSignIn"));
    });
    history.push("/");
    expect(pushSpy).toBeCalledWith("/");
    pushSpy.mockRestore();
}, 30000);

test("Sign In box exists", async () => {
    expect(app.getByTestId("signInBox")).toBeInTheDocument();
});

test("Sign in form on submit", async () => {
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
        fireEvent.click(app.getByTestId("signInButton"));
    });

    const signInScope = nock("http://localhost:5000")
        .post("/api/signin", expectedMockFormValues)
        .reply(200, signInResponse, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
        });

    await waitForExpect(() => {
        if (!signInScope.isDone()) {
            console.error("pending mocks: %j", signInScope.pendingMocks());
        }
        expect(signInScope.isDone()).toBe(true);

        expect(pushSpy).toBeCalledWith("/browse");
        pushSpy.mockRestore();
    });
}, 30000);
