import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import axios from 'axios'
import Post from './Post'
import $ from 'jquery'
import { Link } from 'react-router-dom';
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
    componentDidMount(){
        $(this.popoverRef.current).popover({content: function() {
                return $(this).siblings('.my-popover-content').html();
            },
            trigger: 'hover',
            html: true,
            animation: false,
            placement: 'right',
            sanitize: false});

    }
    componentWillUnmount(){
        $(this.popoverRef.current).popover('hide')
    }


    render(){
        return (
            !this.props.isNested ? <React.Fragment>
                <Link to={"/"+this.props.abrv+"/thread/"+this.props.pid} onMouseEnter={!this.state.isSet ? this.handleMouseEnter : null} ref={this.popoverRef} className="pl-2"
                data-template='<div class="popover post-popover nospacing" role="tooltip"><div class="popover-body nospacing"></div></div>'>
                    >>{this.props.pid}
                </Link>
                <div className="my-popover-content">
                    <Post pid={this.props.pid} abrv="tv" tags={[]} isReply={true} isOp={false} />
                </div>
            </React.Fragment> :
            <a className="pl-2" href="#">
                >>{this.props.pid}
            </a>
        )
    }
}
export default Quotelink
