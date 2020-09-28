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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.hiddenFileInput = React.createRef();
    this.handleFileChange = this.handleFileChange.bind(this);
    this.reader = new FileReader();
  }

  handleSubmit(event){
    event.preventDefault();
    if (!this.props.op && this.state.file == null) {
        this.setState({error: "Please select a file"})
        return;
    }
    if (!this.props.op && this.state.content == "") {
        this.setState({error: "Your post needs content"})
        return;
    }
    if (this.props.op && this.state.file == null && this.state.content == ""){
        this.setState({error: "Your post needs a file or content"})
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

  handleTextChange(event){
    this.setState({content: event.target.value});
  }
  handleSubjectChange(event){
    this.setState({subject: event.target.value})
  }
  handleImageClick(event){
    this.hiddenFileInput.current.click();
  }
  handleFileChange(event){
    this.setState({file: event.target.files});
    this.reader.readAsDataURL(event.target.files[0])
  }
  render () {
    return (
        <div className="post-container">
              <form onSubmit={this.handleSubmit}>
                    <div className="d-flex">
                        <div className="card">
                            <div className="card-header">
                                Create a New Thread on /{this.props.board}/
                            </div>
                            <div className="card-body d-flex">
                                {this.state.file ? <img onClick={this.handleImageClick} src={this.reader.result} style={{maxWidth: '100px', maxHeight: '100px', height: 'auto', width: 'auto'}}/> :<img onClick={this.handleImageClick} src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" style={{maxWidth: '100px', maxHeight: '100px', height: 'auto', width: 'auto'}}/>}
                                <input type="file" ref={this.hiddenFileInput} onChange={this.handleFileChange} style={{display:'none'}} />
                                <div ref={this.textRef}>
                                <blockquote> {this.state.content ? this.state.content : "Your message goes here."}</blockquote>
                                </div>

                            </div>
                            <div className="card-footer">
                                <font color="red">{this.state.error}</font>
                                <button type='submit' className='float-right'>Send</button>
                            </div>
                        </div>
                    </div>
                </form>
        </div>

    );
  }
}

export default PostUpload;