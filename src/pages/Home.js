import React, {useState} from 'react';
import Button from 'antd/lib/button'
import GetHotSearchesByDuration from "../api/hot-search";
import HotSearch from '../components/HotSearch';

const Home = () => {
    const [hotSearchData, setHotSearchData] = useState();
    const handleBtnGetHotSearches = () => {
        const start = ""
        const stop = ""
        GetHotSearchesByDuration(start, stop)
            .then((res) => {
                console.log(res);
                if (res.status !== 200) {
                    alert("获取数据错误");
                    return
                }
                const {code, data} = res.data;
                const {searches} = data;
                if (code !== 2000) {
                    alert("获取数据错误");
                    return;
                }
                setHotSearchData(searches)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <Button onClick={handleBtnGetHotSearches}>
                Get Hot Searches
            </Button>
            <HotSearch hotSearch={hotSearchData}/>
        </div>
    );
};

export default Home;
