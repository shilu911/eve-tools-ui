import React, {useContext} from 'react';
import { Layout, Menu } from 'antd';
import routes from './routes';
import {Link, RouteComponentProps, Switch, Route} from 'react-router-dom';
import AppContext, {AppContextType} from '../../context/AppContext';

const { Header, Content, Footer, Sider } = Layout;

interface MainProps extends RouteComponentProps {

}

const Main = (props: MainProps) => {
  const appContext: AppContextType = useContext(AppContext);
  const currentLanguage = appContext.language;
  return (
    <Layout style={{minHeight:"100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={() => {}}
        onCollapse={() => {}}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" >
          {
            routes.map((route, index) => (
              <Menu.Item key={(index + 1) + ''}>
                <Link to={`${props.match.url}${route.path}`}>
                  <span>{route['label'][currentLanguage]}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              {
                routes.map((route, index) => (
                  <Route path={`${props.match.url}${route.path}`} component={route.component} />
                ))
              }
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Eve Tools ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
