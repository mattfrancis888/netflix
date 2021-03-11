import React, { useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";
const Searchbar: React.FC<{}> = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchIconFirstClick, setSearchIconFirstClick] = useState(false);
    //For Query Strings:
    const { search } = useLocation();
    const queryValues = queryString.parse(search);

    useEffect(() => {
        // if (queryValues.category) setFilterCategory(queryValues.category);
        anime({
            targets: ".searchBarForm",
            // Properties
            // Animation Parameters
            width: ["10%", "75%"],
            duration: 450,

            easing: "easeOutQuad",
        });
    }, [searchIconFirstClick]);

    // const directToListingsPage = () => {
    //     if (filterQueries && searchValue !== "") {
    //         // history.push(`/listings/1?search=${searchValue}&${filterQueries}`);
    //         history.push({
    //             pathname: "/listings/1",
    //             search: `?search=${searchValue}&${filterQueries}`,
    //         });
    //     } else if (filterQueries) {
    //         // history.push(`/listings/1?${filterQueries}`);
    //         history.push({
    //             pathname: "/listings/1",
    //             search: `?${filterQueries}`,
    //         });
    //     } else if (searchValue) {
    //         //history.push(`/listings/1?search=${searchValue}`);
    //         history.push({
    //             pathname: "/listings/1",
    //             search: `?search=${searchValue}`,
    //         });
    //     } else {
    //         history.push(`/listings/1`);
    //     }
    // };

    const handleKeyDown = (event: any) => {
        //https://stackoverflow.com/questions/31272207/to-call-onchange-event-after-pressing-enter-key
        if (event.key === "Enter") {
            event.preventDefault(); //so ?search= won't automatically be inserted in the query when enter is clicked
            // directToListingsPage();
        }
    };

    return (
        <form
            // className={"searchBarForm"}
            className={
                !searchIconFirstClick ? "onlyShowSearchIcon" : "searchBarForm"
            }
        >
            <AiOutlineSearch
                className="searchBarIcons"
                data-testid="searchIcon"
                onClick={() => {
                    setSearchIconFirstClick(true);
                    // directToListingsPage();

                    anime({
                        targets: ".searchBarInput",
                        // Properties
                        // Animation Parameters
                        width: ["0%", "100%"],
                        duration: 450,

                        easing: "easeOutQuad",
                    });
                }}
            />
            <input
                data-testid="searchBarInput"
                className="searchBarInput"
                // className={
                //     !searchIconFirstClick
                //         ? "searchBarInputHide"
                //         : "searchBarInput"
                // }
                type="search"
                placeholder="Search titles"
                // aria-label="Search"
                value={searchValue}
                name="search"
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
        </form>
    );
};

export default Searchbar;
