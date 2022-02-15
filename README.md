## Introduction

This project is meant to test out the `OAuth2` & `OpenID Connect` protocol, and how it can be used.

## Description

This project is straight forward and wanted achieve 2 things (which has been tested and worked):

1. Authorization Flow

    - Access Google API from Vue Application using OAuth2 Access Token

2. Using OpenID Connect

    - Access Backend with from Vue Application using OAuth2 ID Token proper verification done by [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs)

## Credits & References

- [Library with Code Sample from Vue3 Google OAuth2 Guruahn](https://github.com/guruahn/vue3-google-oauth2)
- [https://stackoverflow.com/questions/48153269/should-i-send-the-id-token-from-my-spa-to-my-rest-backend](https://stackoverflow.com/questions/48153269/should-i-send-the-id-token-from-my-spa-to-my-rest-backend)
- [https://developers.google.com/identity/sign-in/web/backend-auth](https://developers.google.com/identity/sign-in/web/backend-auth)
- [https://developers.google.com/identity/one-tap/android/idtoken-auth](https://developers.google.com/identity/one-tap/android/idtoken-auth)

<aside>
💡 When ID tokens are available, you can use them to securely authenticate with your app's backend, or to automatically sign up the user for a new account without the need to verify the user's email address.

</aside>

## Author

> Chris Legaxy/Chris Van
> 
> Contact: chris.legaxy@gmail.com | chrisvan.vshmr@gmail.com
> 
> Website: https://chrisvan.netlify.app
