import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
//import App from '../App'
//import Main from '../Components/Main'
import Login from '../Components/login'
import Menu from '../Components/nav'
import Index from '../Components/user/index'
import userManager from '../Components/user/userManager';
import PostDetail from '../Components/post/postDetail'




const cookie  = new Cookies();

const NavRoute = ({exact, path, component: Component}) => (
    <Route exact={exact} path={path} render={(props) => (
      <div>
        <Menu/>
        <Component {...props}/>
      </div>
    )}/>
  )

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          cookie.get('myCookie') ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

export default class router extends Component {
    render() {
        return (
            
                
                <Router>

                    {/* <Route path="/" component={Main}>
                        <Route component={Index}/>
                        <Route path="/usermanager" component={userManager}/>    
                    </Route>               */}

                <Switch>
                    <NavRoute exact component={Index} path="/" />
                    <NavRoute exact component={PostDetail} path="/post/postdetails/:id" />




                    <NavRoute exactly component={userManager} path="/usermanager" />
                    <Route exactly component={Login} path="/login" />
                    {/* <NavRoute exactly component={Page1} pattern="/path1" />
                    <NavRoute exactly component={Page2} pattern="/path2" />
                    <NavRoute component={Page404} /> */}
                </Switch>

                    {/* <Route path="/login" component={Login}/> */}
                    
                </Router>
                

                

                   
                
           
        )
    }
}
