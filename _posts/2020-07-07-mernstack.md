---
title: "MERN Stack CRUD Operations Application"
date: 2020-07-07
tags: [mysql, express.js, react.js, node.js]
header:
  image: "/images/ReactBanner.jpg"
excerpt: "FullStack, Development, Application, MERN"
mathjax: "true"
---

# M.E.R.N


### MySQL - Express.js - React.js - Node.js

## Express.js

[Express](https://expressjs.com/) stands as an extremely flexible backend framework. Communicating with the front end client doesnt take much minipulation from the developer. While laying a framework for Node.js, it develops a fast and minimalist version of an un-opinionated modern application.
```python
var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", function(req, res, next) {
  models.User.findAll().then(users => res.json(users));
});

router.post("/", function(req, res, next) {
  let newUser = new models.User();
  newUser.FirstName = req.body.FirstName;
  newUser.LastName = req.body.LastName;
  newUser.Username = req.body.Username;
  newUser.Password = req.body.Password;
  newUser.save().then(user => res.json(user));
});
"development": {
    "username": "root",
    "password": "Password1!",
    "database": "elitecamp",
    "host": "localhost",
    "dialect": "mysql",
    "define": { "timestamps" : false }
  },
  module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      FirstName: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
```

## MySQL 

Setting up your application using [MySQL](https://dev.mysql.com/downloads/installer/) as your database management tool. Combining with the [Sequelize CLI](https://github.com/sequelize/cli) creates a seemless way to integrate data to and from your application

```python
    sequelize init
```

Generates Three Folders:
1. models - contains an index.js file
2. migrations - contains no files
3. seeders - contains no files

In the case you database is already populated by utilizing the CLI you can generate a model file that is prepoulated with all of the table data that is requested.

```python
    sequelize-auto -h "IP/Hostname for the database (required)" -d "Database name (required)" -u "Username for database" -x "Password for database" -o "What directory to place the models" -t "Comma-separated names of tables to import"
```

While Utilizing the previously installed Sequelize running your server 
```python
npm start
```
 (or using [nodemon](https://www.npmjs.com/package/nodemon)), will populate tables with any data defined in the models folder into the database your project is sync'd up to.

 In the case you dont want to write your models by hand check out -
 ```python
 npx sequelize-cli model:generate --name "Table Name" --attributes "Defined objects, i.e."row name":integer or "row name":string
 ```
## Node.js

Another library from JavaScript, [Node.js](https://nodejs.org/en/) proves itself extremely valuable in this stack application. The development environment Node provides allows easy implementation of routing. By using the "app" object corresponding to HTTP Express provides the route is then defined by using the methods of the "app" object. Once the request is received the object specifies a callback function.
```python
var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", function(req, res, next) {
  models.User.findAll().then(users => res.json(users));
});
```

## React 

Chosing [React](https://reactjs.org/docs/getting-started.html) For the front end framework set out to be a challenging pursuit. Although this project only breaks the surface of its potential, it shows how well it works within this MERN stack application  when utilizing the four CRUD operations. One extremely significant feature that is important to point out is the ability to create and store a function with the ability to call it at any time in any component as long at the imported location is accurate. Creating views or components that can communicate with the controller with React take a moment to wrap your head around especially when it is a single page application. The components built in the client side will eventually be imported into one file and pushed into the single html file which in turns displays the user interface, these files are rendered with the help of JSX. Although there is many similarities to javascript it is slightly altered, so it is important to study up on those differences. With that being said, it is important to focus on the request function going to the controller but learning how to write the necessary JSX to push and pull to the database can be the real obstacle.
``` python
<div className="form-group">
<label htmlFor="address" className="h5 mr-3 font-weight-normal">
Address:
</label>
<input type="text"
className="form-control"
name="address"
placeholder="Address"
ref={this.campAddress}/>
</div>
<div className="form-group">
<label htmlFor="waterAccess" className="h5 mr-3 font-weight-normal">
Water Access
</label>
<input type="checkbox"
className="checkbox"
name="waterAccess"
checked={this.state.campWater}
onChange={this.campWaterToggle}/>
</div>
```

### CheckBoxes

Inputs can be challenging to work with, and when they dictate a true or false entry into a database the science becomes finicky to say the least. Though it is tuough to explain, setting up the request function to obtain the state of the check box is the first hurdle. 
```python
addCampground = () => {
    let url = "http://localhost:3001/campgrounds";
    axios.post(url, {
      campgroundName: this.campName.current.value,
      address: this.campAddress.current.value,
      waterAccess: this.state.campWater,
      wildLife: this.state.campWild,
      ET: this.state.campET,
      trails: this.state.campTrails,
      restrooms: this.state.campRestrooms
    }).then(response => {
```
I mentioned earlier that the request function is important but the conclusion I came to was understanding the JSX involved proved to be the more important lesson to study. First wiring up the inputs to report their current state is careful work, but once you get one working the rest pile up quickly with simple copy, paste and changes to the names they correspond with.
```python
<label 
htmlFor="address" 
className="h5 mr-3 font-weight-normal">
{p.address}
</label>

<br />

<label  className="h6 mr-3">
<input type="checkbox"
name="waterAccess"
checked={p.waterAccess}
readOnly/>
Water Access
</label>
```
Above is a readOnly input, it is not available for selection. However for manipulable inputs you will see a 
```python
</label>
<input type="checkbox"
className="checkbox"
name="waterAccess"
checked={this.state.campWater}
onChange={this.campWaterToggle}/>
</div>
```
in addition to...
```python
campWaterToggle = (evt) => {
    this.setState({
      campWater: !this.state.campWater
    });
    console.log(!this.state.campWater)
  }
  ```
### Presentation
![alt]({{ site.url }}{{ site.baseurl }}/images/AllCamp2.jpg)




