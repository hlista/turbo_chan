import React, { Component } from 'react'
import Post from '../Post/Post'
import axios from 'axios'
class Thread extends Component {
    render() {
        const posts = this.props.posts.map( (data, index) => {
            return (
                <Post isOp={index==0} isBoardView={true} isReply={false} key={data} abrv={this.props.abrv} pid={data} tags={this.props.tags}/>
            )
        })
        return(
            <div className="container pt-3 pb-3 clearfix">
                {posts}
            </div>
        )
    }
}

export default Thread