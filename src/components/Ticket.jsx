import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import c from './../constants'


function Ticket(props){
  const ticketInformation =
    <div>
      <style global jsx>{`
      div {
        background-color: pink;
        text-align: center;
      }
      h3 {
        color: white;
      }
      p:hover {
        color: white;
        cursor: pointer;
      }
    `}</style>
      <h3> {props.location} - {props.names}</h3>
      <h4>{props.formattedWaitTime}</h4>
      <p>{props.id}</p>
      <hr/>
    </div>
  function handleSavingSelectedTicket(ticketId){
    const { dispatch } = props
    const action = {
      type: c.SELECT_TICKET,
      ticketId: ticketId
    }
    dispatch(action)
  }
  if (props.currentRouterPath === '/admin'){
    return (
      <div onClick={() => {handleSavingSelectedTicket(props.ticketId)}}>
        {ticketInformation}
      </div>
    )
  } else {
    return (
      <div>
        {ticketInformation}
      </div>
    )
  }
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string.isRequired,
  currentRouterPath: PropTypes.string,
  ticketId: PropTypes.string
}

export default connect()(Ticket)
