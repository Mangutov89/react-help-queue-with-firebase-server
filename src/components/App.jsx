import React from 'react'
import Header from './Header'
import TicketList from './TicketList'
import { Switch, Route } from 'react-router-dom'
import NewTicketControl from './NewTicketControl'
import Error404 from './Error404'
import Momment from 'moment'
import Admin from './Admin'



class App extends React.Component{

  constructor (props) {
    super(props)
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    }
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this)
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    )
  }


  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer)
  }
  updateTicketElapsedWaitTime() {
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList)
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true)
    })

    this.setState({masterTicketList: newMasterTicketList})
  }

  handleChangingSelectedTicket(ticket){
    this.setState({selectedTicket: ticket})
  }
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList}/>}/>
          <Route path='/newticket' render={()=><NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList}/>}/>
          <Route path='/admin' render={(props)=><Admin ticketList={this.state.masterTicketList} currentRouterPath={props.location.pathname} onTicketSelection={this.handleChangingSelectedTicket}
            selectedTicket={this.state.selectedTicket}/>} />
          <Route component={Error404} />
        </Switch>
      </div>
    )
  }
}

export default App
