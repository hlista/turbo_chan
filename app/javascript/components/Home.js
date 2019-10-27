import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            boards: []
        }
    }
    componentDidMount(){
        axios.get('/api/boards.json')
        .then(data => {
            this.setState({
                boards: data.data.data.boards
            })
        })
        .catch(data => {
        })
    }
    componentDidUpdate(prevProps, prevState){
    }
    render () {
        const boards = this.state.boards.map( (data, index) => {
            return (
                <div className="row" key={index}>
                    <Link to={"/"+data.abrv}>{data.name}</Link>
                </div>
            )
        })
        return (
            <div className="container">
                {boards}
            </div>
        )
    }
}

export default Home