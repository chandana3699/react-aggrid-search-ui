import { debounce, throttle } from "lodash";

export const debounceSearch = debounce((fn) => fn(), 1000);
export const throttleDownload = throttle((fn) => fn(), 1000);
