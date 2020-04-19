export const PRE_AUTHENTICATED_STATE = {
    authenticating: false,
    authenticated: false,
    paying: false,
    paid: false,
    configuring: false,
    configured: false
}

export const AUTHENTICATING_STATE = {
    authenticating: true,
    authenticated: false,
    paying: false,
    paid: false,
    configuring: false,
    configured: false
}

export const AUTHENTICATED_STATE = {
    authenticating: false,
    authenticated: true,
    paying: false,
    paid: false,
    configuring: false,
    configured: false
}

export const PAYING_STATE = {
    authenticating: false,
    authenticated: true,
    paying: true,
    paid: false,
    configuring: false,
    configured: false
}

export const PAID_STATE = {
    authenticating: false,
    authenticated: true,
    paying: false,
    paid: true,
    configuring: false,
    configured: false
}

export const CONFIGURING_STATE = {
    authenticating: false,
    authenticated: true,
    paying: false,
    paid: true,
    configuring: true,
    configured: false
}

export const CONFIGURED_STATE = {
    authenticating: false,
    authenticated: true,
    paying: false,
    paid: true,
    configuring: false,
    configured: true
}
