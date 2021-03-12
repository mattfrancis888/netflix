import React, { useRef, useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchMediasByKeyword } from "../actions";
import anime from "animejs/lib/anime.es.js";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
interface SearchbarProps {
    fetchMediasByKeyword?(searchKeyword: string): void;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const [searchIconFirstClick, setSearchIconFirstClick] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // Send Axios request here
            if (props.fetchMediasByKeyword && searchIconFirstClick) {
                // props.fetchMediasByKeyword(searchTerm);

                if (searchTerm === "") {
                    history.push("/browse");
                } else {
                    history.push(`/search?q=${searchTerm}`);
                }
            }
        }, 850);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        anime({
            targets: ".searchBarForm",
            // Properties
            // Animation Parameters
            width: ["10%", "75%"],
            duration: 450,

            easing: "easeOutQuad",
        });
    }, [searchIconFirstClick]);

    const handleKeyDown = (event: any) => {
        //https://stackoverflow.com/questions/31272207/to-call-onchange-event-after-pressing-enter-key
        if (event.key === "Enter") {
            event.preventDefault();

            if (searchTerm === "") {
                history.push("/browse");
            } else {
                history.push(`/search?q=${searchTerm}`);
            }
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
                    // directToListingsPage();
                    if (!searchIconFirstClick) {
                        anime({
                            targets: ".searchBarInput",
                            // Properties
                            // Animation Parameters
                            width: ["0%", "100%"],
                            duration: 450,

                            easing: "easeOutQuad",
                        });
                        searchBarInputRef.current?.focus();
                    }

                    setSearchIconFirstClick(true);
                }}
            />
            <input
                data-testid="searchBarInput"
                className="searchBarInput"
                type="search"
                placeholder="Search titles"
                name="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                ref={searchBarInputRef}
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
