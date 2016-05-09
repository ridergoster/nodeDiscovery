// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

(function(window, angular, undefined) {'use strict';

var urlBase = '/api';
var authHeader = 'authorization';
var module = angular.module('lbServices', ['ngResource']);

module.factory(
  'User',
  ['LoopBackResource', 'LoopBackAuth', '$injector',
  function(Resource, LoopBackAuth, $injector) {
    var R = new Resource(
      urlBase + '/Users/:id',
      { 'id': '@id' },
      {
        'prototype$__findById__accessTokens': {
          url: urlBase + '/Users/:id/accessTokens/:fk',
          method: 'GET'
        },
        'prototype$__destroyById__accessTokens': {
          url: urlBase + '/Users/:id/accessTokens/:fk',
          method: 'DELETE'
        },
        'prototype$__updateById__accessTokens': {
          url: urlBase + '/Users/:id/accessTokens/:fk',
          method: 'PUT'
        },
        'prototype$__get__accessTokens': {
          isArray: true,
          url: urlBase + '/Users/:id/accessTokens',
          method: 'GET'
        },
        'prototype$__create__accessTokens': {
          url: urlBase + '/Users/:id/accessTokens',
          method: 'POST'
        },
        'prototype$__delete__accessTokens': {
          url: urlBase + '/Users/:id/accessTokens',
          method: 'DELETE'
        },
        'prototype$__count__accessTokens': {
          url: urlBase + '/Users/:id/accessTokens/count',
          method: 'GET'
        },
        'create': {
          url: urlBase + '/Users',
          method: 'POST'
        },
        'upsert': {
          url: urlBase + '/Users',
          method: 'PUT'
        },
        'exists': {
          url: urlBase + '/Users/:id/exists',
          method: 'GET'
        },
        'findById': {
          url: urlBase + '/Users/:id',
          method: 'GET'
        },
        'find': {
          isArray: true,
          url: urlBase + '/Users',
          method: 'GET'
        },
        'findOne': {
          url: urlBase + '/Users/findOne',
          method: 'GET'
        },
        'updateAll': {
          url: urlBase + '/Users/update',
          method: 'POST'
        },
        'deleteById': {
          url: urlBase + '/Users/:id',
          method: 'DELETE'
        },
        'count': {
          url: urlBase + '/Users/count',
          method: 'GET'
        },
        'prototype$updateAttributes': {
          url: urlBase + '/Users/:id',
          method: 'PUT'
        },
        'login': {
          params: {
            include: 'user'
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth
                .setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth
                .rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + '/Users/login',
          method: 'POST'
        },
        'logout': {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + '/Users/logout',
          method: 'POST'
        },
        'confirm': {
          url: urlBase + '/Users/confirm',
          method: 'GET'
        },
        'resetPassword': {
          url: urlBase + '/Users/reset',
          method: 'POST'
        },
        'getCurrent': {
           url: urlBase + '/Users' + '/:id',
           method: 'GET',
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
        R['updateOrCreate'] = R['upsert'];
        R['update'] = R['updateAll'];
        R['destroyById'] = R['deleteById'];
        R['removeById'] = R['deleteById'];
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
  'Car',
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + '/cars/:id',
      { 'id': '@id' },
      {
        'create': {
          params: {
            include: 'car'
          },
          url: urlBase + '/cars',
          method: 'POST'
        },
        'upsert': {
          url: urlBase + '/cars',
          method: 'PUT'
        },
        'exists': {
          url: urlBase + '/cars/:id/exists',
          method: 'GET'
        },
        'findById': {
          url: urlBase + '/cars/:id',
          method: 'GET'
        },
        'find': {
          isArray: true,
          url: urlBase + '/cars',
          method: 'GET'
        },
        'findOne': {
          url: urlBase + '/cars/findOne',
          method: 'GET'
        },
        'updateAll': {
          url: urlBase + '/cars/update',
          method: 'POST'
        },
        'deleteById': {
          url: urlBase + '/cars/:id',
          method: 'DELETE'
        },
        'count': {
          url: urlBase + '/cars/count',
          method: 'GET'
        }
      }
    );

        R['updateOrCreate'] = R['upsert'];
        R['update'] = R['updateAll'];
        R['destroyById'] = R['deleteById'];
        R['removeById'] = R['deleteById'];
    R.modelName = 'Car';
    return R;
  }]);


  module.factory(
    'Booking',
    ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
      var R = Resource(
        urlBase + '/bookings/:id',
        { 'id': '@id' },
        {
          'create': {
            params: {
              include: 'booking'
            },
            url: urlBase + '/bookings',
            method: 'POST'
          },
          'upsert': {
            url: urlBase + '/bookings',
            method: 'PUT'
          },
          'exists': {
            url: urlBase + '/bookings/:id/exists',
            method: 'GET'
          },
          'findById': {
            url: urlBase + '/bookings/:id',
            method: 'GET'
          },
          'find': {
            isArray: true,
            url: urlBase + '/bookings',
            method: 'GET'
          },
          'findOne': {
            url: urlBase + '/bookings/findOne',
            method: 'GET'
          },
          'updateAll': {
            url: urlBase + '/bookings/update',
            method: 'POST'
          },
          'deleteById': {
            url: urlBase + '/bookings/:id',
            method: 'DELETE'
          },
          'count': {
            url: urlBase + '/bookings/count',
            method: 'GET'
          }
        }
      );
          R['updateOrCreate'] = R['upsert'];
          R['update'] = R['updateAll'];
          R['destroyById'] = R['deleteById'];
          R['removeById'] = R['deleteById'];
      R.modelName = 'Booking';
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
