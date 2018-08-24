import React, { Component } from 'react'
import { Header, Segment } from 'semantic-ui-react'

class CompanyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.state.companyInfo = {
      company: "Smolina Alek....",
      email: "alphanove!!!!!!!!!!",
      address: "123123124"
    }
  }

  render() {
    return(
      <main className="container">
        <div className="row">
          <div className="col-md-12">
            <Header as='h3' textAlign='center'>
              Company Name: {this.state.companyInfo.company}
            </Header>
            <Header as='h3' textAlign='center'>
              Email: {this.state.companyInfo.email}
            </Header>
            <Header as='h3' textAlign='center'>
              Address: {this.state.companyInfo.address}
            </Header>
          </div>
        </div>
      </main>
    )
  }
}

export default CompanyProfile
