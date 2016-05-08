// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';
var module = angular.module("lbServices", ['ngResource']);

module.factory(
  "User",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Users/:id",
      { 'id': '@id' },
      {
        "prototype$__findById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "GET"
        },
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "DELETE"
        },
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/:fk",
          method: "PUT"
        },
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Users/:id/accessTokens",
          method: "GET"
        },
        "prototype$__create__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "POST"
        },
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens",
          method: "DELETE"
        },
        "prototype$__count__accessTokens": {
          url: urlBase + "/Users/:id/accessTokens/count",
          method: "GET"
        },
        "create": {
          url: urlBase + "/Users",
          method: "POST"
        },
        "upsert": {
          url: urlBase + "/Users",
          method: "PUT"
        },
        "exists": {
          url: urlBase + "/Users/:id/exists",
          method: "GET"
        },
        "findById": {
          url: urlBase + "/Users/:id",
          method: "GET"
        },
        "find": {
          isArray: true,
          url: urlBase + "/Users",
          method: "GET"
        },
        "findOne": {
          url: urlBase + "/Users/findOne",
          method: "GET"
        },
        "updateAll": {
          url: urlBase + "/Users/update",
          method: "POST"
        },
        "deleteById": {
          url: urlBase + "/Users/:id",
          method: "DELETE"
        },
        "count": {
          url: urlBase + "/Users/count",
          method: "GET"
        },
        "prototype$updateAttributes": {
          url: urlBase + "/Users/:id",
          method: "PUT"
        },
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Users/login",
          method: "POST"
        },
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Users/logout",
          method: "POST"
        },
        "confirm": {
          url: urlBase + "/Users/confirm",
          method: "GET"
        },
        "resetPassword": {
          url: urlBase + "/Users/reset",
          method: "POST"
        },
        "getCurrent": {
           url: urlBase + "/Users" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );
        R["updateOrCreate"] = R["upsert"];
        R["update"] = R["updateAll"];
        R["destroyById"] = R["deleteById"];
        R["removeById"] = R["deleteById"];
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };
    return R;
  }]);

module.factory(
  "Car",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/cars/:id",
      { 'id': '@id' },
      {
        "create": {
          url: urlBase + "/cars",
          method: "POST"
        },
        "upsert": {
          url: urlBase + "/cars",
          method: "PUT"
        },
        "exists": {
          url: urlBase + "/cars/:id/exists",
          method: "GET"
        },
        "findById": {
          url: urlBase + "/cars/:id",
          method: "GET"
        },
        "find": {
          isArray: true,
          url: urlBase + "/cars",
          method: "GET"
        },
        "findOne": {
          url: urlBase + "/cars/findOne",
          method: "GET"
        },
        "updateAll": {
          url: urlBase + "/cars/update",
          method: "POST"
        },
        "deleteById": {
          url: urlBase + "/cars/:id",
          method: "DELETE"
        },
        "count": {
          url: urlBase + "/cars/count",
          method: "GET"
        }
      }
    );

        R["updateOrCreate"] = R["upsert"];
        R["update"] = R["updateAll"];
        R["destroyById"] = R["deleteById"];
        R["removeById"] = R["deleteById"];
    R.modelName = "Car";
    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Reviewer
 * @header lbServices.Reviewer
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Reviewer` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Reviewer",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Reviewers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#prototype$__findById__accessTokens
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Find a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/Reviewers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#prototype$__destroyById__accessTokens
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Delete a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/Reviewers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#prototype$__updateById__accessTokens
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Update a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/Reviewers/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Reviewer.reviews.findById() instead.
        "prototype$__findById__reviews": {
          url: urlBase + "/Reviewers/:id/reviews/:fk",
          method: "GET"
        },

        // INTERNAL. Use Reviewer.reviews.destroyById() instead.
        "prototype$__destroyById__reviews": {
          url: urlBase + "/Reviewers/:id/reviews/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Reviewer.reviews.updateById() instead.
        "prototype$__updateById__reviews": {
          url: urlBase + "/Reviewers/:id/reviews/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#prototype$__get__accessTokens
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Queries accessTokens of Reviewer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Reviewers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#prototype$__create__accessTokens
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Reviewers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#prototype$__delete__accessTokens
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Reviewers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#prototype$__count__accessTokens
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Counts accessTokens of Reviewer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Reviewers/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use Reviewer.reviews() instead.
        "prototype$__get__reviews": {
          isArray: true,
          url: urlBase + "/Reviewers/:id/reviews",
          method: "GET"
        },

        // INTERNAL. Use Reviewer.reviews.create() instead.
        "prototype$__create__reviews": {
          url: urlBase + "/Reviewers/:id/reviews",
          method: "POST"
        },

        // INTERNAL. Use Reviewer.reviews.destroyAll() instead.
        "prototype$__delete__reviews": {
          url: urlBase + "/Reviewers/:id/reviews",
          method: "DELETE"
        },

        // INTERNAL. Use Reviewer.reviews.count() instead.
        "prototype$__count__reviews": {
          url: urlBase + "/Reviewers/:id/reviews/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#create
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Reviewers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#upsert
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Reviewers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#exists
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Reviewers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#findById
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Reviewers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#find
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Reviewers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#findOne
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Reviewers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#updateAll
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Reviewers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#deleteById
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Reviewers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#count
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Reviewers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#prototype$updateAttributes
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Reviewers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#login
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Login a user with username/email and password
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         *
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         *
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Reviewers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#logout
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Reviewers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#confirm
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` -
         *
         *  - `token` – `{string}` -
         *
         *  - `redirect` – `{string}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Reviewers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#resetPassword
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Reviewers/reset",
          method: "POST"
        },

        // INTERNAL. Use CoffeeShop.reviewers.findById() instead.
        "::findById::CoffeeShop::reviewers": {
          url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
          method: "GET"
        },

        // INTERNAL. Use CoffeeShop.reviewers.destroyById() instead.
        "::destroyById::CoffeeShop::reviewers": {
          url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use CoffeeShop.reviewers.updateById() instead.
        "::updateById::CoffeeShop::reviewers": {
          url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
          method: "PUT"
        },

        // INTERNAL. Use CoffeeShop.reviewers() instead.
        "::get::CoffeeShop::reviewers": {
          isArray: true,
          url: urlBase + "/CoffeeShops/:id/reviewers",
          method: "GET"
        },

        // INTERNAL. Use CoffeeShop.reviewers.create() instead.
        "::create::CoffeeShop::reviewers": {
          url: urlBase + "/CoffeeShops/:id/reviewers",
          method: "POST"
        },

        // INTERNAL. Use CoffeeShop.reviewers.destroyAll() instead.
        "::delete::CoffeeShop::reviewers": {
          url: urlBase + "/CoffeeShops/:id/reviewers",
          method: "DELETE"
        },

        // INTERNAL. Use CoffeeShop.reviewers.count() instead.
        "::count::CoffeeShop::reviewers": {
          url: urlBase + "/CoffeeShops/:id/reviewers/count",
          method: "GET"
        },

        // INTERNAL. Use Review.reviewer() instead.
        "::get::Review::reviewer": {
          url: urlBase + "/Reviews/:id/reviewer",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#getCurrent
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Reviewers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Reviewer#updateOrCreate
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reviewer` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#update
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#destroyById
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#removeById
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#getCachedCurrent
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Reviewer#login} or
         * {@link lbServices.Reviewer#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Reviewer instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#isAuthenticated
         * @methodOf lbServices.Reviewer
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Reviewer#getCurrentId
         * @methodOf lbServices.Reviewer
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.Reviewer#modelName
    * @propertyOf lbServices.Reviewer
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Reviewer`.
    */
    R.modelName = "Reviewer";

    /**
     * @ngdoc object
     * @name lbServices.Reviewer.reviews
     * @header lbServices.Reviewer.reviews
     * @object
     * @description
     *
     * The object `Reviewer.reviews` groups methods
     * manipulating `Review` instances related to `Reviewer`.
     *
     * Call {@link lbServices.Reviewer#reviews Reviewer.reviews()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Reviewer#reviews
         * @methodOf lbServices.Reviewer
         *
         * @description
         *
         * Queries reviews of Reviewer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Review` object.)
         * </em>
         */
        R.reviews = function() {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::get::Reviewer::reviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Reviewer.reviews#count
         * @methodOf lbServices.Reviewer.reviews
         *
         * @description
         *
         * Counts reviews of Reviewer.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.reviews.count = function() {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::count::Reviewer::reviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Reviewer.reviews#create
         * @methodOf lbServices.Reviewer.reviews
         *
         * @description
         *
         * Creates a new instance in reviews of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Review` object.)
         * </em>
         */
        R.reviews.create = function() {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::create::Reviewer::reviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Reviewer.reviews#destroyAll
         * @methodOf lbServices.Reviewer.reviews
         *
         * @description
         *
         * Deletes all reviews of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.reviews.destroyAll = function() {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::delete::Reviewer::reviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Reviewer.reviews#destroyById
         * @methodOf lbServices.Reviewer.reviews
         *
         * @description
         *
         * Delete a related item by id for reviews
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for reviews
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.reviews.destroyById = function() {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::destroyById::Reviewer::reviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Reviewer.reviews#findById
         * @methodOf lbServices.Reviewer.reviews
         *
         * @description
         *
         * Find a related item by id for reviews
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for reviews
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Review` object.)
         * </em>
         */
        R.reviews.findById = function() {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::findById::Reviewer::reviews"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Reviewer.reviews#updateById
         * @methodOf lbServices.Reviewer.reviews
         *
         * @description
         *
         * Update a related item by id for reviews
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for reviews
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Review` object.)
         * </em>
         */
        R.reviews.updateById = function() {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::updateById::Reviewer::reviews"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
