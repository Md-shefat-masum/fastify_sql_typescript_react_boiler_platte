import React from 'react';
import { createPortal } from 'react-dom';
import DateEl from '../../../../components/DateEl';
import { RootState, useAppDispatch } from '../../../../../store';
import storeSlice from '../../config/store';
import { initialState } from '../../config/store/inital_state';
import { useSelector } from 'react-redux';
import setup from '../../config/setup';
export interface Props {}

const modalRoot = document.getElementById('filter-root');

const QuickView: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    function get_data(data: { [key: string]: any }): void {
        console.log(data);
    }

    function close_filter(action: boolean = true) {
        dispatch(storeSlice.actions.set_show_filter_canvas(action));
    }

    if (modalRoot) {
        return createPortal(
            <div className="off_canvas quick_view">
                <div className="off_canvas_body">
                    <div className="header">
                        <h3 className="heading_text">Quick View</h3>
                        <button
                            className="close_button"
                            onClick={() => close_filter(false)}
                        >
                            <span className="material-symbols-outlined fill">
                                close
                            </span>
                        </button>
                    </div>

                    <div className="content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>:</th>
                                    <th>md shefat</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div className="off_canvas_overlay"></div>
            </div>,
            modalRoot,
        );
    } else {
        return <></>;
    }
};

export default QuickView;
