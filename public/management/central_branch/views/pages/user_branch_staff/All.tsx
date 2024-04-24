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

export interface Props {}

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(all({}) as any);
    }, []);

    console.log(state.is_loading);
    if (state.is_loading) {
        return <div>loading</div>;
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
                                            <input type="checkbox" />
                                        </th>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Image</th>
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    <tr id="21" className="">
                                        <td>
                                            <span className="icon" />
                                            <div className="table_action_btns">
                                                <ul>
                                                    <li>
                                                        <a href="/user/21">
                                                            Show
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>21</td>
                                        <td>Earnest</td>
                                        <td>Wuckert</td>
                                        <td>dschmidt@example.com</td>
                                        <td>(747) 880-9945</td>
                                        <td>
                                            <img
                                                src="http://127.0.0.1:8000/avatar.png"
                                                alt=""
                                                style={{ height: 30 }}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Paginate></Paginate>
                    </div>
                </div>

                <TableFooter></TableFooter>
            </div>
        </div>
    );
};

export default All;
