import axios from "axios"
import { showAlert } from "./alert"

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/auth/sign-in",
            data: {
                email,
                password
            }
        })
        if (res.data.status === "success") {
            showAlert("success", "logged in successfully")
            window.setTimeout(() => {
                location.assign("/")
            }, 1500)
        }
    } catch (error) {
        showAlert("error", error.response.data.message)
    }
}

export const logout = async () => {
    try {
        const res = await axios({
            method: "GET",
            url: "/api/v1/auth/sign-out",
        })
        if (res.data.status === "success") {
            location.reload(true) // fresh reload
            location.assign("/")
        }
    } catch (error) {
        showAlert("error", "Error logging out, try again")  
    }
}