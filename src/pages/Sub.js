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
                功能预览
            </Divider>
            <Row gutter={16}>
                {items}
            </Row>
            <Tooltip title="新建文件夹">
                <Progress type="circle" percent={30} />
            </Tooltip>
        </div>
    );
};

export default Sub;
