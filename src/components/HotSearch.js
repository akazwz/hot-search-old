import React from 'react';
import {Avatar, List} from 'antd';

const HotSearch = (props) => {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={props.hotSearch}
                renderItem={(item) => {
                    const {rank, content, topic_lead} = item
                    return (
                        (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar>{rank}</Avatar>}
                                    title={<a href="https://ant.design">{content}</a>}
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
