import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../common_types/object';
import TableRow from './components/all_data_page/TableRow';
import TableRowAction from './components/all_data_page/TableRowAction';

export interface Props {}

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(all({}) as any);
    }, []);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    return (
        <div className="page_content">
            <div
                className="explore_window fixed_size"
                id="users"
                style={{ zIndex: 75 }}
            >
                <Header></Header>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th />
                                        <th>
                                            <input
                                                type="checkbox"
                                                className="form_checkbox"
                                            />
                                        </th>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Image</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {(state.all as any)?.data?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr
                                                    key={i.id}
                                                    className="table_rows"
                                                >
                                                    <td>
                                                        <TableRowAction
                                                            item={i}
                                                        ></TableRowAction>
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form_checkbox"
                                                            type="checkbox"
                                                        />
                                                    </td>
                                                    <td>{i.id}</td>
                                                    <td>
                                                        <span
                                                            onClick={() =>
                                                                quick_view(i)
                                                            }
                                                        >
                                                            {i.name}
                                                        </span>
                                                    </td>
                                                    <td>{i.preferred_name}</td>
                                                    <td>
                                                        <img
                                                            src="/assets/dashboard/images/avatar.png"
                                                            alt=""
                                                            style={{
                                                                height: 30,
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate>
                    </div>
                </div>
                <TableFooter></TableFooter>
            </div>

            <Filter></Filter>
            <QuickView></QuickView>
        </div>
    );
};

export default All;
