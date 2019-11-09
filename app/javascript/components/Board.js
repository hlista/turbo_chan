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