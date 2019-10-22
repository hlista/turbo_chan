import React, { Component } from 'react'
class StaticPost extends Component {

    render() {
        const replies = this.props.replies ? this.props.replies.map( (data, index) => {
            return (
                <a key={index} className="pl-2" href="#">
                    >>{data}
                </a>
            )
        }) : null
        const cardPaddingStyle = {
            padding: '0.25rem 1.25rem'
        }
        const imgStyling = {maxWidth: '250px', height: 'auto'}
        const tags = [{name:'Report', count: 9},{name:'Fake News', count: 3},{name:'Problematic', count: 11}].map( (data, index) => {
            return (
                <button key={index} type="button" className="btn btn-primary tag-post-btn">
                  {data.name} <span className="badge badge-light">{data.count}</span>
                </button>
            )
        })
        return(
            <div className="card">
                <div className="card-header" style={cardPaddingStyle}>
                    <a>{'No. '+this.props.pid}</a>
                    {replies}
                </div>
                <div className="card-body">
                    <div className="float-left pr-3">
                        <img src={this.props.img_url} style={imgStyling} className="img-fluid" alt=""></img>
                    </div>
                    <blockquote className="blockquote mb-0">
                        {this.props.content}
                    </blockquote>

                </div>
                <div className="card-footer" style={cardPaddingStyle}>
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            {tags}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StaticPost