import React from 'react';
export interface Props {}

const HeadSearch: React.FC<Props> = (props: Props) => {
    return (
        <>
            {/* <a href="#">
                <span className="material-symbols-outlined fill">search</span>
            </a> */}
            <input
                className="search"
                placeholder="search.."
                id="table_search_box"
                type="search"
            />
        </>
    );
};

export default HeadSearch;
