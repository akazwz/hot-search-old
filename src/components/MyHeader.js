import React, {useEffect, useState} from 'react';
import {Tabs} from 'antd';
import {
    useRouteMatch,
    useHistory,
} from "react-router-dom";

const {TabPane} = Tabs;


// 网页头部, tab active
const MyHeader = () => {
    let history = useHistory();
    let historyHotSearches = useRouteMatch("/history-hot-searches");
    let hotSearchData = useRouteMatch("/hot-search-data");
    const [activeKey, setActiveKey] = useState('/');

    const handleTabsOnChange = (key) => {
        setActiveKey(key);
        history.push(key);
    }
    useEffect(() => {
        if (historyHotSearches !== null) {
            setActiveKey(historyHotSearches.path);
        }
        if (hotSearchData !== null) {
            setActiveKey(hotSearchData.path);
        }
    }, [historyHotSearches, hotSearchData])

    return (
        <div className="header-link">
            <Tabs
                activeKey={activeKey}
                defaultActiveKey="/"
                centered size="large"
                tabBarGutter={70}
                onChange={handleTabsOnChange}>
                <TabPane tab="当前热搜" key="/">
                </TabPane>
                <TabPane tab="历史热搜" key="/history-hot-searches">
                </TabPane>
                <TabPane tab="热搜数据" key="/hot-search-data">
                </TabPane>
            </Tabs>
        </div>
    );
};

export default MyHeader;
