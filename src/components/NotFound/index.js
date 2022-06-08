import Navbar from '../Navbar'

import './index.css'

const NotFound = () => (
  <>
    <Navbar />
    <div className="not-bg">
      <img
        className="not-img"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry page you requested could not be found</p>
    </div>
  </>
)

export default NotFound
