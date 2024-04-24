import React from 'react';
export interface Props {}

const Footer: React.FC<Props> = (props: Props) => {
    return (
        <div className="footer">
            <div className="action_btns">
                <ul>
                    <li>
                        <a href="#">
                            <span className="material-symbols-outlined fill">
                                add
                            </span>
                            <div className="text">create new</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-outlined fill">
                                download
                            </span>
                            <div className="text">Export All</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-outlined fill">
                                upload
                            </span>
                            <div className="text">Import All</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
