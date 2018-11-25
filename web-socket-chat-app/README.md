# Heroku with Socket.io
Apps deployed on Heroku using socket.io will new to have the remote enabled the "http-session-affinity"
# Using heroku cli in terminal:
Simply run the following
```
heroku features:enable http-session-affinity
```
To specify a particular remote (e.g., when multiple heroku remotes exist)
```
heroku features:enable http-session-affinity --remote <remote_name>
```
To see all git remotes:
```
git remote -v
```