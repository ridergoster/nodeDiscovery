var loopback = require('loopback');

module.exports = function(Booking) {
  var Car = require('./car.js');
  Booking.beforeRemote('create', function( ctx, booking, next) {
    booking = ctx.req.body;
    booking.ownerId = ctx.req.accessToken.userId;
    Booking.find({ where : {carId: booking.carId} }, function(err, res) {
      if(res) {
        var dateStart = new Date(booking.dateStart);
        var dateEnd = new Date(booking.dateEnd);

        res.forEach(function(otherBooking) {
          var otherDateStart = new Date(otherBooking.dateStart);
          var otherDateEnd = new Date(otherBooking.dateEnd);
          if(
            (dateStart >= otherDateStart && dateStart <= otherDateEnd) ||
            (dateEnd >= otherDateStart && dateEnd <= otherDateEnd) ||
            (dateStart <= otherDateStart && dateEnd >= otherDateEnd)
          ) {
            var err = new Error('This car is already taken during those date');
            err.status = 403;
            next(err);
          }
        });
        next();
      } else {
        next(new Error('SERVER ERROR'));
      }
    });
  });

  Booking.myBooking = function(callback) {
    var ctx = loopback.getCurrentContext();
    var userId = ctx.get('accessToken').userId;
    console.log(userId);
    Booking.find(
      {
        where:
        {
          ownerId: userId
        }
      }, function(err, res) {
      if(err) {
        callback(err, null);
      } else {
        callback(null,res);
      }
    });
  };

  Booking.remoteMethod('myBooking', {
    http: {path: '/owner', verb: 'get'},
    returns: {arg: 'bookings', type: 'array'}
  });

  Booking.disableRemoteMethod('prototype.updateAttributes', true);
  Booking.disableRemoteMethod('createChangeStream', true);
};
