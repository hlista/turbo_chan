import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import Image from './Image'
import axios from 'axios'
import $ from 'jquery'
class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            img_url: null,
            replies: []
        }
    }

    componentDidMount(){
        axios.get('/api/'+this.props.abrv+'/posts/'+this.props.pid+'.json')
        .then(data => {
            this.setState({
                content: data.data.data.content,
                img_url: data.data.data.img_url,
                replies: data.data.data.replies
            })
        })
        .catch(data => {
        })
    }
    render() {
        const cardPaddingStyle = {
            padding: '0.25rem 1.25rem'
        }
        return(
            <div className={this.props.isOp ? "op-container" : "post-container"}>
                <div className="row no-gutters">
                    {this.props.isOp && this.state.img_url ? <Image url={this.state.img_url}/> : null}
                    <div className="col d-flex">
                        <div className="card">
                            <div className="card-header" style={cardPaddingStyle}>
                                <Header isOp={this.props.isOp} isBoardView={this.props.isBoardView} abrv={this.props.abrv} pid={this.props.pid} replies={this.state.replies} isNested={this.props.isReply}/>
                            </div>
                            <div className="card-body">
                                {!this.props.isOp && this.state.img_url ? <Image url={this.state.img_url}/> : null}
                                <blockquote className="blockquote mb-0">
                                    {this.state.content}
                                </blockquote>

                            </div>
                            <div className="card-footer" style={cardPaddingStyle}>
                                <Footer abrv={this.props.abrv} pid={this.props.pid} tags={this.props.tags} isNested={this.props.isReply}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post