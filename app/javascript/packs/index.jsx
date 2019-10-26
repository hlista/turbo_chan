// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from '../components/App'
import Home from '../components/Home'
import Board from '../components/Board'
import Thread from '../components/Thread'
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/:abrv/thread/:id" render={({match, location, history}) => (
                    <Thread abrv={match.params.abrv} tid={match.params.id} history={history} match={match}/>
                )}/>
                <Route path="/:abrv" render={({match, history}) => (
                    <Board abrv={match.params.abrv} page="1" history={history} match={match} />
                )} />
            </Switch>
        </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
