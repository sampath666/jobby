import './checkbox.css'

const CheckBox = props => {
  const {id, children, isChecked, onChangeUpdateEmp} = props

  return (
    <div className="j-job-checkbox">
      <input
        type="checkbox"
        id={id}
        className="check-box-input"
        checked={isChecked}
        onChange={() => onChangeUpdateEmp(id)}
      />
      <label htmlFor={id} className="form-title bottom-text">
        {children}
      </label>
    </div>
  )
}

export default CheckBox
