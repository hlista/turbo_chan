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
                <div className="row" id={this.props.pid}>
                    {tags}
                </div>
            </div>
        )
    }
}

export default Tagbox