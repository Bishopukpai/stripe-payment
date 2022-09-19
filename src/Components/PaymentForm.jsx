import React, {useState} from 'react'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "black"
		}
	}
}
const PaymentForm = () => {
    //create a success state and a setSuccess function that will check if the payment was successful
    const [success, setSuccess] = useState(false)

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        //Create a paymentMethod variable and pass a type of card, so that your application can accept card for payment
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 1000,
                    id
                })

                if(response.data.success){
                    console.log('Successful Payment')
                    setSuccess(true)
                }
            } catch (error) {
                console.log('Error:', error)
            }
        }else{
            console.log(error.message)
        }
    }
  return (
    <>
        {!success ? <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardNumberElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardExpiryElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardCvcElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>MAKE PAYMENT</button>
        </form>: 
        <div><h2>You Just made Your Payment</h2></div>}
    </>
  )
}

export default PaymentForm