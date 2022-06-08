import CheckBox from './CheckBox'

import SelectRadio from './selectElement'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const InputCard = props => {
  const {
    activeEmployList,
    onChangeUpdateEmp,
    activeSalary,
    onChangeUpdateSalary,
  } = props

  const onRenderEmployment = () => (
    <>
      {employmentTypesList.map(each => (
        <CheckBox
          id={each.employmentTypeId}
          key={each.employmentTypeId}
          isChecked={
            activeEmployList.find(e1 => e1 === each.employmentTypeId) !==
            undefined
          }
          onChangeUpdateEmp={onChangeUpdateEmp}
        >
          {each.label}
        </CheckBox>
      ))}
    </>
  )

  const onRenderSalary = () => (
    <>
      {salaryRangesList.map(each => (
        <SelectRadio
          id={each.salaryRangeId}
          key={each.salaryRangeId}
          isChecked={activeSalary === each.salaryRangeId}
          onChangeUpdateSalary={onChangeUpdateSalary}
        >
          {each.label}
        </SelectRadio>
      ))}
    </>
  )

  return (
    <>
      <div className="j-emp-card">
        <h1 className="j-h2">Type of Employment</h1>
        {onRenderEmployment()}
      </div>
      <hr className="j-line1" />
      <div className="j-emp-card">
        <h1 className="j-h2">Salary Range</h1>
        {onRenderSalary()}
      </div>
    </>
  )
}

export default InputCard
