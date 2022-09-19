import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51LjHWKJ1wbp1eZO6zqG5EvplAbZSEXwNNI5MtTAR6AZfRSUILagFtliCF1I3xbQuFiTQmjjutufO5bW3iP8JOqvb00EwN2WEIW"

//create stripe promise variable
const stripePromise = loadStripe(PUBLIC_KEY)
const StripeContainer = () => {
  return (
    //wrap the paymentform component inside the elements component and pass the stripepromise variable as a prop to it
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
  )
}

export default StripeContainer