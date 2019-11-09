import React from "react"
import Thread from './Thread'
import Board from './Board'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js/dist/popper.js'
import $ from 'jquery'
import axios from 'axios'
import ReactOnRails from "react-on-rails"


class ParentComponent extends React.Component {
    intervalId = 0;
    constructor(props) {
        super(props)
        this.state = {
            post_array: []
        }
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
        debugger
        clearInterval(this.intervalId)
        $(document).off('click', '.tag-post-btn')
    }
    componentDidMount(){
        debugger
        this.intervalId = setInterval(this.postTick, 5000)
        $(document).on('click', '.tag-post-btn', this.handleTagClick)
    }
    render() {
        return (
        this.props.isBoard ? <Board abrv={this.props.abrv} /> : <Thread abrv={this.props.abrv} tid={this.props.tid} />
        )
    }
}


export default ParentComponent