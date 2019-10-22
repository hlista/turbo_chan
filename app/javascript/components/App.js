import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Board from './Board'
import Thread from './Thread'
import queryString from 'query-string'
class App extends React.Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/:abrv/thread/:id" render={({match, location}) => (
                        <Thread abrv={match.params.abrv} tid={match.params.id} />
                    )}/>
                    <Route path="/:abrv" render={({match}) => (
                        <Board abrv={match.params.abrv} page="1" />
                    )} />
                </Switch>
            </div>
        )
    }
}

export default App