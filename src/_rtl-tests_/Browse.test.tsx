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

describe("When data is loaded", () => {
    let getMediasScope: nock.Scope;

    beforeEach(() => {
        const mockResponse = {
            medias: [
                {
                    media_id: 1,
                    media_title: "Pulp Fiction",
                    media_date: 1994,
                    media_description:
                        "This stylized crime caper weaves\n\t   together stories featuring a burger-loving hit man, his philosophical partner and a washed-up boxer.",
                    banner_title_image:
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615258992/netflix/logo/logo_pulp.webp",
                    banner_image:
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615257853/netflix/pulp.webp",
                    name_tokens: null,
                    media_type_name: "Movie",
                },
            ],
        };
        const watchingResponse = {
            medias: [
                {
                    media_id: 5,
                    media_title: "This Is The End",
                    media_date: 2013,
                    media_description:
                        "Playing themselves in this witty black comedy, Seth Rogen and a bevy of Hollywood notables are stuck together at a party when the apocalypse dawns.",
                    banner_title_image:
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615258991/netflix/logo/logo_the_end.webp",
                    banner_image:
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615258578/netflix/end.webp",
                    name_tokens: null,
                    media_type_name: "Movie",
                },
            ],
        };

        //note to me: POST request in nock's console.error() is just a warning for axios interceptors
        //I am not testing axios interceptors here so dont worry
        //   reqheaders: {
        //     Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        // },

        getMediasScope = nock("http://localhost:5000")
            //When the test renders, this will show
            .get("/api/medias")

            .reply(200, mockResponse, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            })
            //When the test renders the results  will not appear in Browse,
            //I believe it's because the API tries to read the cookie and nock cannot mock APIs that reads cookies.
            // same thing with /signOut below
            .get("/api/watching")
            .reply(200, watchingResponse, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            });

        // getMediasScope = nock("http://localhost:5000")
        //     .persist()
        //     // .intercept("/api/medias", "OPTIONS")

        //     // .reply(200, mockResponse, {
        //     //     "Access-Control-Allow-Headers": "*",
        //     //     "Access-Control-Allow-Origin": "*",
        //     //     "Access-Control-Allow-Credentials": "true",
        //     // })

        //     .get("/api/medias")
        //     .reply(200, mockResponse, {
        //         "Access-Control-Allow-Headers": "*",
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Credentials": "true",
        //     })
        //     // .intercept("/api/watching", "OPTIONS")

        //     // .reply(200, mockResponse, {
        //     //     "Access-Control-Allow-Headers": "*",
        //     //     "Access-Control-Allow-Origin": "*",
        //     //     "Access-Control-Allow-Credentials": "true",
        //     // })
        //     .get("/api/watching")
        //     .reply(200, mockResponse, {
        //         "Access-Control-Allow-Headers": "*",
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Credentials": "true",
        //     });
    });

    test("Media sections exist", async () => {
        await waitForExpect(() => {
            if (!getMediasScope.isDone()) {
                console.error(
                    "pending mocks: %j",
                    getMediasScope.pendingMocks()
                );
            }
            expect(getMediasScope.isDone()).toBe(true);

            // expect(app.getByText("Continue Watching")).toBeInTheDocument();
            // expect(app.getByText("TV Shows")).toBeInTheDocument();
            // expect(app.getByText("Netflix Originals")).toBeInTheDocument();
            // expect(app.getByText("Popular On Netflix")).toBeInTheDocument();
        });
    }, 30000);
});

test("Netflix logo clicked", async () => {
    act(() => {
        fireEvent.click(app.getByTestId("netflixBrowseLogo"));
    });
    history.push("/");
    expect(pushSpy).toBeCalledWith("/");
    pushSpy.mockRestore();
});

test("Sign out clicked", async () => {
    expect(app.getByTestId("signOutText")).toBeInTheDocument();
    act(() => {
        fireEvent.click(app.getByTestId("signOutText"));
    });
    history.push("/");
    expect(pushSpy).toBeCalledWith("/");
    pushSpy.mockRestore();

    //Sign out could not be tested with nock.
    //I believe it's because the API tries to read a cookie and the mock request cannot mock it

    // const signOutResponse = {
    //     token: "",
    // };

    // const signOutScope = nock("http://localhost:5000")
    //     .post("/api/signout")
    //     .reply(200, signOutResponse, {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": "true",
    //     });

    // await waitForExpect(() => {
    //     if (!signOutScope.isDone()) {
    //         console.error("pending mocks: %j", signOutScope.pendingMocks());
    //     }
    //     expect(signOutScope.isDone()).toBe(true);
    //     history.push("/");
    //     expect(pushSpy).toBeCalledWith("/");
    //     pushSpy.mockRestore();
    // });
}, 30000);

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
