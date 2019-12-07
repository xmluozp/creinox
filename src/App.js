import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const LoginPage = React.lazy(() => import('./views/Pages/Login'));

const App = ({user}) => {

    // 用户为空则跳到登录页
    const renderpage = user? props => <DefaultLayout {...props}/> : props => <LoginPage {...props}/>

    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/" name="Home" render={renderpage} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );

}

// 从reducer来的
function mapState(state) {
  return {  user: state.authData.user };
}

const mapDispatchToProps = {
  // clearAlerts: alertActions.clear
};

export default connect(mapState, mapDispatchToProps)(App);
