import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadingActions } from "./_actions";
import Loading from './components/Loading'
import {h_initializeDropDownTables} from "./_helper";
import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));
const Page404 = React.lazy(() => import("./views/Pages/Page500"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));
const LoginPage = React.lazy(() => import("./views/Pages/Login"));

// will initialize dropdown tables, but only those tables with few data.
h_initializeDropDownTables();

const App = ({ user }) => {
  // React.useEffect(() => {
  //   switch (loadingBar) {
  //     case "loading":
  //       nprogress.start();
  //       break;

  //     default:
  //       nprogress.done();
  //       break;
  //   }
  // }, [loadingBar]);

  // 用户为空则跳到登录页
  // const renderpage = user? props => <DefaultLayout {...props}/> : props => <LoginPage {...props}/>

  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Loading/>
        <Switch>
          <UnauthenticatedRoute
            exact
            path="/login"
            name="Login Page"
            component={LoginPage}
            user={user}
          />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <AuthenticatedRoute
            path="/"
            name="Home"
            component={DefaultLayout}
            user={user}
          />
          <Route exact path="*" name="Page 404" component={Page404} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

const isAuthenticated = user => {
  //write your condition here
  return user;
};

const UnauthenticatedRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return !isAuthenticated(user) ? (
        <Component {...props}/>
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);

const AuthenticatedRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return isAuthenticated(user) ? (
        <Component {...props}  user={user}/>
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

// 从reducer来的
function mapState(state) {
  return { user: state.authData.user};
}

const mapDispatchToProps = {
  clearLoading: loadingActions.clear
};

export default connect(mapState, mapDispatchToProps)(App);
