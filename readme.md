<h1>
  <img height="27" src="https://user-images.githubusercontent.com/11488762/27016999-f7d81054-4ef2-11e7-8572-dfcc24071940.png">
  Swagger Auto Login
</h1>

> A chrome extension to add an auto login button to swagger ui

<img src="https://user-images.githubusercontent.com/11488762/27017908-3420e2c8-4efa-11e7-9d41-78910322adfd.jpg">

## Installation

1. Download or clone this repository.
2. Go to `Settings > Extensions` in Chrome.
3. Make sure Developer mode is enabled.
4. Click `Load unpacked extension...`.
5. Select the directory where you saved this project.

## Getting Started

Clicking this extension's icon brings up a popup where you can enter your username and password.

After saving your credentials you can click the 'Log In' button which has now been added to swagger ui pages to have the extension automatically set your auth token.


## Important Note
This currently only works if the endpoint for getting your auth token is `/auth/login`. It also assumes that the response is in the form of
```json
{
    "token": "ey......"
}
```

This is because it is what I need right now. However, this should be very easy to customize if needed, just have a look at the source.
