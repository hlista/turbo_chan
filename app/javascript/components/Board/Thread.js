import React, { Component } from 'react'
import Post from '../Post/Post'
import OpPost from '../Post/OpPost'
import axios from 'axios'
class Thread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    componentDidMount(){
        axios.get('/api/'+this.props.abrv+'/threads/'+this.props.tid+'?last=1')
        .then(data => {
            this.setState({
                posts: data.data.data.posts
            })
        })
        .catch(data => {
        })
    }
    render() {
        const posts = this.state.posts.map( (data, index) => {
            if (index == 0) {
                return (<OpPost key={index} abrv={this.props.abrv} pid={data} tags={this.props.tags}/>)
            }
            return (
                <Post key={index} abrv={this.props.abrv} pid={data} tags={this.props.tags}/>
            )
        })
        return(
            <div className="container pt-3 pb-3">
                {posts}
            </div>
        )
    }
}

export default Thread