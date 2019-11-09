import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import ParentComponent from './ParentComponent'
import GlobalStore from '../context/GlobalStore'
class App extends React.Component {
    state = {
        posts: []
    };
    addPost = post => {
        this.setState({posts: [post, ...this.state.posts]})
    };

    render () {
        return (
            <GlobalStore.Provider value={{ 
                posts: this.state.posts, addPost: this.addPost
            }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/:abrv/thread/:id" render={({match, location}) => (
                        <ParentComponent isBoard={false} abrv={match.params.abrv} tid={match.params.id} />
                    )}/>
                    <Route path="/:abrv" render={({match}) => (
                        <ParentComponent isBoard={true} abrv={match.params.abrv} />
                    )} />
                </Switch>
            </GlobalStore.Provider>
        )
    }
}
export default App