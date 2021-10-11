import React from 'react';
import { Col, List, Row } from 'antd';
import { Link } from 'react-router-dom';
import '../style/hot-search.less';
import Text from 'antd/lib/typography/Text';

// 单次热搜的展示,为50个热搜的列表
const HotSearch = (props) => {
    return (
        <Row>
            <Col xs={0} sm={0} md={2} lg={3} xl={8}>
            </Col>
            <Col xs={24} sm={24} md={20} lg={18} xl={8}>
                <List
                    itemLayout='horizontal'
                    dataSource={props.hotSearch}
                    renderItem={(item) => {
                        const {rank, content, hot, tag, icon} = item
                        const contentUrl = encodeURIComponent(content);
                        return (
                            (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Text style={{
                                            color: rank <= 3 ? '#F24949' : '#F28241',
                                            fontWeight: rank <= 3 ? '700' : '500',
                                            fontSize: 17,
                                            fontStyle: 'italic',
                                            marginLeft: '5px',
                                        }}>{rank}</Text>}
                                        title={<Link to={"/hot-search-data/" + contentUrl}>
                                            <Text style={{
                                                marginLeft: '3px',
                                                fontSize: 17,
                                                fontWeight: '500',
                                            }}
                                            >
                                                {content}
                                            </Text>
                                            <Text style={{
                                                fontWeight: '300',
                                                fontSize: 13,
                                                marginLeft: '7px',
                                            }}
                                            >
                                                {hot}
                                            </Text>
                                            {tag === '' ? null : (
                                                <Text style={{
                                                    color: '#F28241',
                                                    fontSize: 13,
                                                    marginLeft: 3,
                                                }}
                                                >{tag}</Text>
                                            )}
                                            <Text style={{
                                                color: icon === '新' ? '#4EA4D9' : '#EE2027',
                                                fontSize: 14,
                                                marginLeft: 3,
                                            }}
                                            >
                                                {icon}
                                            </Text>
                                        </Link>}
                                    />
                                </List.Item>
                            )
                        );
                    }}
                />
            </Col>
            <Col xs={0} sm={0} md={2} lg={3} xl={8}>
            </Col>
        </Row>
    );
};

export default HotSearch;
