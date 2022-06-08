import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    userName: '',
    password: '',
    showSubmitError: false,
    errMsg: '',
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserName = () => {
    const {userName} = this.state
    return (
      <div className="log-d1">
        <label className="log-p1" htmlFor="username">
          Username
        </label>
        <input
          className="log-in1"
          id="username"
          type="text"
          value={userName}
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="log-d1">
        <label className="log-p1" htmlFor="password">
          Password
        </label>
        <input
          className="log-in1"
          id="password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.push('/')
  }

  onSubmitFailure = errmsg => {
    this.setState({
      showSubmitError: true,
      errMsg: errmsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {username: userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errMsg} = this.state

    const getJwtToken = Cookies.get('jwt_token')
    if (getJwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="log-bg">
        <div className="log-card">
          <img
            className="log-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="log-d2" onSubmit={this.submitForm}>
            {this.renderUserName()}
            {this.renderPassword()}
            <button className="log-b1" type="submit">
              Login
            </button>
            {showSubmitError && <p className="log-p2">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
