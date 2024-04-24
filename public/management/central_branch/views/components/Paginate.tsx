import React from 'react';
export interface Props {}


const Paginate: React.FC<Props> = (props: Props) => {
    return (
        <div className="pagination_part">
            <ul className="pagination">
                <li>
                    <a
                        className=""
                        href="http://127.0.0.1:8000/api/v1/user/all?page=2"
                    >
                        <span>« </span>
                    </a>
                </li>
                <li>
                    <a
                        className=""
                        href="http://127.0.0.1:8000/api/v1/user/all?page=1"
                    >
                        <span>1</span>
                    </a>
                </li>
                <li>
                    <a
                        className=""
                        href="http://127.0.0.1:8000/api/v1/user/all?page=2"
                    >
                        <span>2</span>
                    </a>
                </li>
                <li>
                    <a
                        className="active"
                        href="http://127.0.0.1:8000/api/v1/user/all?page=3"
                    >
                        <span>3</span>
                    </a>
                </li>
                <li>
                    <a className="">
                        <span> »</span>
                    </a>
                </li>
            </ul>
            <div className="showing">21 - 23 of 23</div>
            <div className="limit">
                <select name="" id="">
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>
    );
};

export default Paginate;
