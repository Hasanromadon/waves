const express = require('express');

const router = express.Router();
const authRoute = require('./auth.route');
const usersRoute = require('./users.route');
const brandsRoute = require('./brand.route');

const routeIndex = [{
  path: '/auth',
  route: authRoute,
},
{
  path: '/users',
  route: usersRoute,
},
{
  path: '/brands',
  route: brandsRoute,
},
];

routeIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
