import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { withRouter } from "react-router";
import Home from './Home'
import Board from './Board'
import Thread from './Thread'
class App extends React.Component {
    render () {
        return (
            <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/:abrv/thread/:id" render={({match, location}) => (
                        <Thread abrv={match.params.abrv} tid={match.params.id} />
                    )}/>
                    <Route path="/:abrv" render={({match}) => (
                        <Board abrv={match.params.abrv} page="1" />
                    )} />
                </Switch>
            </BrowserRouter>
            </div>
        )
    }
}
export default App