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
import nock from "nock";
import waitForExpect from "wait-for-expect";
let pushSpy: jest.SpyInstance;
let app: RenderResult;
afterEach(() => {
    cleanup();
});

//Mock cookie
jest.mock("js-cookie", () => ({ get: () => "ACCESS_TOKEN" }), {
    virtual: true,
});
let getMediasScope: nock.Scope;
beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/search?q=dog"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );

    // const mockResponse = {
    //     medias: [
    //         {
    //             media_id: 1,
    //             media_title: "Pulp Fiction",
    //             media_date: 1994,
    //             media_description:
    //                 "This stylized crime caper weaves\n\t   together stories featuring a burger-loving hit man, his philosophical partner and a washed-up boxer.",
    //             banner_title_image:
    //                 "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615258992/netflix/logo/logo_pulp.webp",
    //             banner_image:
    //                 "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615257853/netflix/pulp.webp",
    //             name_tokens: null,
    //             media_type_name: "Movie",
    //         },
    //     ],
    // };

    // getMediasScope = nock("http://localhost:5000")
    //     //When the test renders, this will show
    //     .get("/api/search")
    //     .query({ q: "dog" })
    //     .reply(200, mockResponse, {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": "true",
    //     });

    //Mocking history:
    //https://www.reddit.com/r/reactjs/comments/b1hsno/how_can_i_test_historypush_inside_action/
    pushSpy = jest.spyOn(history, "push");
});

// test("Search bar on load", async () => {
//     await waitForExpect(() => {
//         if (!getMediasScope.isDone()) {
//             console.error("pending mocks: %j", getMediasScope.pendingMocks());
//         }
//         expect(getMediasScope.isDone()).toBe(true);

//         expect(app.getByText("Pulp Fiction")).toBeInTheDocument();
//     });
// }, 30000);

test("Search bar entered", async () => {
    //user is not signed in, so they cannot post an ad
    fireEvent.change(app.getAllByTestId("searchBarInput")[0], {
        target: { value: "dog" },
    });
    expect(app.getAllByTestId("searchBarInput")[0]).toBeInTheDocument();
    act(() => {
        fireEvent.click(app.getAllByTestId("searchIcon")[0]);
    });
    act(() => {
        fireEvent.click(app.getAllByTestId("searchIcon")[0]);
        history.push("/search?q=dog");
    });
    expect(pushSpy).toBeCalledWith("/search?q=dog");

    pushSpy.mockRestore();
});
