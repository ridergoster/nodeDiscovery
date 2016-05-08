module.exports = function(app) {
var User = app.models.User;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;


User.create(
  {
    username: 'Admin',
    email: 'admin@bookingscar.com',
    password: 'bookingscar'
  }, function(err, user) {
    if (err) {
      return true;
    }
    console.log(user);
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) {
        console.log(err);
      }
      console.log(role);
      // Make Admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: user.id
      }, function(err, principal) {
        if (err) {
          console.log(err);
        }
        console.log(principal);
      });
    });
  });
};
