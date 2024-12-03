import FrameComponent4 from "../components/FrameComponent4";
import SearchedGroupComponent from "../components/SearchedGroupComponent";
import "./SearchedResults.css";
import React from 'react';
import { useSearchParams } from "react-router-dom";

const SearchedResults = ({ location }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("Searched: ", searchParams.get("query"))
  return (
    <div className="searched-results">
      <FrameComponent4 />
      <SearchedGroupComponent searchQuery={searchParams.get("query")}/>
    </div>
  ); 
};

export default SearchedResults;
