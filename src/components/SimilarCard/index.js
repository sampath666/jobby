import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {FaToolbox} from 'react-icons/fa'
import './index.css'

const SimilarCard = props => {
  const {data} = props
  return (
    <div className="sc-d1">
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
      <h1 className="jc-p3">Description</h1>
      <p className="jc-p4">{data.job_description}</p>
      <div className="jc-d4">
        <div className="jc-d2">
          <HiLocationMarker />
          <p className="jc-p1">{data.location}</p>
          <FaToolbox />
          <p className="jc-p1">{data.employment_type}</p>
        </div>
        <h1 className="jc-p2">{data.package_per_annum}</h1>
      </div>
    </div>
  )
}

export default SimilarCard
