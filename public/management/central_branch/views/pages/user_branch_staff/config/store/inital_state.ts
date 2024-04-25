import setup from '../setup';

const store_prefix = setup.prefix;
const api_prefix = setup.api_prefix;

export const initialState = {
    /** loading status */
    is_loading: false,
    loading_text: 'loading..',

    /* data store */
    all: {},
    item: {},
    url: '',

    /* data filters */
    all_data_count: 0, // total data in database
    page: 1,
    paginate: 10,
    search_key: ``,
    orderByCol: 'id',
    orderByAsc: true,
    show_active_data: 1, // show all active data

    /* selected data */
    selected: [], // selected data using checkbox

    /* trigger showing data modal */
    show_filter_canvas: false,
    show_management_modal: false,
    modal_selected_qty: 1, // how much will checked from management modal

    /* trigger showing data form canvas */
    show_create_canvas: false,
    show_edit_canvas: false,

    off_canvas_details: false,
};
