import React, { useEffect, useState } from 'react';
import {GithubOutlined} from '@ant-design/icons';
import GitHubCalendar from "../components/GitHubCalendar";
import { GetGithubCalendarByUsername } from "../api/hot-search";

const About = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    useEffect(() => {
        GetGithubCalendarByUsername("akazwz").then((res) => {
            console.log(res);
            if (res.status !== 200) {
                alert("获取数据失败");
                return
            }
            const {code, msg, data} = res.data;
            const {total, contributions} = data;
            setTotal(total);
            let dataLater = [];
            for (let i = 0; i < contributions.length; i++) {
                const {count,date,level} = contributions[i];
                dataLater.push([date, level,count]);
            }
            setData(dataLater);
        }).catch((err) => {
            console.log(err);
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
