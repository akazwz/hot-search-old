import React from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';

const MyHeader = () => {
    return (
        <div className="header-link">
            <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                    <Link to="/">当前热搜</Link>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Link to="/history-hot-searches">历史热搜</Link>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Link to="/hot-search-data">热搜数据</Link>
                </Col>
            </Row>
        </div>
    );
};

export default MyHeader;
