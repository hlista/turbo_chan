import React, { Component } from 'react'
import axios from 'axios'
import ActionCable from 'actioncable'
class Tags extends Component {
    cable = ActionCable.createConsumer('/cable');

    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
        this.handleReceivedTag = this.handleReceivedTag.bind(this)
    }
    componentWillUnmount(){
        if (this.cable.subscriptions['subscriptions'].length >= 1){ //remove old subscription
            this.cable.subscriptions.remove(this.cable.subscriptions['subscriptions'][0])
        }
    }
    handleReceivedTag(response) {
        let already_tagged = false;
        const new_tags = this.state.tags.map( (data) => {
            if (data.name == response.name) {
                data.count = response.count;
                already_tagged = true;
            }
            return {name: data.name, count: data.count}
        })
        if (already_tagged) {
            this.setState({
                tags: new_tags
            })
        } else {
            this.setState({
                tags: [...this.state.tags, response]
            })
        }
    }
    componentDidMount(){
        axios.get('/api/'+this.props.abrv+'/tags/'+this.props.pid+'.json')
        .then(data => {
            this.setState({
                tags: data.data.data.tags
            })
        })
        .catch(data => {
        })
        this.cable.subscriptions.create({channel: "TagChannel", abrv: this.props.abrv, post_num: this.props.pid}, { 
            received: this.handleReceivedTag
        })
    }
    render(){
        const tags = this.state.tags.map( (data, index) => {
            return (
                <button key={index} type="button" className="btn btn-primary tag-post-btn">
                  {data.name} <span className="badge badge-light">{data.count}</span>
                </button>
            )
        })
        return (
            <div data-post={this.props.pid} data-board={this.props.abrv}>
                {tags}
            </div>
        )
    }
}

export default Tags