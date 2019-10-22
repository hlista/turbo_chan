import React, { Component } from 'react'
class Image extends Component {
    constructor(props){
        super(props)
        this.state = {
            isExpanded: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState(state => ({
            isExpanded: !state.isExpanded
        }));

    }
    render(){
        const imgStyling = {maxWidth: '250px', maxHeight: '250px', height: 'auto', width: 'auto'}
        return (
                <div className="float-left pr-3" onClick={this.handleClick}>
                    <img src={this.props.url} style={this.state.isExpanded ? {} : imgStyling} className="img-fluid" alt=""></img>
                </div>
        )
    }
}

export default Image