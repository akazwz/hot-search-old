import React, {useEffect, useState} from 'react';
import {Tag, Row, Col, Affix, Button} from 'antd';
import {
    ClockCircleOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import HotSearch from "./HotSearch";

const HotSearches = (props) => {
    const propSearches = props.searches;
    const [hotSearch, setHotSearch] = useState([]);
    const [top, setTop] = useState(100);
    const [index, setIndex] = useState(0);
    const [dateTime, setDateTime] = useState("1998-03-07 21:59:07");
    useEffect(() => {
        const height = window.innerHeight;
        setTop(height / 2);
        if (propSearches.length > 0) {
            const {searches, time} = propSearches[index];
            setHotSearch(searches);
            setDateTime(time);
        }
    }, [index, propSearches])

    const handleBtnNextOnClick = () => {
        if (propSearches.length > 0) {
            if (index === propSearches.length - 1) {
                setIndex(0);
                const {searches, time} = propSearches[0];
                setHotSearch(searches);
                setDateTime(time);
                return;
            }
            const {searches, time} = propSearches[index + 1];
            setHotSearch(searches);
            setDateTime(time);
            setIndex(index + 1);
        }
    };

    const handleBtnLastOnClick = () => {
        if (propSearches.length > 0) {
            if (index === 0) {
                setIndex(propSearches.length - 1);
                const {searches, time} = propSearches[propSearches.length - 1];
                setHotSearch(searches);
                setDateTime(time);
                return;
            }
            const {searches, time} = propSearches[index - 1];
            setHotSearch(searches);
            setDateTime(time);
            setIndex(index - 1);
        }
    };

    return (
        <div>
            <Row className="show-single-hot-search">
                <Col span={24}>
                    <Affix offsetTop={17}>
                        <Tag icon={<ClockCircleOutlined/>}>
                            {dateTime}
                        </Tag>
                    </Affix>
                </Col>
            </Row>

            <Row className="show-single-hot-search">
                <Col span={2}>
                    <Affix offsetTop={top}>
                        <Button
                            shape="circle"
                            size="large"
                            icon={<LeftOutlined className="arrow-change-hot-search"
                                                onClick={handleBtnLastOnClick}/>}/>
                    </Affix>
                </Col>
                <Col span={20}>
                    <HotSearch hotSearch={hotSearch}/>
                </Col>
                <Col span={2}>
                    <Affix offsetTop={top}>
                        <Button
                            shape="circle"
                            size="large"
                            icon={<RightOutlined className="arrow-change-hot-search"
                                                 onClick={handleBtnNextOnClick}/>}/>
                    </Affix>
                </Col>
            </Row>
        </div>
    );
};

export default HotSearches;
