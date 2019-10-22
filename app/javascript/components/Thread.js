import React, { Component } from 'react'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js/dist/popper.js'
import Post from './Post/Post'
import axios from 'axios'
import PostUpload from './PostUpload'
import $ from 'jquery'
class Thread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            op: null,
            tags: [],
            render_count: 10
        }
        this.trackScrolling = this.trackScrolling.bind(this)
    }
    componentDidMount(){
        axios.get('/api/'+this.props.abrv+'/threads/'+this.props.tid+'.json')
        .then(data => {
            this.setState({
                posts: data.data.data.posts,
                op: data.data.data.posts[0],
                tags: data.data.data.tags
            })
        })
        .catch(data => {
        })
            document.addEventListener('scroll', this.trackScrolling);
    }
    trackScrolling() {
        if($(document).height() - $(document).scrollTop() - $(window).height() < 100) {
            if (this.state.posts.length > this.state.render_count){
                this.setState({
                    render_count: this.state.render_count + 5
                })
            }
        }
    }
    render() {
        const posts = this.state.posts.map( (data, index) => {
            return (this.state.render_count > index ? 
                <Post isOp={index==0} isReply={false} key={index} abrv={this.props.abrv} pid={data} tags={this.state.tags}/> :
                null)
        })
        return(
            <div className="container pt-3 pb-3">
                {!this.state.op ? <PostUpload board={this.props.abrv} /> : <PostUpload board={this.props.abrv} op={this.state.op} />}
                {posts}
            </div>
        )
    }
}

export default Thread