const errorCodes = {
    'UsernameExistsException': {
        'en-CA': 'Email already exists. Try logging in.'
    },
    'NotAuthorizedException': {
        'en-CA': 'Incorrect username or password'
    },
    'LimitExceededException': {
        'en-CA': 'Attempt limit exceeded, please try after some time'
    },
    'UserNotFoundException': {
        'en-CA': 'User does not exist'
    }
}

module.exports = {
    errorCodes
}