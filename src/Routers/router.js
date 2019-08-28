import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from '../App'
import Login from '../Components/login'
import Menu from '../Components/nav'
import Index from '../Components/user/index'
import userManager from '../Components/user/userManager';




export default class router extends Component {
    render() {
        return (
            
                
                <Router>
                    
                    {/* <Menu/> */}
                    <Switch>
                        <Menu/>
                        <Route exact path="/" component={Index}/>
                        <Route path="/usermanager" component={userManager}/>                    
                    </Switch>

                    <Route path="/login" component={Login}/>
                    
                </Router>
                

                

                   
                
           
        )
    }
}
