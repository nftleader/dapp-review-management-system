import React, { Component } from 'react'
import { Table, Button, Grid } from 'semantic-ui-react'
import ReviewDisplayModal from './ReviewDisplayModal'
import WriteReviewModal from './WriteReviewModal'

class ClientHome extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {};

    this.state.searchKey = "headphone..";

    this.state.datas = [{
      product: 'aaa',
      company: 'email1.e.com',
      address: 'address231'
    },{
      product: 'aaa123',
      company: '12email1.e.com',
      address: 'addres54s1'
    },{
      product: '54',
      company: '432email1.e.com',
      address: 'address871'
    },];
  }

  render() {
    return(
      <main className="container">
        <div className="row">
          <div className="col-md-12">
            { this.state.searchKey != "" ? <h3>Find: <b>{this.state.searchKey}</b></h3> : ''}
            <hr></hr>
            <Table celled structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>No</Table.HeaderCell>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Company Name</Table.HeaderCell>
                  <Table.HeaderCell>Company Address</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
              {this.state.datas.map((item, index) => {
                return ( <Table.Row key={item.product}>
                          <Table.Cell>{index + 1}</Table.Cell>
                          <Table.Cell>{item.product}</Table.Cell>
                          <Table.Cell>{item.company}</Table.Cell>
                          <Table.Cell>{item.address}</Table.Cell>
                          <Table.Cell>
                            <Button.Group>
                              <ReviewDisplayModal info={item}/>
                              <Button.Or />
                              <WriteReviewModal info={item}/>
                            </Button.Group>
                          </Table.Cell>
                        </Table.Row> )})
              }
                
              </Table.Body>
            </Table>
          </div>
        </div>
      </main>
    )
  }
}

export default ClientHome
