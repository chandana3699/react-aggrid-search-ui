import { debounce, throttle } from "lodash";

export const debounceSearch = debounce((fn) => fn(), 300);
export const throttleDownload = throttle((fn) => fn(), 1000);
