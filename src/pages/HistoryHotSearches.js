import React, {useState} from 'react';
import {Empty, DatePicker, Space, TimePicker, Row, Col, Button} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';
import HotSearches from '../components/HotSearches';
import {GetHotSearchesByDuration} from "../api/hot-search";

const HistoryHotSearches = () => {
        const [startDateStr, setStartDateStr] = useState('');
        const [startTimeStr, setStartTimeStr] = useState('-00-00');

        const [endDateStr, setEndDateStr] = useState('');
        const [endTimeStr, setEndTimeStr] = useState('-00-00');


        const [showHotSearches, setShowHotSearches] = useState(false);

        const [searches, setSearches] = useState([]);

        const handleStartDatePickerOnChange = (date, dateString) => {
            setStartDateStr(dateString);
        }
        const handleStartTimePickerOnChange = (time, timeString) => {
            setStartTimeStr("-" + timeString.slice(0, 2) + "-" + timeString.slice(3, 5));
        }

        const handleEndDatePickerOnChange = (date, dateString) => {
            setEndDateStr(dateString);
        }
        const handleEndTimePickerOnChange = (time, timeString) => {
            setEndTimeStr("-" + timeString.slice(0, 2) + "-" + timeString.slice(3, 5));
        }

        const handleBtnStartToSearchOnClick = () => {
            const start = startDateStr + startTimeStr;
            const end = endDateStr + endTimeStr;
            GetHotSearchesByDuration(start, end)
                .then((res) => {
                    if (res.status === 200) {
                        setShowHotSearches(true);
                        setSearches(res.data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        return (
            <div>
                <Row className="date-time-picker">
                    <Col span={8}>
                        <Space direction="vertical">
                            {"开始时间"}
                            <DatePicker onChange={handleStartDatePickerOnChange}/>
                            <TimePicker minuteStep={15} format="HH:mm" onChange={handleStartTimePickerOnChange}/>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <ArrowRightOutlined/>
                    </Col>
                    <Col span={8}>
                        <Space direction="vertical">
                            {"结束时间"}
                            <DatePicker onChange={handleEndDatePickerOnChange}/>
                            <TimePicker minuteStep={15} format="HH:mm" onChange={handleEndTimePickerOnChange}/>
                        </Space>
                    </Col>
                </Row>
                <Row className="date-time-picker">
                    <Col span={24}>
                        <Button
                            disabled={startDateStr.length !== 10 || endDateStr.length !== 10}
                            onClick={handleBtnStartToSearchOnClick}
                        >
                            开始搜索
                        </Button>
                    </Col>
                </Row>
                {showHotSearches ? <HotSearches searches={searches}/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
            </div>
        );
    }
;

export default HistoryHotSearches;
