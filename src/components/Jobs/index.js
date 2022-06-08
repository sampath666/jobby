import {Component} from 'react'

import Cookies from 'js-cookie'

import {AiOutlineSearch} from 'react-icons/ai'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import JobCard from '../JobCard'

import InputCard from '../InputElements/InputCard'

import './index.css'

const statesConstants = {
  success: 'SUCCESS',
  failure: 'FAIL',
  Loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    profile: {},
    activeEmployList: [],
    activeSalary: '',
    jobsData: [],
    inputSearch: '',
    status: statesConstants.failure,
  }

  componentDidMount() {
    this.onUpdateProfile()
    this.onUpdateJobs()
  }

  onUpdateProfile = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({profile: data.profile_details})
    }
  }

  onUpdateJobs = async () => {
    const {activeEmployList, activeSalary, inputSearch} = this.state
    this.setState({status: statesConstants.Loading})
    let jobUrl = 'https://apis.ccbp.in/jobs'

    if (activeEmployList.length > 0) {
      let string1 = '?employment_type='
      string1 += activeEmployList.join(',')
      jobUrl += string1
    }
    if (activeSalary !== '') {
      if (activeEmployList.length === 0) {
        jobUrl += `?minimum_package=${activeSalary}`
      } else {
        jobUrl += `&minimum_package=${activeSalary}`
      }
    }

    if (inputSearch !== '') {
      if (activeEmployList.length === 0 && activeSalary === '') {
        jobUrl += `?search=${inputSearch}`
      } else {
        jobUrl += `&search=${inputSearch}`
      }
    }

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({jobsData: data.jobs, status: statesConstants.success})
    } else {
      this.setState({status: statesConstants.failure})
    }
  }

  onRenderProfile = () => {
    const {profile} = this.state
    if (profile === undefined || profile.name === undefined) {
      return (
        <div className="profile-card-fail">
          <button type="button" className="p-b1" onClick={this.onUpdateProfile}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <div className="profile-card">
        <div className="profile-img-card">
          <img
            className="profile-img1"
            src={profile.profile_image_url}
            alt={profile.name}
          />
        </div>
        <h1 className="p-h1">{profile.name}</h1>
        <p className="p-p2"> {profile.short_bio}</p>
      </div>
    )
  }

  onChangeUpdateEmp = id => {
    const {activeEmployList} = this.state
    const searchId = activeEmployList.find(each => each === id)
    if (searchId !== undefined) {
      const formatedList = activeEmployList.filter(each => each !== id)
      this.setState({activeEmployList: formatedList}, this.onUpdateJobs)
    } else {
      activeEmployList.push(id)
      this.setState({activeEmployList}, this.onUpdateJobs)
    }
  }

  onChangeUpdateSalary = id => {
    this.setState({activeSalary: id}, this.onUpdateJobs)
  }

  onChangeSearch = e => {
    this.setState({inputSearch: e.target.value})
  }

  onClickSearch = () => {
    this.onUpdateJobs()
  }

  onRenderSuccessJobs = () => {
    const {jobsData} = this.state

    if (jobsData.length === 0) {
      return (
        <div className="j-d8">
          <img
            className="j-img1"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs.Try other filters</p>
        </div>
      )
    }
    return (
      <>
        {jobsData.map(each => (
          <JobCard data={each} key={each.id} />
        ))}
      </>
    )
  }

  onRenderLoadingJobs = () => (
    <div className="j-d9">
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  onRenderFailureJobs = () => (
    <div className="j-d8">
      <img
        className="j-img1"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We can not seem the page that you are looking for</p>
      <button type="button" className="p-b1" onClick={this.onUpdateJobs}>
        Retry
      </button>
    </div>
  )

  onRenderJobs = () => {
    const {status} = this.state
    switch (status) {
      case statesConstants.success:
        return this.onRenderSuccessJobs()
      case statesConstants.Loading:
        return this.onRenderLoadingJobs()
      default:
        return this.onRenderFailureJobs()
    }
  }

  render() {
    const {activeEmployList, activeSalary, inputSearch} = this.state

    return (
      <div>
        <Navbar />
        <div className="j-bg">
          <div className="j-sidebar-con">
            <div className="j-d6 j-s-1">
              <input
                className="j-in1"
                placeholder="search"
                type="search"
                value={inputSearch}
                onChange={this.onChangeSearch}
              />
              <button type="button" className="j-d7">
                <AiOutlineSearch />
              </button>
            </div>
            {this.onRenderProfile()}
            <hr className="j-line1" />
            <InputCard
              activeEmployList={activeEmployList}
              onChangeUpdateEmp={this.onChangeUpdateEmp}
              activeSalary={activeSalary}
              onChangeUpdateSalary={this.onChangeUpdateSalary}
            />
          </div>
          <div className="j-d5">
            <div className="j-d6 j-m-1">
              <input
                className="j-in1"
                placeholder="search"
                type="search"
                value={inputSearch}
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                className="j-d7"
                onClick={this.onClickSearch}
                testid="searchButton"
              >
                <AiOutlineSearch />
              </button>
            </div>
            {this.onRenderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
