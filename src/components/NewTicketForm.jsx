import React from 'react'
import patos from '../assets/images/patos.jpeg'
import PropTypes from 'prop-types'
import { v4 } from 'uuid';

function NewTicketForm(props){
  let _names = null
  let _location = null
  let _issue = null

  function handleNewTicketFormSubmission(event) {
    event.preventDefault()
    props.onNewTicketCreation({names: _names.value, location: _location.value, issue: _issue.value, id: v4()})
    _names.value = ''
    _location.value = ''
    _issue.value = ''
    location.hash = '/';

  }

  // var styles = {
  //   backgroundImage: 'linearGradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
  // }
  return(
    <div>
      <style jsx>{`
          img {
            width: 100%;
            height: 25%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
          }
          form {
            text-align: center;
            position: absolute;
            top: 75%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            width: 100%;
            height:75%;
          }
          `}</style>
      <div>
        <img src={patos}/>
      </div>
      <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          id='names'
          placeholder='Pair Names'
          ref={(input) => {_names = input}}/>
        <input
          type='text'
          id='location'
          placeholder='Location'
          ref={(input) => {_location = input}}/>
        <textarea
          id='issue'
          placeholder='Describe your issue'
          ref={(textarea) => {_issue = textarea}}/>
        <button type='submit'>Help!</button>
      </form>
    </div>
  )
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
}

export default NewTicketForm
