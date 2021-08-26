import React, {useEffect, useState} from 'react';
import GetHotSearchesByDuration from "../api/hot-search";
import HotSearch from '../components/HotSearch';
import {BackTop} from 'antd';

const Home = () => {
    const [hotSearchData, setHotSearchData] = useState();
    const handleGetCurrentHotSearch = () => {
        const start = ""
        const stop = ""
        GetHotSearchesByDuration(start, stop)
            .then((res) => {
                console.log(res);
                if (res.status !== 200) {
                    alert("获取数据错误");
                    return
                }
                const {code, data} = res.data;
                const {searches} = data;
                if (code !== 2000) {
                    alert("获取数据错误");
                    return;
                }
                setHotSearchData(searches)
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
