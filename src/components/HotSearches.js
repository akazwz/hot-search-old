import React, {useEffect, useState} from 'react';
import {Tag, Row, Col, Affix} from 'antd';
import {LeftCircleOutlined, RightCircleOutlined, ClockCircleOutlined} from '@ant-design/icons';
import HotSearch from "./HotSearch";

const HotSearches = (props) => {
    const hotSearches = props.hotSearches;
    console.log(hotSearches);
    const [hotSearch, setHotSearch] = useState([]);
    const [top, setTop] = useState(100);

    useEffect(() => {
        const height = window.innerHeight;
        setTop(height / 2);
        if (hotSearches.length > 0) {
            const {searches} = hotSearches[0];
            setHotSearch(searches);
        }

    }, [hotSearches])

    return (
        <div>
            <Row className="show-single-hot-search">
                <Col span={24}>
                    <Affix offsetTop={10}>
                        <Tag icon={ClockCircleOutlined}>
                            2021-03-07 13:52
                        </Tag>
                    </Affix>
                </Col>
            </Row>
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
