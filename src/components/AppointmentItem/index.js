// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentList, toggleIsFavourite} = props
  const {title, date, id, isFavourite} = appointmentList
  const starImageUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarImage = () => {
    toggleIsFavourite(id)
  }
  return (
    <li className="list-container">
      <div className="head-container">
        <p className="list-heading">{title}</p>
        <button
          className="button"
          type="button"
          data-testid="star"
          onClick={onClickStarImage}
        >
          <img src={starImageUrl} className="star-image" alt="star" />
        </button>
      </div>
      <p className="list-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
