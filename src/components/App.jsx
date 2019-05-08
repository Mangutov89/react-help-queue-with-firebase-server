import React from 'react'
import Header from './Header'
import TicketList from './TicketList'
import { Switch, Route, withRouter } from 'react-router-dom'
import NewTicketControl from './NewTicketControl'
import Error404 from './Error404'
import Momment from 'moment'
import Admin from './Admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import constants from './../constants'
const { c } = constants
import * as actions from './../actions'


class App extends React.Component{

  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      selectedTicket: null
    }
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this)
  }
  componentWillMount() {
    const { dispatch } = this.props
    const { watchFirebaseTicketsRef } = actions
    dispatch(watchFirebaseTicketsRef())
  }
  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    )
  }
  updateTicketElapsedWaitTime() {
  const { dispatch } = this.props;
  Object.keys(this.props.masterTicketList).map(ticketId => {
    const ticket = this.props.masterTicketList[ticketId];
    // This line is updated:
    const newFormattedWaitTime = new Moment(ticket.timeOpen).from(new Moment());
    const action = {
      type: c.UPDATE_TIME,
      id: ticketId,
      formattedWaitTime: newFormattedWaitTime
    };
    dispatch(action);
  });
}
  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer)
  }

  handleChangingSelectedTicket(ticket){
    this.setState({selectedTicket: ticket})
  }
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.props.masterTicketList}/>}/>
          <Route path='/newticket' render={()=><NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList}/>}/>
          <Route path='/admin' render={(props)=><Admin ticketList={this.props.masterTicketList} currentRouterPath={props.location.pathname} onTicketSelection={this.handleChangingSelectedTicket}
            selectedTicket={this.state.selectedTicket}/>} />
          <Route component={Error404} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  masterTicketList: PropTypes.object
}

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList
  }
}

export default withRouter(connect(mapStateToProps)(App))
