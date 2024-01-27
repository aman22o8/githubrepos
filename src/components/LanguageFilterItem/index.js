// Write your code here
import './index.css'

const LanguageFiterItem = props => {
  const {eachItem, myfunction, isActive} = props
  const {id, language} = eachItem
  const updateButton = () => {
    // console.log(event.target.id, id)
    myfunction(id)
  }
  const myActiveTab = isActive ? 'active_btn' : ''

  return (
    <li className="list_container">
      <button
        onClick={updateButton}
        type="button"
        className={`each_btn ${myActiveTab}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFiterItem
