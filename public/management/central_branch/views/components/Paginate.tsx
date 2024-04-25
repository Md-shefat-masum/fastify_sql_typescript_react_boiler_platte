import React from 'react';
import parse from 'html-react-parser';
import { useAppDispatch } from '../../store';
export interface Props {
    data: {
        current_page: number;
        data: [{ [key: string]: any }];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: [{ [key: string]: any }];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
    set_url: Function;
    all: Function;
    set_paginate: Function;
    selected_paginate: number;
}

const Paginate: React.FC<Props> = ({
    data,
    set_url,
    all,
    set_paginate,
    selected_paginate,
}: Props) => {
    const dispatch = useAppDispatch();

    function change_page(url: string, e) {
        e.preventDefault();
        dispatch(set_url(url));
        dispatch(all({}));
    }

    function set_page_limit(value) {
        dispatch(set_url(''));
        dispatch(set_paginate(value));
        dispatch(all({}));
    }

    return (
        <div className="pagination_part">
            <ul className="pagination">
                {data.links?.map((i) => {
                    return (
                        <li>
                            <a
                                onClick={(e) => i.url && change_page(i.url, e)}
                                className={`${i.active ? 'active' : ''}`}
                                href={i.url}
                            >
                                {typeof i.label === 'string'
                                    ? parse(i.label)
                                    : i.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <div className="showing">
                {data.from} - {data.to} of {data.total}
            </div>
            <div className="limit">
                <select
                    value={selected_paginate}
                    onChange={(e) => set_page_limit(e.target.value)}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                </select>
            </div>
        </div>
    );
};

export default Paginate;
