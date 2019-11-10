import React, { Component } from 'react';
import axios from 'axios';
import ReactOnRails from "react-on-rails"
class PostUpload extends Component {
  constructor () {
    super();
    this.state = {
      file: null,
      content: "",
      subject: "",
      error: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    if (!this.props.op && this.state.file == null) {
        this.setState({error: "Please select a file"})
        return;
    }
    if (this.state.content == "") {
        this.setState({error: "Your post needs content"})
        return;
    }
    const formData = new FormData();
    const api_string = this.props.op ? '/api/posts' : '/api/threads'
    if (this.state.file) {
        formData.append('img', this.state.file[0]);
    }
    formData.append('content', this.state.content);
    formData.append('board', this.props.board);
    if (this.props.op) {
        formData.append('op', this.props.op)
    } else {
        formData.append('subject', this.state.subject);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken())
    axios.post(api_string, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(data => {
            this.setState({
                content: "",
                file: null,
                subject: "",
                error: ""
            })
        })
        .catch(data => {
        })
  }

  handleFileUpload(event){
    this.setState({file: event.target.files});
  }
  handleTextChange(event){
    this.setState({content: event.target.value});
  }
  handleSubjectChange(event){
    this.setState({subject: event.target.value})
  }
  render () {
    return (
        <div className='container'>
      <form onSubmit={this.handleSubmit}>
        {!this.props.op ? <div className='row justify-content-md-center'>
            <div className='col-md-1'>
                Subject
            </div>
            <div className='col-md-3'>
                <input className="form-control" type="text" onChange={this.handleSubjectChange}/>
            </div>
        </div> : null}
        <div className='row justify-content-md-center'>
            <div className='col-md-1'>
                Content
            </div>
            <div className='col-md-3'>
                <textarea value={this.state.content} className="form-control" onChange={this.handleTextChange} />
            </div>
        </div>
        <div className='row justify-content-md-center'>
            <div className='col-md-1'>
                Image
            </div>
            <div className='col-md-3'>
                <input label='upload file' type='file' onChange={this.handleFileUpload} />
            </div>
        </div>
        <div className='row justify-content-md-center'>
            <div className='col-md-3'>
                <font color="red">{this.state.error}</font>
            </div>
            <div className='col-md-1'>
                <button type='submit' className='float-right'>Send</button>
            </div>
        </div>
      </form>
      </div>
    );
  }
}

export default PostUpload;