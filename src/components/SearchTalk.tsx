import React, { useEffect, useState } from "react";
import "../styles/paginate.css";

import TalksCard from "./TalksCard";
import type { TTalksWithSlugsAndThunmbnails } from "../services/talks/talksService.types";
import { fetchAllTalks } from "../services/talks";

const ITEMS_PER_PAGE = 1000;

const SearchTalk: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredTalks, setFilteredTalks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [talksList, setTalksList] = useState<TTalksWithSlugsAndThunmbnails[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const lastPathPart = window.location.pathname
    .split("/")
    .filter(Boolean)
    .pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const talks = await fetchAllTalks();
        setTalksList(talks ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (talksList.length > 0) {
      setFilteredTalks(talksList);
    }
  }, [talksList]);

  const filterTalks = (searchValue: string) => {
    if (searchValue.length > 0) {
      const filtered = talksList.filter((talk) =>
        talk.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredTalks(filtered || []);
      setCurrentPage(1);
      setSearchInput(searchValue);
    } else {
      setFilteredTalks(talksList);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    filterTalks(e.target.value);
    if (e.target.value.trim() === "") {
      setFilteredTalks(talksList);
      setCurrentPage(1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchValue = e.currentTarget.value.trim();
      filterTalks(searchValue);
    }
  };

  const handleClickSearch = () => {
    filterTalks(searchInput);
  };

  const totalPages = Math.ceil(filteredTalks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlogs = filteredTalks?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="blogList_wrapper blogList_wrapper_search talkList_wrapper">
      <div className="blogList_main">
        <div className="search_wrapper"></div>

        <div className="blogList_Container_wrapper">
          <h2 className={`allblog_heading `}>
            {searchInput
              ? filteredTalks.length > 0
                ? `Search Results for "${searchInput}"`
                : `No search results found for "${searchInput}"`
              : "All Talks"}
          </h2>
          {loading ? (
            <h1 className="typo__heading4 --color-primary loader">
              loading...
            </h1>
          ) : (
            <>
              <section
                className={`card_container length-${currentBlogs.length}`}
              >
                {currentBlogs.map(
                  (talksData: TTalksWithSlugsAndThunmbnails, i: any) => {
                    return (
                      <TalksCard
                        url={`/${lastPathPart}/${talksData?.slug}`}
                        varient="post"
                        title={talksData?.title}
                        image={talksData?.thumbnailUrl || ""}
                        imageAlt={talksData.title}
                        blogItemNumber={i}
                      />
                    );
                  }
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchTalk;
