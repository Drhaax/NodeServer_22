import React, { Component } from "react"
import ReactStripeCheckout  from 'react-stripe-checkout'
import * as actions from '../actions'
import { connect } from 'react-redux'

class Paymemnts extends Component {
	render(){
		return(
			<ReactStripeCheckout 
				name="Emaily"
				description="5e for 5 credits"
				amount={500}
				token={token => {
					this.props.handleToken(token);
				}}
				stripeKey={process.env.REACT_APP_STRIPE_KEY} 
			>
				<button className="btn">Add Credits</button>
			</ReactStripeCheckout>
		);
	}
}

export default connect(null, actions)(Paymemnts);