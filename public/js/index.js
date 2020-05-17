import "@babel/polyfill"
import { updateSettings } from "./updateSettings"
import { displayMap } from "./mapbox"
import { bookTour } from "./stripe"
import { signUp } from "./signup"
import { login, logout } from "./login"

const signupForm = document.querySelector(".sign-up-form")
const loginForm = document.querySelector(".login-form")
const mapBox = JSON.parse(JSON.stringify(document.getElementById("map")))
const logOutBtn = document.querySelector(".nav__el--logout")
const userDataForm = document.querySelector(".form-user-data")
const userPasswordForm = document.querySelector(".form-user-settings")
const bookBtn = document.getElementById("book-tour")

if (signupForm) {
    signupForm.addEventListener("submit", e => {
        e.preventDefault()
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const passwordConfirm = document.getElementById("passwordConfirm").value
        return signUp(name, email, password, passwordConfirm)
    })
}

if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        return login(email, password)
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
        const form = new FormData()
        form.append("name", document.getElementById("name").value)
        form.append("email", document.getElementById("email").value)
        form.append("photo", document.getElementById("photo").files[0])
         updateSettings(form, "data")
    })
}

if (userPasswordForm) {
    userPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        document.querySelector(".btn--save-password").textContent = "Updating..."

        const password = document.getElementById("password-current").value
        const newPassword = document.getElementById("password").value
        const passwordConfirm = document.getElementById("password-confirm").value
        await updateSettings({ password, newPassword, passwordConfirm }, "password")

        document.querySelector(".btn--save-password").textContent = "Save Password"
        document.getElementById("password-current").value = ""
        document.getElementById("password").value = ""
        document.getElementById("password-confirm").value = ""
    })
}

if (bookBtn) {
    bookBtn.addEventListener("click", e => {
        e.target.textContent = "Processing"
        const { tourId } = e.target.dataset
        bookTour(tourId)
    })
}
