import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import Image from './Image'
import axios from 'axios'
class OpPost extends Component {
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
        return(
            <div className="op-container">
                <div className="row no-gutters">
                {this.state.img_url ? <Image url={this.state.img_url}/> : null}
                        <div className="card">
                            <div className="card-header">
                                <Header abrv={this.props.abrv} pid={this.props.pid} replies={this.state.replies}/>
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {this.state.content}
                                </blockquote>
                            </div>
                            <div className="card-footer">
                                <Footer pid={this.props.pid} tags={this.props.tags} tagged={[]}/>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default OpPost