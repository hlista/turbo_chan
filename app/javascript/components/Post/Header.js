import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import Tagbox from "./Tagbox"
import Quotelink from "./Quotelink"
import { Link } from 'react-router-dom';
class Header extends Component {
    render(){
        const replies = this.props.replies ? this.props.replies.map( (data, index) => {
            return (
                <Quotelink key={index} abrv={this.props.abrv} pid={data} isNested={this.props.isNested}/>
            )
        }) : null
        return (
            <React.Fragment>
                {this.props.isOp && this.props.isBoardView ?
                    <Link to={"/"+this.props.abrv+"/thread/"+this.props.pid} className="float-right">Go To Thread</Link> : null}
                <a>{'No. '+this.props.pid}</a>
                {replies}
            </React.Fragment>
        )
    }
}

export default Header