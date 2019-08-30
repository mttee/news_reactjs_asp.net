import React, { Component } from 'react'
//import Cookies from 'universal-cookie';
//import Menu from '../nav'
import { Item, Label, Grid, Button, Image, Icon } from 'semantic-ui-react'
//import { async } from 'q';

import Moment from 'react-moment';
import 'moment-timezone';

const axios = require('axios');
//const cookie  = new Cookies();




export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Posts: [],
            author: []
        }
    }

    componentDidMount() {

        //get list posts
        axios({
            method: 'get',
            url: 'https://localhost:44394/api/Post',
        })
            .then(async (response) => {
                this.setState({
                    Posts: response.data
                })

                //   console.log(response.data)

                var arr = [];
                response.data.map(async (p) => {

                    await axios({
                        method: 'get',
                        url: 'https://localhost:44394/api/account/' + p.postAuthorIdForeignKey,
                    }).then((a) => {

                        //console.log(arr)
                        // console.log(a.data.user_Id)
                        // if(arr.length === 0){
                        //     arr.push(a.data) 
                        // }
                        // else{
                        //     arr.forEach(ar => {
                        //         console.log(ar.user_Id)
                        //         if(ar.user_Id !== a.data.user_Id){
                        // console.log(ar.user_Id)
                        // console.log(a.data.user_Id)
                        arr.push(a.data)
                        //         }
                        //     })
                        // }            

                    })
                    var outputArray = []
                    var start = false;
                    var count = 0;
                    for (var j = 0; j < arr.length; j++) {
                        for (var k = 0; k < outputArray.length; k++) {
                            if (arr[j].user_Id === outputArray[k].user_Id) {

                                start = true;
                            }

                        }
                        count++;
                        //console.log(arr)
                        if (count === 1 && start === false) {
                            outputArray.push(arr[j]);
                        }
                        start = false;
                        count = 0;
                    }

                    console.log(outputArray)
                    this.setState({
                        author: outputArray
                    })
                });





            })
    }



    //get list user
    // getAuthor =  async(id) => {
    //     var author =  await axios({
    //         method: 'get',
    //         url: 'https://localhost:44394/api/account/'+id,
    //       })
    //       this.setState({
    //           author: author.data.name
    //       })

    //       console.log(author.data);

    //    return author.data;
    // }


    render() {
        // console.log(this.state.Posts)
        // console.log(this.state.author)
        //this.getAuthor(1).then((result) => {return(result)})
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
                                this.state.Posts.map((p, key) => (
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

                                        <Item.Content style={{ textAlign: "left" }}>
                                            <Item.Header as='a'>{p.post_Title}</Item.Header>
                                            <Item.Meta>
                                                <span className='cinema'><Icon name="clock"/><Moment format="DD/MM/YYYY">{p.post_Date}</Moment></span>
                                            </Item.Meta>
                                            <Item.Description>{p.post_Des}</Item.Description>
                                            <Item.Extra>
                                                <a href={"/post/postdetails/" + p.post_Id}>
                                                    <Button primary floated='right'>
                                                        Chi tiết
                                                        <Icon name='right chevron' />
                                                    </Button>
                                                </a>
                                                {/* {this.getAuthor(1)} */}
                                                {this.state.author.map((author, key) => {
                                                    if (author.user_Id === p.postAuthorIdForeignKey) {
                                                        return (<Label key={key}>Tác giả :  {author.name}</Label>)
                                                    }
                                                })}
                                                {/* {this.getAuthor(p.postAuthorIdForeignKey)}
                                        <Label>Tác giả :  {this.state.author}</Label> */}
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                ))}
                        </Item.Group>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Image
                            fluid
                            label={{
                                style: label,
                                as: 'a',
                                color: 'yellow',
                                content: 'Tin mới đăng',
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

const label_right = {
    position: 'absolute',
    display: 'block',
    margin: '0 -10%'
}