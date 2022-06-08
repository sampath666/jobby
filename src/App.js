import './App.css'

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/LoginForm'

import Home from './components/Home'

import JobItemDetails from './components/JobItemDetails'

import NotFound from './components/NotFound'

import Jobs from './components/Jobs'

import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
