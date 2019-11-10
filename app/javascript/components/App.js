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

    updateTag = tag => {
        const updatedPosts = [...this.state.posts]
        const index = updatedPosts.findIndex(post => post.abrv === tag.abrv && post.pid === tag.pid)
        if (index != -1) {
            const tags = updatedPosts[index].tags;
            const tindex = tags.findIndex(t => t.name === tag.name)
            if (tindex != -1){
                updatedPosts[index].tags[tindex].count = tag.count
            } else {
                updatedPosts[index].tags.push({name: tag.name, count: tag.count})
            }
        }
        this.setState({posts: updatedPosts})
    };
    getIndex = (abrv, pid) => {
        const index = this.state.posts.findIndex(post => post.abrv === abrv && post.pid === pid)
        return index;
    };
    render () {
        return (
            <GlobalStore.Provider value={{ 
                posts: this.state.posts, addPost: this.addPost, updateTag: this.updateTag, getIndex: this.getIndex
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