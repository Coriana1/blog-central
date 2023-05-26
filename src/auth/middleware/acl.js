'use strict';

// Role-based Access Control
// purpose: check if an authenticated user has the required capabilities to perform a certain action 

module.exports = (capability) => { // `capability` refers to user cap to read,write,delete,etc  

  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};