import {BsBoxArrowRight} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FaToolbox} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('./login')
  }

  return (
    <div className="nav-con">
      <img
        className="nav-img1"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div className="nav-card1">
        <Link to="/" className="nav-head">
          Home
        </Link>
        <Link to="/jobs" className="nav-head">
          Jobs
        </Link>
      </div>
      <button type="button" className="nav-b1" onClick={onClickLogout}>
        Log out
      </button>
      <div className="nav-card2">
        <Link to="/" className="nav-d2">
          <AiFillHome className="nav-icon" />
        </Link>
        <Link to="/jobs" className="nav-d2">
          <FaToolbox className="nav-icon" />
        </Link>
        <button type="button" className="nav-b2" onClick={onClickLogout}>
          <BsBoxArrowRight className="nav-icon" />
        </button>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
