import React from 'react';
import { Link } from 'react-router-dom';
import setup from '../../config/setup';

let route_prefix = setup.route_prefix;

export interface Props {}
const Footer: React.FC<Props> = (props: Props) => {
    return (
        <div className="footer">
            <div className="action_btns">
                <ul>
                    <li>
                        <Link to={`/${route_prefix}/create`}>
                            <span className="material-symbols-outlined fill">
                                add
                            </span>
                            <div className="text">create new</div>
                        </Link>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-outlined fill">
                                download
                            </span>
                            <div className="text">Export</div>
                        </a>
                    </li>
                    {/* <li>
                        <a href="#">
                            <span className="material-symbols-outlined fill">
                                upload
                            </span>
                            <div className="text">Import All</div>
                        </a>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Footer;
