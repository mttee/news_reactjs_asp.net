import React, { Component } from 'react'
import Menu  from '../Components/nav'

export default class Main extends Component {
    render() {
        return (
            <div>
                <Menu/>
                {this.props.children}
            </div>
        )
    }
}
