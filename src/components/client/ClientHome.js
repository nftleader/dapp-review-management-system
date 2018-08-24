import React, { Component } from 'react'
import { Table, Button, Grid, Input } from 'semantic-ui-react'
import ReviewDisplayModal from './ReviewDisplayModal'
import WriteReviewModal from './WriteReviewModal'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CommonAction from 'components/Action/CommonAction'

class ClientHome extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {};


    this.state.searchKey = "";
    if (this.props.data.searchKey.searchKey != undefined)
      this.state.searchKey = this.props.data.searchKey.searchKey;

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

    this.state.isOpenReviewDisplayModal = false;
    this.state.isOpenWriteReviewModal = false;
    this.state.curSelItem = null;
  }

  onClickSearch() {
    this.props.action.searchAction(this.state.searchKey);
  }

  onClickItem(item) {
    this.setState({
      curSelItem: item,
      isOpenReviewDisplayModal: true
    })
  }

  onClickWriteReview(item) {
    this.setState({
      curSelItem: item,
      isOpenWriteReviewModal: true
    })
  }

  render() {
    return(
      <main className="container">
        <div className="row">
          <div className="col-md-12">
            <Input size='medium' icon={{ name: 'search', circular: true, link: true, onClick:() => this.onClickSearch() }} placeholder='Search...'
                onChange={(event, value) => { this.setState({searchKey: value.value})}} value={this.state.searchKey} autoFocus/>

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
                          <Table.Cell onClick={() => this.onClickItem(item)}>{index + 1}</Table.Cell>
                          <Table.Cell onClick={() => this.onClickItem(item)}>{item.product}</Table.Cell>
                          <Table.Cell onClick={() => this.onClickItem(item)}>{item.company}</Table.Cell>
                          <Table.Cell onClick={() => this.onClickItem(item)}>{item.address}</Table.Cell>
                          <Table.Cell>
                            <Button positive onClick={() => {this.onClickWriteReview(item)}}>Write review</Button>
                          </Table.Cell>
                        </Table.Row> )})
              }
                
              </Table.Body>
            </Table>

            <ReviewDisplayModal info={this.state.curSelItem} isOpenDialog={this.state.isOpenReviewDisplayModal}
                  onCloseDialog={() => {this.setState({isOpenReviewDisplayModal: false})}}/>
            
            <WriteReviewModal info={this.state.curSelItem} isOpenDialog={this.state.isOpenWriteReviewModal}
                  onCloseDialog={() => {this.setState({isOpenWriteReviewModal: false})}}/>
          </div>
        </div>
      </main>
    )
  }
}

const mapStatetoProps = state => ({
  data: state.common
})

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(CommonAction, dispatch),
})

export default connect(mapStatetoProps, mapDispatchToProps)(ClientHome)
