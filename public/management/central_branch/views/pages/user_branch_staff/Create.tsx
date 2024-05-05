import React from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import axios from 'axios';
export interface Props {}

const Create: React.FC<Props> = (props: Props) => {
    function handle_submit(e) {
        e.preventDefault();
        // window.fetch('/api/v1/admin-users/store', {
        //     method: 'POST',
        //     body: new FormData(e.target),
        //     // body: JSON.stringify({ name: 1212, preferred_name: 343 }),
        // });

        axios
            .post('/api/v1/admin-users/store', new FormData(e.target))
            .then((res) => {
                console.log(res.data);
            });
    }
    return (
        <>
            <div className="page_content">
                <div
                    className="explore_window fixed_size"
                    id="users"
                    style={{ zIndex: 75 }}
                >
                    <Header></Header>
                    <div className="content_body">
                        <form onSubmit={(e) => handle_submit(e)}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" />
                            </div>
                            <div className="form-group">
                                <label>Preferred Name</label>
                                <input type="text" name="preferred_name" />
                            </div>
                            <button>submit</button>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
