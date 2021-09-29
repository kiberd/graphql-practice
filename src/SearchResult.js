import React, { useState, useMemo } from "react";
import RepoResult from "./RepoResult";

const SearchResult = React.memo((props) => {

    const result = props.result;
    return (
        <div>
            {
                result && result.map((repo, index) => (
                    <RepoResult repo={repo} key={index}></RepoResult>
                ))
            }
        </div>
    )
}
);

export default SearchResult;