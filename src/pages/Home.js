import React, { useEffect, useState } from 'react';
import { GetCurrentHotSearch } from '../api/hot-search';
import HotSearch from '../components/HotSearch';
import { BackTop, message } from 'antd';
import WordCloud from '../components/WordCloud';

// 主页,当前热搜
const Home = () => {
    const [hotSearchData, setHotSearchData] = useState();
    const [wordData, setWordData] = useState([]);
    const handleGetCurrentHotSearch = () => {
        GetCurrentHotSearch()
            .then((res) => {
                if (res.status !== 200) {
                    message.error('获取数据失败').then();
                }
                const {code, data, msg} = res.data;
                if (code !== 2000) {
                    message.error(msg).then();
                    return;
                }
                const {searches} = data;
                const {content} = searches[0];
                localStorage.setItem('placeholder', content)
                const wordArr = searches.slice(0, 20)
                let wordDataArr = []
                wordArr.map((search) => {
                    const {content, hot} = search;
                    wordDataArr.push({name: content, value: hot})
                    return "";
                });
                setWordData(wordDataArr)
                setHotSearchData(searches);
            })
            .catch((err) => {
                message.error('获取数据失败' + err).then();
            })
    };

    useEffect(() => {
        handleGetCurrentHotSearch();
    }, []);

    return (
        <div>
            <BackTop />
            <WordCloud data={wordData} />
            <HotSearch hotSearch={hotSearchData} />
        </div>
    );
};

export default Home;
