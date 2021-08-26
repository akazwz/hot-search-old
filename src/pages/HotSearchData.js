import React, {useEffect, useState} from 'react';
import {message} from 'antd';
import HotSearchRank from '../components/HotSearchRank';
import {GetHotSearchesByContent} from "../api/hot-search";

const HotSearchData = () => {
    const content = "孟晚舟被加拿大非法拘押1000天";
    const start = "";
    const stop = "";
    const defaultDataset = [['time', 'rank', 'hot']];
    const [hotSearchesDataset, setHotSearchesDataset] = useState(defaultDataset);
    const [change, SetChange] = useState(false);
    const getHotSearches = (content, start, stop) => {
        GetHotSearchesByContent(content, start, stop)
            .then((res) => {
                if (res.status !== 200) {
                    message.error("获取数据失败").then(r => {
                        console.log(r);
                    });
                }
                const {code, data, msg} = res.data
                if (code !== 2000) {
                    message.error(msg).then(r => {
                        console.log(r);
                    });
                }
                for (let i = 0; i < data.length; i++) {
                    const hotSearch = data[i];
                    const {time, searches} = hotSearch;
                    const singleSearch = searches[0];
                    const {rank, content, hot, link, topic_lead} = singleSearch;
                    defaultDataset.push(
                        [time, rank, hot]
                    );
                }
                setHotSearchesDataset(defaultDataset);
                SetChange(true);
            }).catch((err) => {
            message.error("获取数据失败").then(r => {
                console.log(r);
            });
            console.log(err);
        });
    }
    useEffect(() => {
        getHotSearches(content, start, stop);
    }, [change])
    return (
        <div>
            <HotSearchRank source={hotSearchesDataset}/>
        </div>
    );
};

export default HotSearchData;
