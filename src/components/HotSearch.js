import React from 'react';
import {Avatar, List} from 'antd';
import {Link} from 'react-router-dom';
import '../style/hot-search.less';

// 单次热搜的展示,为50个热搜的列表
const HotSearch = (props) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.hotSearch}
            renderItem={(item) => {
                const {rank, content, hot, topic_lead} = item
                const contentUrl = encodeURIComponent(content);
                return (
                    (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar>{rank}</Avatar>}
                                title={<Link to={"/hot-search-data/" + contentUrl}><span
                                    className="content-span">{content}</span>&nbsp;<span
                                    className="hot-span">{hot}</span></Link>}
                                description={topic_lead}
                            />
                        </List.Item>
                    )
                );
            }}
        />
    );
};

export default HotSearch;
