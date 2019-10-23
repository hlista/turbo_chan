import React, { Component } from 'react'
class Tags extends Component {
    render(){
        const tags = this.props.tags.map( (data, index) => {
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