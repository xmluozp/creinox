import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Toastr from "../../components/toastr";
import { authCheck } from "../../_helper";

import {
  // AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

// 菜单的filter代码在下面. 一次性的
const routesAuth = authString => {
  return routes.filter(route => {
    if (authCheck(authString, route.authTag)) return true;
    else return false;
  });
};

const authFilter = (authString, navsList) => {
  const returnNav = navsList.items.filter(item => {
    const returnItem = item;
    // 确认item内部子元素权限
    const returnItemChildren =
      returnItem.children &&
      returnItem.children.filter(childItem => {
        return authCheck(authString, childItem.authTag);
      });
    returnItem.children = returnItemChildren;
    // 确认item本身权限，返回item
    return authCheck(authString, returnItem.authTag);
  });
  navsList.items = returnNav;
  return navsList;
};

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    
    const authString = props.user && props.user["role_id.row"]  && props.user["role_id.row"].auth;

    console.log("auth", authString)

    this.state = {
      authenticatedNavigation: authFilter(authString, navigation),
      authenticatedRoutes: routesAuth(authString)
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={this.state.authenticatedNavigation}
                {...this.props}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={this.state.authenticatedRoutes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Toastr />
                <Switch>
                  {this.state.authenticatedRoutes.map((route, idx) => {
                    let returnValue;
                    returnValue = route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} pageName={route.name} />
                        )}
                      />
                    ) : null;
                    return returnValue;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;

//  if (!authCheck(route.authTag)) returnValue = "";
