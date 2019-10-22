import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import Tagbox from "./Tagbox"
import Tags from "./Tags"
import $ from 'jquery'
class Footer extends Component {
    constructor(props) {
        super(props)
        this.popoverRef=React.createRef();
    }
    componentDidMount() {
        $(this.popoverRef.current).popover({sanitize: false,});
    }
    render(){
        return (
            <div className="row no-gutters">
                <div className="col-md-11">
                    <Tags tags={this.props.tagged} pid={this.props.pid}/>
                </div>
                <div className="col-md-1">
                    <a tabIndex="0" ref={this.popoverRef} className="btn tag-btn float-right" role="button"
                     data-toggle="popover" data-placement="right" data-html="true" data-content={renderToString(<Tagbox pid={this.props.pid} tags={this.props.tags}/>)}> 
                        +
                    </a>
                </div>
            </div>
        )
    }
}

export default Footer
