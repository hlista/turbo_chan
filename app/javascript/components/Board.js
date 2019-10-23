import React from "react"
import Thread from './Board/Thread'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js/dist/popper.js'
import $ from 'jquery'
import axios from 'axios'
import PostUpload from './PostUpload'
import ReactOnRails from "react-on-rails"
import { ActionCableConsumer } from 'react-actioncable-provider';
class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            tags: [],
            render_count: 10
        }
        this.trackScrolling = this.trackScrolling.bind(this)
        this.handleReceivedThread = this.handleReceivedThread.bind(this)
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
        $(document).on('click', '.tag-post-btn', function() {
            const element = $(this)
            const parent = element.parent()
            const formData = new FormData();
            const api_string = '/api/tags'
            debugger
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
                <ActionCableConsumer channel={{channel: 'BoardChannel', abrv: this.props.abrv}} onReceived={this.handleReceivedThread}/>
                <PostUpload board={this.props.abrv} />
                {threads}
            </div>
        )
    }
}


export default Board