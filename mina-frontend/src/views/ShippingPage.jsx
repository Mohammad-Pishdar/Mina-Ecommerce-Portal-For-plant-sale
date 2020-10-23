import React from 'react'
import CheckoutSteps from '../components/checkoutSteps'

export default function ShippingPage() {
    return (
        <div>
            {/* we import checkout steps component here and set steps 1 and 2 to true because this is the second step of the checkout process */}
            <CheckoutSteps step1 step2></CheckoutSteps>
        </div>
    )
}
