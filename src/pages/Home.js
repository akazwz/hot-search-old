import React, { useEffect, useState } from 'react';
import { GetCurrentHotSearch, GetHotSearchesByDuration } from '../api/hot-search';
import HotSearch from '../components/HotSearch';
import { BackTop, message } from 'antd';

// 主页,当前热搜
const Home = () => {
    const [hotSearchData, setHotSearchData] = useState();
    const handleGetCurrentHotSearch = () => {
        GetCurrentHotSearch()
            .then((res) => {
                if ( res.status !== 200 ) {
                    message.error('获取数据失败').then();
                }
                const {code, data, msg} = res.data;
                const {searches} = data;
                if ( code !== 2000 ) {
                    message.error(msg).then();
                }
                setHotSearchData(searches);
            })
            .catch((err) => {
                console.log(err);
                message.error('获取数据失败').then();
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
