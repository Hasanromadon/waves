const express = require('express');
const router = express.Router();
const authRoute = require('./auth.route');

 const routeIndex = [{
     path : '/auth',
     route : authRoute
 }];

 routeIndex.forEach((route)=> {
     router.use(route.path, route.route)
 })



module.exports = router;