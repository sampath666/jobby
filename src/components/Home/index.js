import {Link} from 'react-router-dom'

import Navbar from '../Navbar'

import './index.css'

const Home = () => (
  <>
    <Navbar />
    <div className="h-bg">
      <h1 className="h-h1">Find The Job That Fits Your Life</h1>
      <p className="h-p2">
        Millions of prople are searching for jobs,salary information ,company
        reviews. Find the job that four ablities and potential
      </p>
      <Link to="/jobs">
        <button className="h-b1" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
