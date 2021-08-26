const axios = require('axios');
const baseUrl = 'http://localhost:8000';

const GetHotSearchesByDuration = (start, stop) => {
    return axios.get(baseUrl + "/hot-searches", {
        params: {
            start: start,
            stop: stop
        },
    })
}

const GetHotSearchesByContent = (content, start, stop) => {
    return axios.get(baseUrl + "/hot-searches/content/" + content, {
        params: {
            start: start,
            stop: stop
        },
    })
};

export {GetHotSearchesByDuration, GetHotSearchesByContent};

