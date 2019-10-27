import React, { Component } from 'react'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js/dist/popper.js'
import Post from './Post/Post'
import axios from 'axios'
import PostUpload from './PostUpload'
import $ from 'jquery'
import ActionCable from 'actioncable'
class Thread extends Component {
    cable = ActionCable.createConsumer('/cable');
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            op: 0,
            tags: [],
            render_count: 10,
            pid: 0,
            hasScrolledTo: false
        }
        this.trackScrolling = this.trackScrolling.bind(this)
        this.handleReceivedPost = this.handleReceivedPost.bind(this)
        this.scrollToPid = this.scrollToPid.bind(this)
        this.scrollRef = React.createRef()
    }
    componentWillUnmount(){
        if (this.cable.subscriptions['subscriptions'].length >= 1){ //remove old subscription
            this.cable.subscriptions.remove(this.cable.subscriptions['subscriptions'][0])
        }
        $(document).off('click', '.tag-post-btn')
    }
    componentDidMount(){
        this.setState({
            pid: parseInt(this.props.tid)
        })
        axios.get('/api/'+this.props.abrv+'/threads/'+this.props.tid+'.json')
        .then(data => {
            this.setState({
                posts: data.data.data.posts,
                op: data.data.data.posts[0],
                tags: data.data.data.tags,
                render_count: Math.max(data.data.data.posts.indexOf(this.state.pid) + 5, this.state.render_count)
            })
        })
        .catch(data => {
        })
        $(document).on('click', '.tag-post-btn', function() {
            const element = $(this)
            const parent = element.parent()
            const formData = new FormData();
            const api_string = '/api/tags'
            formData.append('board', parent.attr("data-board"));
            formData.append('post_num', parent.attr("data-post"));
            formData.append('tag', element.contents()[0].data);
            formData.append('authenticity_token', ReactOnRails.authenticityToken())
            axios.post(api_string, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        })
        document.addEventListener('scroll', this.trackScrolling);
        this.cable.subscriptions.create({channel: "BthreadChannel", abrv: this.props.abrv, post_num: this.props.tid}, { 
            received: this.handleReceivedPost
        })
    }
    scrollToPid(){
        window.scrollTo(0, this.scrollRef.current.offsetTop)
    }
    componentDidUpdate(prevProps, prevState) {
        if(!this.state.hasScrolledTo && this.state.posts.indexOf(this.state.pid) != -1 && this.state.op != this.state.pid){
            this.setState({
                hasScrolledTo: true
            })
            setTimeout(this.scrollToPid, 1000)
        }
        if (prevProps.tid != this.props.tid){
            debugger
            const ind = this.state.posts.indexOf(parseInt(this.props.tid))
            if(ind > -1 && this.props.abrv == prevProps.abrv){ //the post is in the current thread
                this.setState({
                    pid: parseInt(this.props.tid),
                    hasScrolledTo: false,
                    render_count: Math.max(this.state.render_count, ind + 3)
                })
            }
            else {
                if (this.cable.subscriptions['subscriptions'].length >= 1){ //remove old subscription
                    this.cable.subscriptions.remove(this.cable.subscriptions['subscriptions'][0])
                }
                this.setState({
                    posts: [],
                    op: 0,
                    tags: [],
                    render_count: 10,
                    pid: parseInt(this.props.tid),
                    hasScrolledTo: false
                })
                axios.get('/api/'+this.props.abrv+'/threads/'+this.props.tid+'.json')
                .then(data => {
                    this.setState({
                        posts: data.data.data.posts,
                        op: data.data.data.posts[0],
                        tags: data.data.data.tags,
                        render_count: Math.max(data.data.data.posts.indexOf(this.state.pid) + 5, this.state.render_count)
                    })
                })
                .catch(data => {
                })
                this.cable.subscriptions.create({channel: "BthreadChannel", abrv: this.props.abrv, post_num: this.props.tid}, { 
                    received: this.handleReceivedPost
                })
            }
        }
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
    handleReceivedPost(response) {
        this.setState({
            posts: [...this.state.posts, response.post_num]
        })
    }
    render() {
        const posts = this.state.posts.map( (data, index) => {
            return (this.state.render_count > index ? 
                <div id={"p" + data} ref={this.state.pid == data ? this.scrollRef : null} key={data}>
                    <Post isOp={index==0} isBoardView={false} isReply={false} abrv={this.props.abrv} pid={data} tags={this.state.tags}/>
                </div> :
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