#How to set Heroku remote to a different name?

https://stackoverflow.com/questions/6226846/how-to-change-a-git-remote-on-heroku

If you're working on the heroku remote (default):
```
heroku git:remote -a [app name]
```
If you want to specify a different remote, use the -r argument:
```
heroku git:remote -a [app name] -r [remote]
``` 