// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', status: false}

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onSubmitFormButton = event => {
    event.preventDefault()
    const {title, date, appointmentList} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isFavourite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
    return appointmentList
  }

  toggleIsFavourite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavourite: !eachAppointment.isFavourite}
        }
        return eachAppointment
      }),
    }))
  }

  toggleIsStarred = () => {
    const {status, appointmentList} = this.state
    this.setState(prevState => ({status: !prevState.status}))
    console.log(status)
  }

  render() {
    const {appointmentList, title, date, status} = this.state
    const isStarred = status ? 'starred-btn' : 'starred-button'

    const filteredAppointments = status
      ? appointmentList.filter(each => each.isFavourite === status)
      : appointmentList
    console.log(filteredAppointments)

    return (
      <div className="app-container">
        <div className="card">
          <div className="upper-part">
            <div className="adding-appointments">
              <h1 className="main-heading">Add Appointment</h1>
              <form
                className="form-container"
                onSubmit={this.onSubmitFormButton}
              >
                <div className="input">
                  <label htmlFor="title" className="title-label">
                    TITLE
                  </label>
                  <input
                    value={title}
                    type="text"
                    id="title"
                    onChange={this.onChangeTitleInput}
                    className="title-input"
                    placeholder="Title"
                  />
                </div>
                <div className="input">
                  <label htmlFor="date" className="title-label">
                    DATE
                  </label>
                  <input
                    type="date"
                    value={date}
                    id="date"
                    onChange={this.onChangeDateInput}
                    className="title-input"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="seperator" />
          <div className="lower-part">
            <div className="head">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={isStarred}
                onClick={this.toggleIsStarred}
              >
                Starred
              </button>
            </div>
            <ul className="app-list-container">
              {filteredAppointments.map(each => (
                <AppointmentItem
                  appointmentList={each}
                  key={each.id}
                  toggleIsFavourite={this.toggleIsFavourite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
