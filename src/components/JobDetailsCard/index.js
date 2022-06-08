import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {FaToolbox} from 'react-icons/fa'
import './index.css'

const JonDetailsCard = props => {
  const {data} = props
  const {skills} = data
  return (
    <div className="jcd-d1">
      <div className="jc-d2">
        <img src={data.company_logo_url} alt={data.id} className="jc-img1" />
        <div className="jc-d3">
          <h1 className="jc-h1">{data.title}</h1>
          <p className="jc-h1">
            <span>
              <AiFillStar className="jc-img2" />
            </span>
            {data.rating}
          </p>
        </div>
      </div>
      <div className="jc-d4">
        <div className="jc-d2">
          <HiLocationMarker />
          <p className="jc-p1">{data.location}</p>
          <FaToolbox />
          <p className="jc-p1">{data.employment_type}</p>
        </div>
        <h1 className="jc-p2">{data.package_per_annum}</h1>
      </div>
      <hr className="jc-line1" />
      <h1 className="jcd-p3">Description</h1>
      <p className="jcd-p4">{data.job_description}</p>
      <h1 className="jcd-p3">Skills</h1>
      <div className="jcd-d2">
        {skills.map(each => (
          <div className="jcd-c1" key={each.name}>
            <img className="jcd-img1" src={each.image_url} alt={each.name} />
            <p className="jcd-p1">{each.name}</p>
          </div>
        ))}
      </div>
      <h1 className="jcd-p3">Life at Company</h1>
      <div className="jcd-d3">
        <div className="jcd-d4">
          <p className="jcd-p4">{data.life_at_company.description}</p>
        </div>
        <img
          className="jcd-img2"
          src={data.life_at_company.image_url}
          alt={data.title}
        />
      </div>
    </div>
  )
}

export default JonDetailsCard
