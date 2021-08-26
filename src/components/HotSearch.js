import React from 'react';
import {Avatar, List} from 'antd';
import '../style/hot-search.less'

const HotSearch = (props) => {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={props.hotSearch}
                renderItem={(item) => {
                    const {rank, content, hot, topic_lead} = item
                    return (
                        (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar>{rank}</Avatar>}
                                    title={<a href="https://ant.design"><span
                                        className="content-span">{content}</span>&nbsp;<span
                                        className="hot-span">{hot}</span></a>}
                                    description={topic_lead}
                                />
                            </List.Item>
                        )
                    );
                }}
            />,
        </div>
    );
};

export default HotSearch;
