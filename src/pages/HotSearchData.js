import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { message, Input, Divider, Col, Row, Spin } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import HotSearchRank from '../components/HotSearchRank';
import HotSearchHot from '../components/HotSearchHot';
import { GetHotSearchesByContent } from '../api/hot-search';
import { useParams } from 'react-router-dom';

// 热搜数据
const HotSearchData = () => {
    const start = '2021-10-01-00-00';
    moment.locale('zh-cn');
    const stop = moment().format('YYYY-MM-DD-HH-mm');
    const [showChart, setShowChart] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    let {content} = useParams();
    let defaultDataset;
    defaultDataset = [['time', 'rank', 'hot']];
    const [hotSearchesDataset, setHotSearchesDataset] = useState(defaultDataset);
    const [searchValue, setSearchValue] = useState('');
    const [searchPlaceHolder, setSearchPlaceHolder] = useState('');

    useEffect(() => {
        let placeholder = localStorage.getItem('placeholder');
        if (!content) {
            setSearchPlaceHolder(placeholder);
        } else {
            setSearchValue(content);
            setSearchPlaceHolder(placeholder);
            setShowLoading(true);
            GetHotSearchesByContent(content, start, stop)
                .then((res) => {
                    if (res.status !== 200) {
                        message.error('获取数据失败').then();
                    }
                    const {code, data, msg} = res.data
                    if (code !== 2000) {
                        message.error(msg).then();
                    }
                    for (let i = 0; i < data.length; i++) {
                        const hotSearch = data[i];
                        const {time, searches} = hotSearch;
                        const singleSearch = searches[0];
                        const {rank, hot} = singleSearch;
                        defaultDataset.push(
                            [time, rank, hot]
                        );
                    }
                    setHotSearchesDataset(defaultDataset);
                    setShowLoading(false);
                    setShowChart(true);
                }).catch((err) => {
                setShowLoading(false);
                message.error('获取数据失败' + err).then();
            });
        }
    }, [content, defaultDataset, stop]);

    const getHotSearches = (cont, start, stop) => {
        setShowLoading(true);
        setShowChart(false);
        GetHotSearchesByContent(cont, start, stop)
            .then((res) => {
                if (res.status !== 200) {
                    message.error('获取数据失败').then();
                }
                const {code, data, msg} = res.data
                if (code !== 2000) {
                    message.error(msg).then();
                }
                for (let i = 0; i < data.length; i++) {
                    const hotSearch = data[i];
                    const {time, searches} = hotSearch;
                    const singleSearch = searches[0];
                    const {rank, hot} = singleSearch;
                    defaultDataset.push(
                        [time, rank, hot]
                    );
                }
                setHotSearchesDataset(defaultDataset);
                setShowLoading(false);
                setShowChart(true);
            }).catch((err) => {
            setShowLoading(false);
            message.error('获取数据失败' + err).then();
        });
    }

    const handleSearchOnInput = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    const {Search} = Input;
    const onSearch = (value) => {
        if (searchValue === '') {
            setSearchValue(searchPlaceHolder);
            getHotSearches(searchPlaceHolder, start, stop);
        } else {
            getHotSearches(value, start, stop);
        }
    };
    return (
        <div>
            <Divider />
            <Row gutter={16} className='search-input-box'>
                <Col className='gutter-row' span={24}>
                    <Search
                        placeholder={"大家都在搜：" + searchPlaceHolder}
                        enterButton
                        suffix={searchValue !== '' ? <ClearOutlined onClick={() => {
                            setSearchValue('');
                        }} /> : null}
                        size='large'
                        onSearch={onSearch}
                        className='search-input'
                        value={searchValue}
                        onInput={handleSearchOnInput}
                    />
                    <Divider />
                </Col>
                <Col className='gutter-row' span={24}>
                    {showLoading ? <Spin size='large' /> : null}
                    {showChart ? <HotSearchRank source={hotSearchesDataset} /> : null}
                    {showChart ? <HotSearchHot source={hotSearchesDataset} /> : null}
                </Col>
            </Row>
        </div>
    );
};

export default HotSearchData;
