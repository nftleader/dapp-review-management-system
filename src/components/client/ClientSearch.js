import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CommonAction from 'components/Action/CommonAction'

class ClientSearch extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {};

    this.state.searchKey = "";
  }

  onClickSearch() {
      this.props.action.searchAction(this.state.searchKey);
      this.props.router.push("/client_home");
  }

  render() {
    return(
      <main className="container">
        <div className="row">
          <div className="col-md-12">
            <Input icon={{ name: 'search', circular: true, link: true, onClick:() => this.onClickSearch() }} placeholder='Search...'
                    onChange={(event, value) => { this.state.searchKey = value.value }}/>
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

export default connect(mapStatetoProps, mapDispatchToProps)(ClientSearch)