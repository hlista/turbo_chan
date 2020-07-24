import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import {Manager, Reference, Popper} from 'react-popper'
import Tagbox from "./Tagbox"
import Tags from "./Tags"
import $ from 'jquery'
class Footer extends Component {
    constructor(props) {
        super(props)
        this.popoverRef=React.createRef();
    }
    componentDidMount() {
        if (!this.props.isNested){
            $(this.popoverRef.current).popover({content: function() {
                return $(this).siblings('.my-popover-content').html();
            },
            html: true,
            animation: false,
            placement: 'right',
            sanitize: false});
        }
    }
    componentWillUnmount(){
        $(this.popoverRef.current).popover('hide')
    }
    render(){
        return (
            <React.Fragment>
                <a tabIndex="0" ref={this.popoverRef} className="btn tag-btn float-right" role="button"> 
                    +
                </a>
                <Tags tags={this.props.tagged} abrv={this.props.abrv} pid={this.props.pid} />
                {!this.props.isNested ? <div className="my-popover-content">
                    <Tagbox abrv={this.props.abrv} pid={this.props.pid} tags={this.props.tags}/>
                </div> : null}
            </React.Fragment>
        )
    }
}

export default Footer
