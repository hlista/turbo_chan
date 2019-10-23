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
            replies: [],
            tagged: []
        }
    }

    componentDidMount(){
        axios.get('/api/'+this.props.abrv+'/posts/'+this.props.pid+'.json')
        .then(data => {
            this.setState({
                content: data.data.data.content,
                img_url: data.data.data.img_url,
                replies: data.data.data.replies,
                tagged: data.data.data.tagged
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
            !this.props.isOp ? <div className="post-container">
                <div className="row no-gutters">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header" style={cardPaddingStyle}>
                                <Header abrv={this.props.abrv} pid={this.props.pid} replies={this.state.replies} isNested={this.props.isReply}/>
                            </div>
                            <div className="card-body">
                                {this.state.img_url ? <Image url={this.state.img_url}/> : null}
                                <blockquote className="blockquote mb-0">
                                    {this.state.content}
                                </blockquote>

                            </div>
                            <div className="card-footer" style={cardPaddingStyle}>
                                <Footer abrv={this.props.abrv} pid={this.props.pid} tags={this.props.tags} tagged={this.state.tagged} isNested={this.props.isReply}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div className="op-container">
                <div className="row no-gutters">
                {this.state.img_url ? <Image url={this.state.img_url}/> : null}
                        <div className="card">
                            <div className="card-header">
                                <Header abrv={this.props.abrv} pid={this.props.pid} replies={this.state.replies} isNested={this.props.isReply}/>
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {this.state.content}
                                </blockquote>
                            </div>
                            <div className="card-footer">
                                <Footer abrv={this.props.abrv} pid={this.props.pid} tags={this.props.tags} tagged={this.state.tagged} isNested={this.props.isReply}/>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default Post