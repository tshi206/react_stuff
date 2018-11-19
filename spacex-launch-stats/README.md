## How can I deploy/push only a subdirectory of my git repo to Heroku?

https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku

#
There's an even easier way via git-subtree. Assuming you want to push your folder 'output' as the root to Heroku, you can do:
```
git subtree push --prefix output heroku master
```
It appears currently that git-subtree is being included into git-core, but I don't know if that version of git-core has been released yet.

### Important Note
You need to run the above command from the top-level of the working tree (i.e., the top-level of your git repo dir).

### Visit The App
```
heroku open
```