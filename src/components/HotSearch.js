import React from 'react';
import {Avatar, List} from 'antd';
import {Link} from 'react-router-dom'
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
                                    title={<Link to={"/hot-search-data/" + content}><span
                                        className="content-span">{content}</span>&nbsp;<span
                                        className="hot-span">{hot}</span></Link>}
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
