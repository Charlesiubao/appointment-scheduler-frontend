
const signUpScreen = document.querySelector('.signUpScreen')
const signUpForm = document.querySelector('.signup-form')

const loginScreen = document.querySelector('.loginScreen')
const dashboard = document.querySelector('.dashboard')

const switchToDash = () => {
    dashboard.classList.remove('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.add('hidden')
    let patientName = document.querySelector('.patientName')
    let patientsName = localStorage.getItem('patientName')
    if(patientsName !== undefined) {
        patientName.innerText = patientsName
    }
}

const switchToLogin = () => {
    dashboard.classList.add('hidden')
    signUpScreen.classList.add('hidden')
    loginScreen.classList.remove('hidden')
}
let signUpButton= document.querySelector('.signUpButton')
const switchToSignUp = () => {
    dashboard.classList.add('hidden')
    signUpScreen.classList.remove('hidden')
    loginScreen.classList.add('hidden')
}
signUpButton.addEventListener('click', () => {
    switchToSignUp()
})


signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.querySelector('#signup-name').value
    const email = document.querySelector('#signup-email').value
    const password = document.querySelector('#signup-password').value


    try {
        const response = await axios.post('http://localhost:3001/patient', {
            name: name,
            email: email,
            password: password
        })
        console.log(response)
        const patientId = response.data.patient.id
        console.log(patientId)
        const patientName = response.data.patient.name
        localStorage.setItem('patientId', patientId) 
        localStorage.setItem('patientName', patientName) 
    } catch (error) {
        console.log(error)
    }
    switchToLogin()
})

const loginForm = document.querySelector('.login-form')
loginForm.addEventListener('submit',async (e) => {
    e.preventDefault()

    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value

    try {
        const response = await axios.post('http://localhost:3001/patient/login', {
            email: email,
            password: password
    })
    console.log(response)
    const patientId = response.data.id
    const patientName = response.data.name
    localStorage.setItem('patientName', patientName)
    localStorage.setItem('patientId', patientId)
    switchToDash() 
    } catch (error) {
        console.log(error)
        alert(error)
    }
})


const loginButton = document.querySelector('.loginButton')
loginButton.addEventListener('click', () => {
    switchToLogin()
})
const logoutButton = document.querySelector('.signOutButton')
logoutButton.addEventListener('click', () => {
    logout()
})
const logout = () => {
    localStorage.clear()
    authCheck()
}

const authCheck = () => {
    const patientId = localStorage.getItem('patientId')
    if (patientId) {
        let patientName = document.querySelector('.patientName')
        let patientsName = localStorage.getItem('patientName')
        patientName.innerText = patientsName
        switchToDash()
    } else {
        switchToLogin()
    }
}
authCheck()