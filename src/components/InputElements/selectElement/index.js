const SelectRadio = props => {
  const {id, children, isChecked, onChangeUpdateSalary} = props
  return (
    <div className="j-job-checkbox">
      <input
        type="radio"
        id={id}
        className="check-box-input"
        checked={isChecked}
        onChange={() => onChangeUpdateSalary(id)}
      />
      <label htmlFor={id} className="form-title bottom-text">
        {children}
      </label>
    </div>
  )
}

export default SelectRadio
