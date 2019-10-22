import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import axios from 'axios'
import StaticPost from './StaticPost'
import $ from 'jquery'
import uuid from 'uuid'
class Quotelink extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            img_url: "",
            replies: [],
            isSet: false,
            delayed: true
        }
        this.popoverRef=React.createRef()
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }
    handleMouseEnter() {
        axios.get('/api/'+this.props.abrv+'/posts/'+this.props.pid+'.json')
        .then(data => {
            this.setState({
                content: data.data.data.content,
                img_url: data.data.data.img_url,
                replies: data.data.data.replies,
                isSet: true
            })
        })
        .catch(data => {
            debugger
        })        
    }
    handleMouseLeave() {
        if (this.state.delayed) {
            $(this.popoverRef.current).popover('dispose');
            $(this.popoverRef.current).popover({sanitize: false, delay: 0});
            this.setState({
                delayed: false
            })
        }
    }
    componentDidMount(){
        $(this.popoverRef.current).popover({sanitize: false, delay: {show: "500"}});
    }

    render(){
        return (
                !this.state.isSet ? <a onMouseEnter={this.handleMouseEnter} ref={this.popoverRef} className="pl-2" href="#" data-toggle="popover"
                data-template='<div class="popover post-popover nospacing" role="tooltip"><div class="popover-body nospacing"></div></div>' 
                data-trigger="hover" data-placement="right"
                data-html="true" data-content={renderToString(<StaticPost pid={this.props.pid} content={this.state.content} img_url={this.state.img_url} replies={this.state.replies} />)}> 
                    >>{this.props.pid}
                </a> : <a ref={this.popoverRef}  onMouseLeave={this.handleMouseLeave} className="pl-2" href="#" data-toggle="popover"
                data-template='<div class="popover post-popover nospacing" role="tooltip"><div class="popover-body nospacing"></div></div>' 
                data-trigger="hover" data-placement="right"
                data-html="true" data-content={renderToString(<StaticPost pid={this.props.pid} content={this.state.content} img_url={this.state.img_url} replies={this.state.replies} />)}> 
                    >>{this.props.pid}
                </a>

        )
    }
}
export default Quotelink
