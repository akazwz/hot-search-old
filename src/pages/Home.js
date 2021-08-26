import React, {useEffect, useState} from 'react';
import {GetHotSearchesByDuration} from "../api/hot-search";
import HotSearch from '../components/HotSearch';
import {BackTop, message} from 'antd';

const Home = () => {
    const [hotSearchData, setHotSearchData] = useState();
    const handleGetCurrentHotSearch = () => {
        const start = "";
        const stop = "";
        GetHotSearchesByDuration(start, stop)
            .then((res) => {
                if (res.status !== 200) {
                    message.error("获取数据失败").then(r => {
                        console.log(r);
                    });
                }
                const {code, data, msg} = res.data;
                const {searches} = data;
                if (code !== 2000) {
                    message.error(msg).then(r => {
                        console.log(r);
                    });
                }
                setHotSearchData(searches);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        handleGetCurrentHotSearch();
    }, []);

    return (
        <div>
            <BackTop/>
            <HotSearch hotSearch={hotSearchData}/>
        </div>
    );
};

export default Home;
