const AccessControl = require('accesscontrol');

const allRights = {
  'create:any': ['*'],
  'read:any': ['*'],
  'update:any': ['*'],
  'delete:any': ['*'],
};

const grantsObject = {
  admin: {
    profile: allRights,
    brand: allRights,
  },
  user: {
    profile: {
      'read:own': ['*', '!password', '!_id'],
      'update:own': ['*'],
    },
    brand: { 'read:any': ['*'] },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };