import React, { Component } from 'react'
import { Header, Segment } from 'semantic-ui-react'

class ClientProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.state.userInfo = {
      fullName: "Smolina Alek....",
      email: "alphanove!!!!!!!!!!",
      zipCode: "123123124",
      balance: "1232343"
    }
  }

  render() {
    return(
      <main className="container">
        <div className="row">
          <div className="col-md-12">
            <Header as='h3' textAlign='center'>
              Full Name: {this.state.userInfo.fullName}
            </Header>
            <Header as='h3' textAlign='center'>
              Email: {this.state.userInfo.email}
            </Header>
            <Header as='h3' textAlign='center'>
              ZipCode: {this.state.userInfo.zipCode}
            </Header>
            <Header as='h3' textAlign='center'>
              Balance: {this.state.userInfo.balance}
            </Header>
          </div>
        </div>
      </main>
    )
  }
}

export default ClientProfile
