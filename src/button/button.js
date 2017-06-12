var isSwaggerPage = document.getElementsByClassName('swagger-section').length > 0

// only inject the button to pages
// which contain the swagger ui
if (isSwaggerPage) {
    injectLoginButton()
}

var button, username, password

// get the saved auth credentials
chrome.storage.sync.get('sal', function (storage) {
    username = storage.sal.username
    password = storage.sal.password
})

// listen for changes to the auth credentials
chrome.storage.onChanged.addListener(function (changes) {
    username = changes.sal.newValue.username
    password = changes.sal.newValue.password
})

/**
 * Inject the Login button to the page.
 */
function injectLoginButton () {
    // inject the button
    var html = document.createElement('div')
    html.innerHTML = '<button id="sal-button" type="button"></button>'
    document.body.appendChild(html)

    button = document.getElementById('sal-button')
    setButtonState('ready')

    // register click handler
    button.onclick = function () {
        logIn()
    }
}

/**
 * Perform the login.
 */
function logIn () {
    setButtonState('loading')

    var xhr = new XMLHttpRequest()
    xhr.open('POST', '/auth/login', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // find the auth token
            var response = JSON.parse(this.responseText)
            var token = response.token

            // auto set the auth token in the ui
            var input = document.getElementById('input_apiKey')
            input.value = 'bearer ' + token

            // force swagger to register the change
            var event = new Event('change')
            input.dispatchEvent(event)

            setButtonState('ready')
        } else if (this.readyState == 4) {
            setButtonState('error')
        }
    }

    xhr.send(JSON.stringify({ username: username, password: password }))
}

/**
 * Set the state of the button.
 *
 * @param {String} state
 */
function setButtonState (state) {
    switch (state) {
        case 'ready':
            button.classList.remove('sal-error')
            button.innerHTML = 'Log In'
            break
        case 'loading':
            button.classList.remove('sal-error')
            button.innerHTML = '<div id="sal-spinner"></div>'
            break
        case 'error':
            button.classList.add('sal-error')
            button.innerHTML = 'Try Again'
            break
    }
}
