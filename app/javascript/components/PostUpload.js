import React, { Component } from 'react';
import axios from 'axios';
import ReactOnRails from "react-on-rails"
class PostUpload extends Component {
  constructor () {
    super();
    this.state = {
      file: null,
      content: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const formData = new FormData();
    const api_string = this.props.op ? '/api/posts' : '/api/threads'
    if (this.state.file) {
        formData.append('img', this.state.file[0]);
    }
    formData.append('content', this.state.content);
    formData.append('board', this.props.board);
    if (this.props.op) {
        formData.append('op', this.props.op)
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken())
    axios.post(api_string, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(data => {
            this.setState({
                content: "",
                file: null
            })
            this.props.uploadSuccessCallback()
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

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <table>
            <tbody>
                <tr>
                    <td>
                        Content
                    </td>
                    <td>
                        <textarea value={this.state.content} onChange={this.handleTextChange} />
                    </td>
                </tr>
                <tr>
                    <td>
                        Image
                    </td>
                    <td>
                        <input label='upload file' type='file' onChange={this.handleFileUpload} />
                        <button type='submit'>Send</button>
                    </td>
                </tr>
            </tbody>
        </table>
      </form>
    );
  }
}

export default PostUpload;