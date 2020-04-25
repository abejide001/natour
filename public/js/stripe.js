import axios from "axios"
import { showAlert } from "./alert"

const stripe = Stripe("pk_test_EEcCmJQmGxIy0KPppuL3i38F00puePZync")

export const bookTour = async tourId => {
    try {
        const session = await axios(`http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`)
        await stripe.redirectToCheckout({
            sessionId: session.data.data.id
        })
    } catch (error) {
        showAlert("error", error)
    }
    
}