import Cookies from 'universal-cookie';
import React, { Component } from 'react'
//import { Menu} from 'semantic-ui-react'
import { Button, Icon, Dropdown, Image} from 'semantic-ui-react'
const axios = require('axios');

const cookie  = new Cookies();

const colorsMenu = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'purple'] 

export default class nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu: [],
            activeA: '',
            user: '',
        }
    }

 componentDidMount(){
            axios({
                method: 'get',
                url: 'https://localhost:44394/api/categories',
                }).then((response) => {
                this.setState({
                    menu: response.data,
                    activeA: response.data[0].cat_Name
                    })
                }).catch(() => {
            });

            const user = cookie.get("myCookie");
            this.setState({
                user: user
            })
         
    }

    // componentWillMount(){
    //     const user = cookie.get("myCookie");
    //     this.setState({
    //         user: user
    //     })
    // }

    
    avtiveNav  = (e, name ) => this.setState({ activeA: name })

    userProfile = () => {
        
        if(this.state.user){
            const trigger = (
                <span>
                  <Image  avatar src="http://www.sarkarinaukrisearch.in/wp-content/uploads/2018/12/tetty-bear-image-24.gif" /> {this.state.user.name}
                </span>
              )
              
              const options = [
                { key: 'user', text: 'Account', icon: 'user' },
                { key: 'settings', text: 'Settings', icon: 'settings' },
                { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
              ]
              
              
            return(
                <div className="right menu">
                    <Dropdown style={dropdownStyle} className="item"
                        trigger={trigger}
                        options={options}
                        pointing='top left'
                        icon={null}
                    />
                </div>


                //<Button style={right} className="right menu" inverted color="red">{this.state.user.name}</Button>
            )
        }
        else{
            return(
                <Button.Group size='medium' className="right menu" style={right} >
                    <a href="/#">
                        <Button style={right} className="green"><Icon name='add user' /> Đăng ký</Button>
                    </a>
                    <Button.Or text='' />
                    <a href="/login">
                        <Button style={right} className="teal">Đăng nhập <Icon name='sign in alternate' /></Button>
                    </a>
                </Button.Group>
            )
        }
    }

    render() {
        
        return (
            <div>
                {/* <Menu inverted>
                    {this.state.menu.map((c, key) => (
                        <Menu.Item  style={{ fontFamily : ('Lexend Deca', 'sans-serif') }}
                            key={key}
                            name={c.cat_Name}
                            active={this.state.activeA === c.cat_Name}
                            color={colorsMenu[key]}
                            onClick={this.avtiveNav}
                        />
                        // Dùng cách trên bị mất dấu chữ
                    ))}
                </Menu> */}

                <div className="ui inverted menu">

                    {this.state.menu.map((c, key) => (
                        <a href="/#" style={{ fontFamily : ('Lexend Deca', 'sans-serif') }}
                            className={`${colorsMenu[key]} ${this.state.activeA === c.cat_Name?'active': ''} item`} 
                            key={key} 
                            onClick={(e) => {this.avtiveNav(e, c.cat_Name)}}
                        >{c.cat_Name}</a>
                    ))}

                    {/* {console.log(this.state.user)} */}
                    {this.userProfile()}
                    

               </div>
                
            </div>
        )
    }
}

const right = {
    float: "right",
    borderRadius: "0px",
    fontFamily : ('Lexend Deca', 'sans-serif'),
    border: "none",
    height: "100%"
}

const dropdownStyle = {
    color: "White",
    fontSize: "14px",
    fontFamily : ('Lexend Deca', 'sans-serif'),
    background: "dimgray"
}
