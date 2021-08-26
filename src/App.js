import {Layout} from 'antd';
import {Switch, Route} from 'react-router-dom'
import Home from '../src/pages/Home';
import './App.less';
import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
import './style/hot-search.less'
import HistoryHotSearches from './pages/HistoryHotSearches';
import HotSearchData from "./pages/HotSearchData";

const {Header, Footer, Content} = Layout;

function App() {
    return (
        <div className="App">
            <Layout>
                <Header id="header-custom">
                    <MyHeader/>
                </Header>
                <Content>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/history-hot-searches" component={HistoryHotSearches}/>
                        <Route exact path="/hot-search-data/:content" component={HotSearchData}/>
                        <Route exact path="/hot-search-data/" component={HotSearchData}/>
                    </Switch>
                </Content>
                <Footer>
                    <MyFooter/>
                </Footer>
            </Layout>
        </div>
    );
}

export default App;
