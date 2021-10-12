import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
import Home from '../src/pages/Home';
import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
import HistoryHotSearches from './pages/HistoryHotSearches';
import HotSearchData from './pages/HotSearchData';
import Sub from './pages/Sub';
import About from './pages/About';
import './App.less';
import './style/hot-search.less'
import 'default-passive-events';

const {Header, Footer, Content} = Layout;

function App() {
    let history = useHistory();
    let historyHotSearches = useRouteMatch("/history-hot-searches");
    let hotSearchData = useRouteMatch("/hot-search-data");
    let sub = useRouteMatch("/sub");
    let about = useRouteMatch("/about");

    useEffect(() => {
        if (historyHotSearches !== null) {
            history.push("/history-hot-searches")
        }
        if (hotSearchData !== null) {
            history.push("/hot-search-data")
        }
        if (sub !== null) {
            history.push("/sub")
        }
        if (about !== null) {
            history.push("/about")
        }
    }, [about, history, historyHotSearches, hotSearchData, sub]);
    return (
        <div className='App'>
            <Layout>
                <Header id='header-custom'>
                    <MyHeader />
                </Header>
                <Content id='content-custom'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/history-hot-searches' component={HistoryHotSearches} />
                        <Route exact path='/hot-search-data/:content' component={HotSearchData} />
                        <Route exact path='/hot-search-data/' component={HotSearchData} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/sub' component={Sub} />
                    </Switch>
                </Content>
                <Footer id='footer-custom'>
                    <MyFooter />
                </Footer>
            </Layout>
        </div>
    );
}

export default App;
