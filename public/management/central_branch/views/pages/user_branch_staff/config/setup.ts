import setup_type from './setup_type';

const prefix: string = 'Branch Staff';
const setup: setup_type = {
    prefix,
    module_name: 'user_branch_staff',

    route_prefix: 'branch-staffs',
    api_prefix: 'admin-users',

    store_prefix: 'branchStaff',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
