import React, { Component } from 'react'
import { Header, Segment, Grid, List, Input, Form, Label, Rating, Button } from 'semantic-ui-react'
import ReCAPTCHA from "react-google-recaptcha";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CommonAction from 'components/Action/CommonAction'


const leftListStyle = {
  maxHeight: 577,
  minHeight: 577,
  overflowY: 'scroll',
  marginTop: 20
};
const rightStyle = {
  maxHeight: 700,
  minHeight: 700,
  overflowY: 'scroll',
  marginTop: 20
};

class CompanyDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {};

    console.log(this.props);

    this.state.curAddProductName = "";

    this.state.reviews = [];
  }

  showReviewItemEditable(item) {
    return (
      <List.Item key={JSON.stringify(item)}>
        <Form>
          <Form.Field inline>
            <label>Rating: </label>
            <Rating icon='star' defaultRating={0} maxRating={5} 
                    onRate={(e, data) => {item.rating = data.rating;}}/>
          </Form.Field>
          
          <Form.Field inline>
            <label>Review: </label>
            <pre>{item.review}</pre>
          </Form.Field>
                    
          <Form.Field inline>
            <label>Status: </label>
            <label>Pending</label>
          </Form.Field>

          <Form.Group inline>
            <label>Status</label>
            <Form.Radio
              label='Positive'
              value='1'
              checked={item.status === '1'}
              onChange={() => {item.status = 1;}}
            />
            <Form.Radio
              label='Negative'
              value='-1'
              checked={item.status === '-1'}
              onChange={() => {item.status = 1;}}
            />
          </Form.Group>

          <Form.TextArea label='Reply: ' placeholder='Write your reply...' />
          
          <Grid>
            <Grid.Column width={10}>
              <ReCAPTCHA
                sitekey="6LeSql0UAAAAAIpM4Z9GBPUtV_AOQcK9Vvrz838O"
                onChange={(value) => {this.state.rateInfo.recaptcha = value}}/>
            </Grid.Column>
            <Grid.Column width={6} textAlign='right' verticalAlign='middle'>
              <Button primary onClick={() => {this.onClickPostBtn(item)}}>Post</Button>
            </Grid.Column>
          </Grid>
        </Form>
      </List.Item>
    )
  }

  showReviewItem(item) {
    return (
      <List.Item key={JSON.stringify(item)}>
        <Form>
          <Form.Field inline>
            <label>Rating: </label>
            <Rating icon='star' defaultRating={item.rating} maxRating={5}  disabled/>
          </Form.Field>
          
          <Form.Field inline>
            <label>Review: </label>
            <pre>{item.review}</pre>
          </Form.Field>
                    
          <Form.Field inline>
            <label>Status: </label>
            {item.status == 1 ? 
              <Label color='teal' horizontal>Positive</Label> : 
              <Label color='red' horizontal>Negative</Label>}
            
          </Form.Field>
          
          {item.status == -1 ? 
          <Form.Field inline>
            <label>Reply: </label>
            <p>{item.reply}</p>
          </Form.Field> : ''}
        </Form>
      </List.Item>
    )
  }

  onClickAddProduct() {
    if (!this.state.curAddProductName) return;

    /*
      product_id: product_id.toNumber(),
      company_id: company_id.toNumber(),
      product_name: product_name
      */

    
    var addProductId = this.props.data.blockchainData.productData.length + 1;

    this.props.onaddProduct({
      product_id: addProductId,
      company_id: this.props.company.id,
      product_name: this.state.curAddProductName
    });

    console.log(this.props.data.blockchainData);
//    alert(this.state.curAddProductName);
    this.setState({curAddProductName: ""})
  }

  onSelectProduct(value) {
    /*
    let obj = {
      review_id: review_id.toNumber(),
      user_id: user_id.toNumber(),
      product_id: product_id.toNumber(),
      company_id: company_id.toNumber(),
      rating: rating.toNumber(),
      review: review,
      is_spam: is_spam,// ? "YES" : "NO",
      review_status: review_status.toNumber(),
      reply: reply
    }
    */
    var curReviewData = [];
    
    var company_id = this.props.company.id;
    var product_id = 1;

    this.props.data.blockchainData.reviewData.map((value, index) => {
      if (value.company_id != company_id || value.product_id != product_id) return;

      curReviewData.push(value);
    });

    this.setState({reviews: curReviewData});
  }

  onClickPostBtn(item) {
    alert(JSON.stringify(item));
  }

  render() {
    if (this.props.data.blockchainData.productData == undefined)
      return (<div></div>);
      
    return(
      <main className="container">
        <Grid>
            <Grid.Column width={6}>
              <Segment style={leftListStyle}>
                <List divided relaxed ordered size="big">
                  {this.props.data.blockchainData.productData.map((value, index) => 
                    <List.Item as='a' key={index}>
                      <List.Content>
                        <List.Header onClick={() => {this.onSelectProduct(value)}}>{value.product_name}</List.Header>
                      </List.Content>
                    </List.Item>
                  )}
                </List>
              </Segment>
              <Segment>
                <Form>
                    <Form.Field inline>
                        <Label>New Product Name: </Label>
                        <Input fluid focus placeholder='Product Name...'
                             icon={{ name: 'plus', circular: true, link: true, 
                             onClick:() => { this.onClickAddProduct() }}}
                             value={this.state.curAddProductName}
                             onChange={(event, value) => {this.setState({curAddProductName: value.value})}}/>
                    </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={10} style={rightStyle}>
              <Segment>
                <List divided relaxed ordered size="big">
                  {this.state.reviews.map((item, index) => {
                    if (item.status == 0)
                      return this.showReviewItemEditable(item);
                    else
                      return this.showReviewItem(item);
                  })}
                </List>
              </Segment>
            </Grid.Column>
        </Grid>
      </main>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    data: state.common,
    company: state.user.data
  }
}

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(CommonAction, dispatch),
  onaddProduct: (product_obj) => {
    dispatch(CommonAction.addProduct(product_obj))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard)