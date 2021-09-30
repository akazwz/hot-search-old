import React, { useEffect, useState } from 'react';
import {GithubOutlined} from '@ant-design/icons';
import GitHubCalendar from "../components/GitHubCalendar";
import { GetGithubCalendarByUsername } from "../api/hot-search";
import { message } from "antd";

const About = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    useEffect(() => {
        GetGithubCalendarByUsername("akazwz").then((res) => {
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
                const {count,date,level} = contributions[i];
                dataLater.push([date, level,count]);
            }
            setData(dataLater);
        }).catch((err) => {
            message.error("获取数据失败" + err).then();
        });
    }, []);

    return (
        <div style={{
            textAlign: 'center',
            marginTop: 30,
        }}>
            <h2>赵文卓</h2>
            <br/>
            <a href="https://github.com/akazwz">
                <GithubOutlined style={{
                    fontSize: 30,
                }}/>
            </a>

            <br/>
            <text>{total} contributions in 2021</text>
            <GitHubCalendar data={data}/>
        </div>
    );
};

export default About;
