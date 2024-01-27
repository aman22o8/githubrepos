import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiconstant = [
  {initial: 'INITIAL'},
  {inprogress: 'PROGRESS'},
  {success: 'SUCCESS'},
  {failure: 'FAILURE'},
]
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    initialData: [],
    activeId: languageFiltersData[0].id,
    myActiveApi: apiconstant[0].initial,
  }

  componentDidMount() {
    this.getData()
  }

  myfunction = id => {
    this.setState({activeId: id}, this.getData)
  }

  getData = async () => {
    const {activeId} = this.state
    this.setState({myActiveApi: apiconstant[1].inprogress})

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      console.log(response)
      const updatedData = data.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({
        initialData: updatedData,
        myActiveApi: apiconstant[2].success,
      })
    } else {
      this.setState({myActiveApi: apiconstant[3].failure})
    }
  }

  renderInprogress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {initialData} = this.state
    return (
      <ul className="button_language_container">
        {initialData.map(each => (
          <RepositoryItem key={each.id} eachItem={each} />
        ))}
      </ul>
    )
    // console.log('success')
  }

  renderFailure = () => (
    <div className="failure_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failure_image"
      />
      <h1 className="failure_heading">Something Went Wrong</h1>
    </div>
  )
  // console.log('Failure')

  renderFunction = () => {
    const {myActiveApi} = this.state
    switch (myActiveApi) {
      case apiconstant[1].inprogress:
        return this.renderInprogress()
      case apiconstant[2].success:
        return this.renderSuccess()
      case apiconstant[3].failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    // console.log(activeId)
    const mystyles = {color: '#000000', font: 'normal normal 600 45px Lobster'}
    return (
      <div className="main_container">
        <h1 style={mystyles}>Popular</h1>
        <ul className="button_language_container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              eachItem={each}
              myfunction={this.myfunction}
              isActive={each.id === activeId}
            />
          ))}
        </ul>
        {this.renderFunction()}
      </div>
    )
  }
}

export default GithubPopularRepos
