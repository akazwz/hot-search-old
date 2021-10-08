import React, { useState } from 'react';
import { Empty, DatePicker, Space, Row, Col, Button, BackTop, message, Divider } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import HotSearches from '../components/HotSearches';
import { GetHotSearchesByDuration } from '../api/hot-search';
import moment from 'moment';

const {RangePicker} = DatePicker;
// 历史热搜
const HistoryHotSearches = () => {
    const [showHotSearches, setShowHotSearches] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dates, setDates] = useState([]);
    const [searches, setSearches] = useState([]);
    const [startStr, setStartStr] = useState('');
    const [endStr, setEndStr] = useState('');

    const handleRangePickerOnChange = (value, dateStr) => {
        setStartStr(dateStr[0].replace(' ', '-').replace(':', '-'));
        setEndStr(dateStr[1].replace(' ', '-').replace(':', '-'));
    };

    const handleBtnStartToSearchOnClick = () => {
        setLoading(true);
        GetHotSearchesByDuration(startStr, endStr)
            .then((res) => {
                if (res.status === 200) {
                    setShowHotSearches(true);
                    setSearches(res.data.data);
                } else {
                    message.error("获取失败").then();
                }
                setLoading(false);
            })
            .catch((err) => {
                message.error("获取失败:" + err).then();
                setLoading(false);
            });
    };

    const disabledDate = current => {
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 3;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 3;
        return tooEarly || tooLate || current < moment("2021-10-1") || current > moment().endOf('day');
    };

    return (
        <div style={{
            margin: 10,
        }}>
            <BackTop />
            <Row className="date-time-picker">
                <Col span={24}>
                    <Space direction="vertical">
                        <RangePicker
                            locale={locale}
                            showTime={{format: 'HH:mm', minuteStep: 1}}
                            format="YYYY-MM-DD HH:mm"
                            disabledDate={disabledDate}
                            onCalendarChange={val => setDates(val)}
                            onChange={handleRangePickerOnChange} />
                    </Space>
                </Col>
            </Row>
            <Divider />
            <Row className="date-time-picker">
                <Col span={24}>
                    <Button
                        onClick={handleBtnStartToSearchOnClick}
                        loading={loading}
                    >
                        开始搜索
                    </Button>
                </Col>
            </Row>
            <Divider />
            {showHotSearches ? <HotSearches searches={searches} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </div>
    );
};

export default HistoryHotSearches;
