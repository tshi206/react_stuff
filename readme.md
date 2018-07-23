npx create-react-app myapp might not work in the following case:
-
- For Windows, if your npx is installed in default path then make sure the path does not contain spaces.
- If you do have spaces in your npx path, then run npx directly will raise error.
- Instead, you should specify the full path of npx to run it and you also need to put the entire path in quotes in order to cope with spaces, example is like:

---
```
"C:\Users\My User Name\AppData\Roaming\npm\npx.cmd" create-react-app MyApp
```