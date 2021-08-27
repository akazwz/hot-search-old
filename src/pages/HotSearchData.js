import React, {useEffect, useState} from 'react';
import {message, Input, Divider, Col, Row} from 'antd';
import HotSearchRank from '../components/HotSearchRank';
import HotSearchHot from '../components/HotSearchHot';
import {GetHotSearchesByContent} from "../api/hot-search";
import {useParams} from "react-router-dom";

const HotSearchData = () => {
    const start = "";
    const stop = "";
    const [showChart, setShowChart] = useState(false);
    let {content} = useParams();
    const defaultDataset = [['time', 'rank', 'hot']];

    const [hotSearchesDataset, setHotSearchesDataset] = useState(defaultDataset);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (!content) {
            setShowChart(false);
        } else {
            getHotSearches(content, start, stop);
            setShowChart(true);
        }
    }, [content]);

    const getHotSearches = (cont, start, stop) => {
        GetHotSearchesByContent(cont, start, stop)
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
            }).catch((err) => {
            message.error("获取数据失败").then(r => {
                console.log(r);
            });
            console.log(err);
        });
    }

    const handleSearchOnInput = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    const {Search} = Input;
    const onSearch = (value) => {
        getHotSearches(value, start, stop);
        message.info(value).then();
    };
    return (
        <div>
            <Divider/>
            <Row gutter={16} className="search-input-box">
                <Col className="gutter-row" span={24}>
                    <Search
                        placeholder={content}
                        allowClear
                        enterButton
                        size="large"
                        onSearch={onSearch}
                        className="search-input"
                        value={searchValue}
                        onInput={handleSearchOnInput}
                    />
                </Col>
            </Row>
            <Divider/>
            {showChart ? <HotSearchRank source={hotSearchesDataset}/> : null}
            {showChart ? <HotSearchHot source={hotSearchesDataset}/> : null}
        </div>
    );
};

export default HotSearchData;
