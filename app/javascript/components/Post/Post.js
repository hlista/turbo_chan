import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import Image from './Image'
import axios from 'axios'
import $ from 'jquery'
import GlobalStore from '../../context/GlobalStore'
class Post extends Component {
    static contextType = GlobalStore

    componentDidMount(){
        const index = this.context.posts.findIndex(post => post.abrv === this.props.abrv && post.pid === this.props.pid.toString())
        if (index == -1) {
            axios.get('/api/'+this.props.abrv+'/posts/'+this.props.pid+'.json')
            .then(data => {
                this.context.addPost(data.data.data)
            })
            .catch(data => {
            })
        }
    }
    render() {
        const cardPaddingStyle = {
            padding: '0.25rem 1.25rem'
        }
        const index = this.context.getIndex(this.props.abrv, this.props.pid.toString());
        return(
            index != -1 ? <div className={this.props.isOp ? "op-container" : "post-container"}>
                    {this.props.isOp && this.context.posts[index].img_url ? <Image url={this.context.posts[index].img_url}/> : null}
                    <div className="d-flex">
                        <div className="card d-flex">
                            <div className="card-header" style={cardPaddingStyle}>
                                <Header isOp={this.props.isOp} isBoardView={this.props.isBoardView} abrv={this.props.abrv} pid={this.props.pid} replies={this.context.posts[index].replies} isNested={this.props.isReply}/>
                            </div>
                            <div className="card-body">
                                {!this.props.isOp && this.context.posts[index].img_url ? <Image url={this.context.posts[index].img_url}/> : null}
                                <blockquote className="blockquote mb-0">
                                    {this.context.posts[index].content}
                                </blockquote>

                            </div>
                            <div className="card-footer" style={cardPaddingStyle}>
                                <Footer abrv={this.props.abrv} pid={this.props.pid} tags={this.props.tags} tagged={this.context.posts[index].tags} isNested={this.props.isReply}/>
                            </div>
                        </div>
                    </div>
            </div> : null
        )
    }
}

export default Post