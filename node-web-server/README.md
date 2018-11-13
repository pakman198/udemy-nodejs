# Node Web Server App

This app is a nested folder from a repo

```
--/
----/.git
----/node-web-server
----/notes
----/weather-app
```
To be able to deploy it to HEROKU we need to type one command, but we 
need to be at the top level of our repo:

`git subtree push --prefix node-web-server heroku master`

