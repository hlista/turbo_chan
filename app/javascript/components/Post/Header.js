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
            <div>
                <div className="row no-gutters">
                    <div className="col-md-2">
                        <a>{'No. '+this.props.pid}</a>
                    </div>
                    <div className="col-md-8">
                        {replies}
                    </div>
                    {this.props.isOp && this.props.isBoardView ? <div className="col-md-2">
                        <Link to={"/"+this.props.abrv+"/thread/"+this.props.pid} className="float-right">Reply</Link>
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default Header