import React from "react"
import Thread from './Board/Thread'
import $ from 'jquery'
import axios from 'axios'
import PostUpload from './PostUpload'
import ActionCable from 'actioncable'
class Board extends React.Component {
    cable = ActionCable.createConsumer('/cable');
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            tags: [],
            render_count: 10,
        }
        this.trackScrolling = this.trackScrolling.bind(this)
        this.handleReceivedThread = this.handleReceivedThread.bind(this)
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
        debugger
        const i = this.state.threads.findIndex(thr => thr.posts[0] === response.posts[0])
        if (i == -1) {
            this.setState({
                threads: [response, ...this.state.threads]
            })
        } else {
            this.setState({
                threads: [...this.state.threads.slice(0, i), response, ...this.state.threads.slice(i+1, this.state.threads.length)]
            })
        }
    }
    render() {
        const threads = this.state.threads.map( (data, index) => {
            return (
                this.state.render_count > index ? 
                    <Thread key={data.posts[0]} abrv={this.props.abrv} posts={data.posts} tags={this.state.tags}/>
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