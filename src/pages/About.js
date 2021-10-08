import React, { useEffect, useState } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import GitHubCalendar from "../components/GitHubCalendar";
import { GetGithubCalendarByUsername } from "../api/hot-search";
import { message, Divider, Spin, Input } from "antd";

const About = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [username, setUsername] = useState("akazwz");
    useEffect(() => {
        GetGithubCalendarByUsername(username).then((res) => {
            // http status
            if (res.status !== 200) {
                message.error("获取数据失败").then();
                return;
            }
            const {code, msg, data} = res.data;
            // code
            if (code !== 2000) {
                message.error(msg).then();
                return;
            }
            const {total, contributions} = data;
            setTotal(total);
            let dataLater = [];
            for (let i = 0; i < contributions.length; i++) {
                const {count, date, level} = contributions[i];
                dataLater.push([date, level, count]);
            }
            setData(dataLater);
            setShowLoading(false);
        }).catch((err) => {
            message.error("获取数据失败" + err).then();
        });
    }, [username]);

    return (
        <div style={{
            textAlign: 'center',
            marginTop: 30,
        }}>
            <h2>赵文卓</h2>
            <Divider />
            <a href="https://github.com/akazwz">
                <GithubOutlined style={{
                    fontSize: 30,
                }} />
            </a>
            <Divider />
            {showLoading ? <Spin /> : null}
            <h3>{total} contributions in 2021 ({username})</h3>
            <GitHubCalendar data={data} />
            <Divider />
            <Input placeholder="查看我的Github 贡献 Calendar"/>
        </div>
    );
};

export default About;
