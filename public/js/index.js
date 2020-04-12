import "@babel/polyfill"
import { login, logout } from "./login"
import { updateSettings } from "./updateSettings"
import { displayMap } from "./mapbox"

const loginForm = document.querySelector(".form")
const mapBox = JSON.parse(document.getElementById("map"))
const logOutBtn = document.querySelector(".nav__el--logout")
const userDataForm = document.querySelector(".form-user-data")
const userPasswordForm = document.querySelector(".form-user-settings")

if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        login(email, password)
    })
}

if (mapBox) {
    const locations = JSON.parse(document.getElementById("map").dataset.locations)
    displayMap(locations)
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", logout)
}

if (userDataForm) {
    userDataForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = document.getElementById("email").value
        const name = document.getElementById("name").value
        console.log(email, name)
        updateSettings({ name, email }, "data")
    })
}

if (userPasswordForm) {
    userPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        document.querySelector(".btn--save-password").textContent = "Updating..."

        const passwordCurrent = document.getElementById("password-current").value
        const password = document.getElementById("password").value
        const passwordConfirm = document.getElementById("password-confirm").value
        await updateSettings({ passwordCurrent, password, passwordConfirm }, "password")

        document.querySelector(".btn--save-password").textContent = "Save Password"
        document.getElementById("password-current").value = ""
        document.getElementById("password").value = ""
        document.getElementById("password-confirm").value = ""
    })
}
