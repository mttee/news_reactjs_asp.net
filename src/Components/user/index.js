import React, { Component } from 'react'
import Cookies from 'universal-cookie';
//import Menu from '../nav'
import {Item, Label, Grid, Button, Image, Icon} from 'semantic-ui-react'
import { async } from 'q';

const axios = require('axios');

const cookie  = new Cookies();

export default class index extends Component {
    constructor(props){
        super(props);
        this.state= {
            Posts: [],
            author: []
        }
    }

    componentDidMount(){
        
        //get list posts
        axios({
            method: 'get',
            url: 'https://localhost:44394/api/Post',
          })
            .then((response) => {
              this.setState({
                  Posts: response.data
              })
            });  
    }


    //get list user
    getAuthor = (id) => {
        axios({
            method: 'get',
            url: 'https://localhost:44394/api/account/'+id,
          }).then((result) => {
              console.log(result);
              
            this.setState({
                author: result
            })
          })
        
       
    }

    render() {
        console.log(this.state.author)
        // this.getAuthor(1).then((result) => {return(result)})
        return (
            <div>
                
                <Grid>
                    <Grid.Column width={12}>
                        
                        <Image 
                            fluid
                            label={{
                            style: label,
                            as: 'a',
                            color: 'red',
                            content: 'Tin nóng',
                            icon: 'hotjar',
                            ribbon: true,
                            }}
                        
                        />

                        <Item.Group>
                            {
                                this.state.Posts.map((p,key) =>(
                                    //let name = axios.get('https://localhost:44394/api/account/'+ id);

                                
                                // <Item key={key}>
                                //     <Item.Image size='small' src='https://www.whatsappprofiledpimages.com/wp-content/uploads/2019/01/Sweet-Profile-Images-4-300x200.jpg' />
                                //     <Item.Content>
                                //         <Item.Header as='a'>{p.post_Title}</Item.Header>
                                //         <Item.Description>
                                //         <p>{p.post_Des}</p>
                                //         <p>
                                //             {p.post_Date}
                                //         </p>
                                //         </Item.Description>
                                //     </Item.Content>
                                // </Item>
                                <Item key={key}>
                                    <Item.Image src={p.post_Image} />

                                    <Item.Content style={{textAlign: "left"}}>
                                        <Item.Header as='a'>{p.post_Title}</Item.Header>
                                        <Item.Meta>
                                        <span className='cinema'>{p.post_Date}</span>
                                        </Item.Meta>
                                        <Item.Description>{p.post_Des}</Item.Description>
                                        <Item.Extra>
                                        <Button primary floated='right'>
                                            Chi tiết
                                            <Icon name='right chevron' />
                                        </Button>
                                        {this.getAuthor.bind(2)}
                                            <Label>Tác giả : {this.state.author}</Label>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            ))}
                        </Item.Group>
                    </Grid.Column>

                    <Grid.Column width={4}>
                    <   Image 
                            fluid
                            label={{
                            style: label,
                            as: 'a',
                            color: 'yellow',
                            content: 'Tin liên quan',
                            icon: 'hotjar',
                            ribbon: true,
                            }}
                        
                        />
                    </Grid.Column>
                </Grid>
            </div>
            
        )
    }
}

const label = {
    position: "relative",
    float: "left",
    fontSize: "14px"
}