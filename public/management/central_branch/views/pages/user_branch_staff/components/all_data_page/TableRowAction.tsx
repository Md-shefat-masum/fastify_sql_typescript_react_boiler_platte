import React, { useRef } from 'react';
import { anyObject } from '../../../../../common_types/object';
export interface Props {
    item: anyObject;
}
const TableRowAction: React.FC<Props> = ({ item }: Props) => {
    const toggle_icon = useRef<HTMLElement | null>(null);
    function active_row() {
        if (toggle_icon.current) {
            let parent = toggle_icon.current.parentNode as HTMLElement | null;
            if (parent && parent.parentNode) {
                parent = parent.parentNode as HTMLElement;
            }

            const table_rows =
                document.querySelectorAll<HTMLElement>('.table_rows');
            if (table_rows.length) {
                [...table_rows].forEach((i) => {
                    if (i !== parent) i.classList.remove('active');
                });
            }

            if (parent) {
                parent.classList.toggle('active');
            }
        }
    }
    return (
        <>
            <span className="icon" ref={toggle_icon} onClick={active_row} />
            <div className="table_action_btns">
                <ul>
                    <li>
                        <a href={`/user/${item.id}`}>Show</a>
                    </li>
                    <li>
                        <a href={`/user/edit/${item.id}`}>Edit</a>
                    </li>
                    <li>
                        <a href={`/user/delete/${item.id}`}>Delete</a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default TableRowAction;
