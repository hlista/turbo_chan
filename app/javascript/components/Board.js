import React from "react"
import Thread from './Board/Thread'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js/dist/popper.js'
import $ from 'jquery'
import axios from 'axios'
import PostUpload from './PostUpload'
class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            tags: [],
            render_count: 10
        }
        this.trackScrolling = this.trackScrolling.bind(this)
        this.postUploadCallback = this.postUploadCallback.bind(this)
    }
    postUploadCallback() {
        axios.get('/api/boards/'+this.props.abrv+'.json')
        .then(data => {
            this.setState({
                threads: data.data.data.threads,
                tags: data.data.data.tags
            })
        })
        .catch(data => {
        })
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
            console.log($(this).parent().attr("id"))
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
                <PostUpload uploadSuccessCallback={this.postUploadCallback} board={this.props.abrv} />
                {threads}
            </div>
        )
    }
}


export default Board