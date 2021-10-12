import React from 'react';
import { Tooltip, Progress, List, Avatar } from 'antd';
import { WeiboOutlined, WechatOutlined, MessageOutlined } from '@ant-design/icons';

const Sub = () => {
    const data = [
        {
            title: '关键词订阅',
            icon: <WeiboOutlined />,
        },
        {
            title: '及时提醒',
            icon: <WeiboOutlined />,
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

    return (
        <div style={{
            textAlign: 'center',
            margin: 10,
        }}>
            <h3>热搜预警功能预览</h3>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={item.icon} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />,
            <Tooltip title="新建文件夹">
                <Progress type="circle" percent={30} />
            </Tooltip>
        </div>
    );
};

export default Sub;
