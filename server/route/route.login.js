const routeLogin = require('../controller/login'); // importing login controller.

const express=require('express');

const route =express.Router();

route.post('/',routeLogin.loginUserDetails); // api to create category.
module.exports= route;