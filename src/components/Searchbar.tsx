import React, { useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { fetchMediasByKeyword, Media } from "../actions";
import anime from "animejs/lib/anime.es.js";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
interface SearchbarProps {
    fetchMediasByKeyword?(searchKeyword: string): void;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
    const [searchIconFirstClick, setSearchIconFirstClick] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(searchTerm);
            // Send Axios request here
            if (props.fetchMediasByKeyword && searchIconFirstClick)
                props.fetchMediasByKeyword(searchTerm);
        }, 3000);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

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
                name="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
        </form>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        medias: state.medias,
    };
};

export default connect(mapStateToProps, { fetchMediasByKeyword })(Searchbar);
