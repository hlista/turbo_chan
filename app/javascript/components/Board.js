import React from "react"
import Thread from './Board/Thread'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js/dist/popper.js'
import $ from 'jquery'
import axios from 'axios'
import PostUpload from './PostUpload'
import ReactOnRails from "react-on-rails"
import ActionCable from 'actioncable'
class Board extends React.Component {
    cable = ActionCable.createConsumer('/cable');

    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            tags: [],
            render_count: 10,
            post_array: []
        }
        this.trackScrolling = this.trackScrolling.bind(this)
        this.handleReceivedThread = this.handleReceivedThread.bind(this)
        this.handleTagClick = this.handleTagClick.bind(this)
        this.postTick = this.postTick.bind(this)
    }
    postTick(){
        this.state.post_array.map((data) => {
            const formData = new FormData();
            const api_string = '/api/tags'
            formData.append('board', data.board);
            formData.append('post_num', data.post_num);
            formData.append('tag', data.tag);
            formData.append('count', data.count);
            formData.append('authenticity_token', ReactOnRails.authenticityToken())
            axios.post(api_string, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        })
        this.setState({
            post_array: []
        })
    }
    handleTagClick(event) {
            const element = $(event.currentTarget)
            const parent = element.parent()
            const board = parent.attr("data-board");
            const post = parent.attr("data-post");
            const tag = element.contents()[0].data;
            const index = this.state.post_array.findIndex(item => item.board === board && item.post_num === post && item.tag === tag)
            if (index > -1) {
                this.setState({
                    post_array: [...this.state.post_array.slice(0, index),{board: board, post_num: post, tag: tag, count: this.state.post_array[index].count + 1}, ...this.state.post_array.slice(index+1, this.state.post_array.length)]
                })
            } else {
                this.setState({
                    post_array: [...this.state.post_array, {board: board, post_num: post, tag: tag, count: 1}]
                })
            }
    }
    componentWillUnmount() {
        if (this.cable.subscriptions['subscriptions'].length >= 1){ //remove old subscription
            this.cable.subscriptions.remove(this.cable.subscriptions['subscriptions'][0])
        }
    }
    componentDidMount(){
        axios.get('/api/boards/'+this.props.abrv+'.json')
        .then(data => {
            this.setState({
                threads: data.data.data.threads,
                tags: data.data.data.tags
            })
        })
        .catch(data => {
        })
        setInterval(this.postTick, 5000)
        $(document).on('click', '.tag-post-btn', this.handleTagClick)
        document.addEventListener('scroll', this.trackScrolling);
        this.cable.subscriptions.create({channel: "BoardChannel", abrv: this.props.abrv}, { 
            received: this.handleReceivedThread
        })
    }
    trackScrolling() {
        if($(document).height() - $(document).scrollTop() - $(window).height() < 100) {
            if (this.state.threads.length > this.state.render_count){
                this.setState({
                    render_count: this.state.render_count + 5
                })
            }
        }
    }
    handleReceivedThread(response) {
        this.setState({
            threads: [response.post_num, ...this.state.threads]
        })
    }
    render() {
        const threads = this.state.threads.map( (data, index) => {
            return (
                this.state.render_count > index ? 
                    <Thread key={data} abrv={this.props.abrv} tid={data} tags={this.state.tags}/>
                    : null
            )
        })
        return (
            <div className="container chan-container">
                <PostUpload board={this.props.abrv} />
                {threads}
            </div>
        )
    }
}


export default Board