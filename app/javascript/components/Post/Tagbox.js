import React, { Component } from 'react'
class Tagbox extends Component {
    render(){
        const tags = this.props.tags.map( (data, index) => {
            return (
                <div key={index} className="btn btn-primary tag-post-btn">
                  {data}
                </div>
            )
        })
        return (
            <div className="container">
                <div className="row" data-post={this.props.pid} data-board={this.props.abrv}>
                    {tags}
                </div>
            </div>
        )
    }
}

export default Tagbox