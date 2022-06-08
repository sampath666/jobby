import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import JonDetailsCard from '../JobDetailsCard'

import SimilarCard from '../SimilarCard'

import './index.css'

const statesConstants = {
  success: 'SUCCESS',
  failure: 'FAIL',
  Loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], status: statesConstants.failure}

  componentDidMount() {
    this.renderCard()
  }

  renderCard = async () => {
    this.setState({status: statesConstants.Loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const Joburl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Joburl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
        status: statesConstants.success,
      })
    }
  }

  onRenderFailureView = () => (
    <div className="jd-d1">
      <div className="j-d8">
        <img
          className="j-img1"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          alt="failure view"
        />
        <h1>Oops! Something went wrong</h1>
        <p>We can not seem the page that you are looking for</p>
        <button type="button" className="p-b1">
          Retry
        </button>
      </div>
    </div>
  )

  onRenderLoadingView = () => (
    <div className="jd-d1">
      <div className="j-d8">
        <div className="loader-container" testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </div>
  )

  onRenderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div className="jd-d1">
        <JonDetailsCard data={jobDetails} />
        <h1 className="sc-1">Similar Jobs</h1>
        <div className="nc-1">
          {similarJobs.map(each => (
            <SimilarCard data={each} key={each.id} />
          ))}
        </div>
      </div>
    )
  }

  render() {
    const {status} = this.state

    switch (status) {
      case statesConstants.failure:
        return this.onRenderFailureView()
      case statesConstants.Loading:
        return this.onRenderLoadingView()
      default:
        return this.onRenderSuccessView()
    }
  }
}

export default JobItemDetails
