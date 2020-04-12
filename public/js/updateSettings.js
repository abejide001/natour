import axios from "axios"
import { showAlert } from "./alert"

export const updateSettings = async (data, type) => {
    try {
        const url = type === "password" ? "http://localhost:3000/api/v1/users/update-password" : "http://localhost:3000/api/v1/users/update-me"
        const res = await axios({
            method: "PATCH",
            url,
            data
        })
        if (res.data.status === "success") {
            showAlert("success", `${type} updated succesfully`)
        }
    } catch (error) {
        showAlert("error", error.response.data.message)
    }
}