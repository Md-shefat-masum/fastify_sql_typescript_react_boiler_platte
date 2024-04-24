import React from 'react';
export interface Props {}

const HeadRightButtons: React.FC<Props> = (props: Props) => {
    return (
        <ul>
            <li>
                <a href="#">
                    <span className="material-symbols-outlined fill">
                        zoom_out_map
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span className="material-symbols-outlined fill">
                        remove
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span className="material-symbols-outlined fill">
                        close
                    </span>
                </a>
            </li>
        </ul>
    );
};

export default HeadRightButtons;
