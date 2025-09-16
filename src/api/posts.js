import axios from "axios";
import config from '../config/index.js';

export default axios.create({
    baseURL : config.apiBaseURL,
    params : {
        key : config.apiKey,
        token : config.apiToken,
    },
});