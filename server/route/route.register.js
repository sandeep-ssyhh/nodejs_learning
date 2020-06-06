const routeRegister = require('../controller/register'); // importing register controller.

const express=require('express');

const route =express.Router();

route.post('/',routeRegister.insertUserDetails); // api to create category.

route.get('/',routeRegister.getUserDetails); // api to read category.

route.get('/:id',routeRegister.getUserDetailsById); // api to read category by id.

route.put('/:id',routeRegister.updateUserDetails); // api to update category by id.

route.delete('/:id',routeRegister.deleteUserDetails); // api to remove category by id.

module.exports= route;