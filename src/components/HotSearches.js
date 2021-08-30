import React, {useEffect, useState} from 'react';
import {Tag, Row, Col, Affix} from 'antd';
import {LeftCircleOutlined, RightCircleOutlined, ClockCircleOutlined} from '@ant-design/icons';
import HotSearch from "./HotSearch";

const HotSearches = (props) => {
    const propSearches = props.searches;
    const [hotSearch, setHotSearch] = useState([]);
    const [top, setTop] = useState(100);

    useEffect(() => {
        const height = window.innerHeight;
        setTop(height / 2);
        if (propSearches.length > 0) {
            const {searches} = propSearches[0];
            setHotSearch(searches);
        }

    }, [propSearches])

    return (
        <div>
            <Row className="show-single-hot-search">
                <Col span={2}>
                    <Affix offsetTop={top}>
                        <LeftCircleOutlined className="arrow-change-hot-search"/>
                    </Affix>
                </Col>
                <Col span={20}>
                    <HotSearch hotSearch={hotSearch}/>
                </Col>
                <Col span={2}>
                    <Affix offsetTop={top}>
                        <RightCircleOutlined className="arrow-change-hot-search"/>
                    </Affix>
                </Col>
            </Row>
        </div>
    );
};

export default HotSearches;
