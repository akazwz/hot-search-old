import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
    useRouteMatch,
    useHistory,
} from 'react-router-dom';

// 网页头部, 路由
const MyHeader = () => {
    let history = useHistory();
    let historyHotSearches = useRouteMatch("/about");
    let hotSearchData = useRouteMatch("/hot-search-data");
    const [activeKey, setActiveKey] = useState('/');

    const handleMenuOnClick = (obj) => {
        setActiveKey(obj.key);
        history.push(obj.key);
    }
    useEffect(() => {
        if (historyHotSearches !== null) {
            setActiveKey(historyHotSearches.path);
        }
        if (hotSearchData !== null) {
            setActiveKey(hotSearchData.path);
        }
    }, [historyHotSearches, hotSearchData]);

    return (
        <div className="header-link">
            <Menu className="menu" onClick={handleMenuOnClick} selectedKeys={[activeKey]} mode="horizontal">
                <Menu.Item key="/">
                    今
                </Menu.Item>
                <Menu.Item key="/hot-search-data">
                    势
                </Menu.Item>
                <Menu.Item key="/about">
                    著
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default MyHeader;
