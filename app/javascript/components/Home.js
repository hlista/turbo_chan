import React from 'react'
import ActionCable from 'actioncable'

class Home extends React.Component {

    cable = ActionCable.createConsumer('/cable');

    componentDidMount(){
        this.cable.subscriptions.create({channel: "TagChannel", abrv: "tv", post_num: "40"}, { 
            received: function(data) {
                console.log(data)
            }
        })
    }
    render () {
        return (
            <div>
                This is the Home Page
            </div>
        )
    }
}

export default Home