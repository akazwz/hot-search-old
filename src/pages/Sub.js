import React from 'react';
import { Tooltip, Progress, Col, Row, Divider, Card } from 'antd';
import { TagOutlined, WechatOutlined, MessageOutlined, ThunderboltOutlined } from '@ant-design/icons';

const Sub = () => {
    const data = [
        {
            title: '关键词订阅',
            icon: <TagOutlined />,
        },
        {
            title: '及时提醒',
            icon: <ThunderboltOutlined />,
        },
        {
            title: '微信通知',
            icon: <WechatOutlined />,
        },
        {
            title: '短信通知',
            icon: <MessageOutlined />,
        },
    ];

    const items = data.map((item) => {
        return (
            <Col span={12} style={{marginBottom: "30px"}}>
                <Card title={item.icon} bordered={true}>
                    {item.title}
                </Card>
            </Col>
        );
    });

    return (
        <div style={{textAlign: "center"}}>
            <Divider>
                功能预览(开发中)
            </Divider>
            <Row gutter={16}>
                {items}
            </Row>
            <Divider>
                开发进度
            </Divider>
            <Tooltip title="在做了">
                <Progress type="circle" percent={70} />
            </Tooltip>
        </div>
    );
};

export default Sub;
