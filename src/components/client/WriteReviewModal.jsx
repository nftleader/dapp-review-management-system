import React from 'react'
import { Button, Header, Modal, List, Rating, Form, Label } from 'semantic-ui-react'
import ReCAPTCHA from "react-google-recaptcha";

class WriteReviewModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.state.rateInfo = {
            rating: 0,
            review: "",
            recaptcha: "",
        };
    }

    onPostReview() {
        alert(JSON.stringify(this.state.rateInfo));
    }

    render() {
        return (
            <Modal className="writereviewmodal" trigger={<Button positive>Write review</Button>} centered={false}>
                <Modal.Header>Write Review</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Product Info</Header>
                        <p as='h5'>Product Name: {this.props.info.product}</p>
                        <p as='h5'>Company Name: {this.props.info.company}</p>
                        <p as='h5'>Company Address: {this.props.info.address}</p>

                        <hr></hr>

                        <Form>
                            <Form.Field inline>
                                <label>Your Rating: </label>
                                <Rating icon='star' defaultRating={0} maxRating={5} onRate={(e, data) => {this.state.rateInfo.rating = data.rating;}}/>
                            </Form.Field>
                            <Form.TextArea label='Your Review' placeholder='Tell us more about you...'
                                onChange={(e, data) => {this.state.rateInfo.review = data.value}}/>
                            <ReCAPTCHA async
                                sitekey="6LeSql0UAAAAAIpM4Z9GBPUtV_AOQcK9Vvrz838O"
                                onChange={(value) => {this.state.rateInfo.recaptcha = value}}/>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative content='Close' />
                    <Button positive icon='checkmark' labelPosition='right' content='Post Review' onClick={() => this.onPostReview()}/>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default WriteReviewModal;