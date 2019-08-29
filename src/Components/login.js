import React, { Component } from 'react';
import {Button, Form, Checkbox, Input, Icon, Message} from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';

const cookie  = new Cookies();
const axios = require('axios');

export default class login extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputPassword: "password",
            passEye: 'eye',
            userName: '',
            passWord: '',
            showMes: false,
            messColor: '',
            messText: '',
            messIcon: '',
            isLogin: false
        }
    }

    showPassword =(event) => {
        this.state.inputPassword === "password" ? this.setState({inputPassword: "text"}):this.setState({inputPassword: "password"})
        this.state.passEye === "eye" ? this.setState({passEye: "eye slash"}):this.setState({passEye: "eye"})
    }

    submitLogin = () => {
        const userName = this.state.userName;
        const passWord = this.state.passWord;
        if(userName === '' || passWord === ''){
            this.setState({
                showMes: true,
                messColor: "yellow",
                messText: "Vui lòng nhập đầy đủ các trường!",
                messIcon: 'warning'
            })
        }else{
            axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: 'https://localhost:44394/api/Authentication',
                data: {
                    User_name: this.state.userName,
                    Password: this.state.passWord
                }
            }).then((result) => {
                if(result.data !== null){
                   cookie.set('myCookie', result.data,  {expires: new Date(Date.now()+2592000)})
                   this.setState({
                    isLogin: true
                   })
                }
 
            }).catch((error) => {
                this.setState({
                    showMes: true,
                    messColor: "red",
                    messText: "Tài khoản hoặc mật khẩu không chính xác!",
                    messIcon: 'times'
                })
            });
        }
        
    }

    getValueForm = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    Message = () => {
        if(this.state.showMes === true){
            return (
                <Message color={this.state.messColor}>
                    <Message.Header style={{ fontFamily : ('Lexend Deca', 'sans-serif') }}><Icon name={this.state.messIcon} /> Đăng nhập không thành công</Message.Header>
                    <p style={{ fontFamily : ('Lexend Deca', 'sans-serif') }}>{this.state.messText}</p>
                </Message>
            )
        }
    }

    render() {
        if(this.state.isLogin === true){
            return <Redirect to="/"/>
        }
        return (
            <div>
                <Form style={form_login}>
                    
                    <Form.Field>
                    <label>Tài khoản</label>
                    <input placeholder='Nhập tài khoản' name="userName" onChange={this.getValueForm}/>
                    </Form.Field>
                    <Form.Field>
                    <label>Mật khẩu</label>
                    <Input placeholder='Nhập mật khẩu' name="passWord" onChange={this.getValueForm} type={this.state.inputPassword} action={{ icon: this.state.passEye, onClick : (e)=> this.showPassword(e) }} />
                    </Form.Field>
                    <Form.Field>
                    <Checkbox label='Ghi nhớ đăng nhập' />
                    </Form.Field>
                    {this.Message()}
                    <Button  inverted color='orange' type='submit' size='large' style={{ fontFamily : ('Lexend Deca', 'sans-serif') }} onClick={this.submitLogin}>
                        Đăng nhập <Icon name='chevron right' />
                    </Button>
                </Form>
            </div>
        )
    }
}

const form_login = {
    width: '500px',
    height: '350px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: "40px",
    background: "white",
    borderRadius: "20px"
};
