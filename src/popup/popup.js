document.addEventListener('DOMContentLoaded', function() {
    var usernameInput = document.getElementById('username')
    var passwordInput = document.getElementById('password')
    var saveButton = document.getElementById('saveButton')

    // preset the form with saved values
    useCredentials(function (username, password) {
        usernameInput.value = username
        passwordInput.value = password
    })

    registerEventHandlers()

    /**
     * Register the event handlers.
     *
     * @return {void}
     */
    function registerEventHandlers () {
        saveButton.onclick = function () {
            chrome.storage.sync.set({
                sal: {
                    username: usernameInput.value,
                    password: passwordInput.value,
                }
            })

            window.close()
        }

        usernameInput.onkeyup = checkForChanges
        passwordInput.onkeyup = checkForChanges
    }

    /**
     * Check for changes against the saved values.
     *
     * @return {void}
     */
    function checkForChanges () {
        useCredentials(function (username, password) {
            if (usernameInput.value !== username || passwordInput.value !== password) {
                saveButton.classList.add('enabled')
            } else {
                saveButton.classList.remove('enabled')
            }
        })
    }

    /**
     * Use the existing credentials and perform an action with them.
     *
     * @param  {Function} callback
     * @return {void}
     */
    function useCredentials (callback) {
        chrome.storage.sync.get('sal', function (storage) {
            callback(storage.sal.username, storage.sal.password)
        })
    }
})

