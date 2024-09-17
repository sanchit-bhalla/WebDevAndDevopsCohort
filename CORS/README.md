[Slides](https://petal-estimate-4e9.notion.site/cors-Cross-origin-resource-sharing-e629aed258c04a669cbe2de1f13a9ac3)

# cors - Cross origin resource sharing

**Cross-Origin Resource Sharing (CORS)** is a security feature implemented by web browsers that controls how resources on a web server can be requested from another domain. It's a crucial mechanism for managing `cross-origin` requests and ensuring secure interactions between `different origins` on the web.

### Suppose our server is running on port 3000 and if we serve index.html on some other port, we will see cors error. Check above slides for more clarity
To avoid this, we use `cors middleware`
- `app.use(cors())`


## You dont need `cors` if the frontend and backend are on the same domain

- Try serving the frontend on the same domain
```jsx
const express = require("express");
const app = express();

app.get("/sum", function(req, res) {
    // some code
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000);
```

- Go to [`localhost:3000`](http://localhost:3000) , notice that the underlying request doesnt fail with `cors` (even though we don’t have the cors middleware)