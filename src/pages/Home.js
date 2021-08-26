import React from 'react';
import Button from 'antd/lib/button'
import GetHotSearchesByDuration from "../api/hot-search";

const Home = () => {
    const handleBtnGetHotSearches = () => {
        const start = ""
        const stop = ""
        GetHotSearchesByDuration(start, stop)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <Button onClick={handleBtnGetHotSearches}>
                Get Hot Searches
            </Button>
        </div>
    );
};

export default Home;
