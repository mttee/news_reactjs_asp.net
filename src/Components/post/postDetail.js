import React, { Component } from 'react'
import { Grid, Header, Divider, List, Label, Icon, Image, Comment, Form, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'moment-timezone';

const axios = require('axios');

export default class postDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Post: '',
            Author: '',
            Cat: '',
            Comment: [],
            UserComment: []
        }
    }

    componentWillMount() {
        const idPost = this.props.match.params.id
        axios({
            method: 'get',
            url: 'https://localhost:44394/api/Post/' + idPost,
            responseType: 'stream'
        })
            .then((response) => {
                console.log(response.data.catIdForeignKey);


                this.setState({
                    Post: response.data
                })
                //Get Author
                axios({
                    method: 'get',
                    url: 'https://localhost:44394/api/account/' + response.data.postAuthorIdForeignKey,
                }).then((result) => {
                    this.setState({
                        Author: result.data
                    })
                })

                //Get Category
                axios({
                    method: 'get',
                    url: 'https://localhost:44394/api/categories/' + response.data.catIdForeignKey,
                }).then((result) => {
                    this.setState({
                        Cat: result.data
                    })
                })


            });

        //Get Comment for Post
        var arrayUserComment = [];
        axios({
            method: 'get',
            url: 'https://localhost:44394/api/Post/comment/' + idPost,
        }).then((comment) => {

            this.setState({
                Comment: comment.data
            })
            comment.data.map((c) => {

                axios({
                    method: 'get',
                    url: 'https://localhost:44394/api/account/' + c.userCommentIdForeignKey,
                }).then((usercm) => {
                    console.log(usercm.data);
                    arrayUserComment.push(usercm)
                    //Chưa push dc mảng vào
                })
            })

        })
        console.log(arrayUserComment)
        var outputArray = []
        var start = false;
        var count = 0;
        for (var j = 0; j < arrayUserComment.length; j++) {
            for (var k = 0; k < outputArray.length; k++) {
                if (arrayUserComment[j].user_Id === outputArray[k].user_Id) {

                    start = true;
                }

            }
            count++;
            //console.log(arr)
            if (count === 1 && start === false) {
                outputArray.push(arrayUserComment[j]);
            }
            start = false;
            count = 0;
        }

        this.setState({
            UserComment: outputArray
        })
    }




    render() {
        console.log(this.state.UserComment);

        return (
            <Grid style={{ margin: "1%" }}>
                <Grid.Column width={16}>
                    <Header as='h2' textAlign='left'>{this.state.Post.post_Title}</Header>
                    <List >
                        <List.Item style={list_item}>
                            <Label color="orange">
                                <Icon name='folder open' />
                                {this.state.Cat.cat_Name}
                            </Label>
                        </List.Item>

                        <List.Item style={list_item}>
                            <Label as='a'>
                                <Icon name='calendar alternate' /> <Moment format="DD/MM/YYYY">{this.state.Post.post_Date}</Moment>
                            </Label>
                        </List.Item>
                        <List.Item style={list_item}>
                            <Label as='a' color='green' image>
                                <img src='http://www.sarkarinaukrisearch.in/wp-content/uploads/2018/12/tetty-bear-image-24.gif' />
                                {this.state.Author.name}
                            </Label>
                        </List.Item>
                    </List>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Divider />
                    <Image src={this.state.Post.post_Image} fluid />
                    <p style={contentPost}>{this.state.Post.post_Content}</p>

                    {/* Comment */}

                    <Comment.Group style={{ textAlign: 'left' }}>
                        <Header as='h3' dividing>
                            Comments
                        </Header>
                        {this.state.Comment.map((cm) => (
                            <Comment>
                                <Comment.Avatar src='https://jooinn.com/images/white-dog-19.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>{this.state.UserComment.name}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Today at 5:42PM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{cm.comment_Content}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        ))}
                        {/* <Comment>
                            <Comment.Avatar src='https://jooinn.com/images/white-dog-19.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>Elliot Fu</Comment.Author>
                                <Comment.Metadata>
                                    <div>Yesterday at 12:30AM</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <p>This has been very useful for my research. Thanks as well!</p>
                                </Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            <Comment.Group>
                                <Comment>
                                    <Comment.Avatar src='https://jooinn.com/images/white-dog-19.jpg' />
                                    <Comment.Content>
                                        <Comment.Author as='a'>Jenny Hess</Comment.Author>
                                        <Comment.Metadata>
                                            <div>Just now</div>
                                        </Comment.Metadata>
                                        <Comment.Text>Elliot you are always so right :)</Comment.Text>
                                        <Comment.Actions>
                                            <Comment.Action>Reply</Comment.Action>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group>
                        </Comment> */}


                        <Form reply>
                            <Form.TextArea />
                            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>


                </Grid.Column>
                <Grid.Column width={4}>

                </Grid.Column>
            </Grid>
        )
    }
}

const list_item = {
    width: '100%',
    textAlign: 'left'
}

const contentPost = {
    textAlign: "left",
    fontFamily: ('Lexend Deca', 'sans-serif'),
    fontWeight: "500",
    margin: "2% 0"
}