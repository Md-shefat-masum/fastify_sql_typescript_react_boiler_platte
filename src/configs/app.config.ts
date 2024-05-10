import { anyObject } from '../modules/common_types/object';

export const port = 5000;
export const app_config = {
    port,
    server_url: `http://127.0.0.1:${port}`,
} as anyObject;
