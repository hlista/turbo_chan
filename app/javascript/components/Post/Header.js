import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import Tagbox from "./Tagbox"
import Quotelink from "./Quotelink"
class Header extends Component {
    render(){
        const replies = this.props.replies ? this.props.replies.map( (data, index) => {
            return (
                <Quotelink key={index} abrv={this.props.abrv} pid={data} isNested={this.props.isNested}/>
            )
        }) : null
        return (
            <div>
                <a>{'No. '+this.props.pid}</a>
                {replies}
            </div>
        )
    }
}

export default Header