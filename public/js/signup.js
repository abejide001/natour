import axios from "axios"
import { showAlert } from "./alert"

export const signUp = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/auth/sign-up",
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        })
        if (res.data.status === "success") {
            showAlert("success", "Signed up successfully")
            window.setTimeout(() => {
                location.assign("/")
            }, 1500)
            return
        }
    } catch (error) {
        showAlert("error", error.response.data.message)
    }
}
