define({ "api": [
  {
    "name": "DeleteConnection",
    "group": "Connection",
    "description": "<p>Deletes connection between user and another UserName</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destination",
            "description": "<p>The Username with whome to delete connection</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if successful</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Connection deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tokenInvalid",
            "description": "<p>Token is Invalid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tokenNotProvided",
            "description": "<p>Token is required</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "router/connection_route.js",
    "groupTitle": "Connection"
  },
  {
    "type": "post",
    "url": "/connection",
    "title": "",
    "name": "PostConnection",
    "group": "Connection",
    "description": "<p>Send a connection request to another user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destination",
            "description": "<p>The Username of the user to send request to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if successful</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Connection request sent</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnableToConnect",
            "description": "<p>Unable to Connect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tokenInvalid",
            "description": "<p>Token is Invalid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tokenNotProvided",
            "description": "<p>Token is required</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/connection_route.js",
    "groupTitle": "Connection"
  },
  {
    "type": "put",
    "url": "/connection",
    "title": "",
    "name": "PutConnection",
    "group": "Connection",
    "description": "<p>Accept a connection request from another UserName</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destination",
            "description": "<p>The Username of the reqeust to acceptConnection</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if successful</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Connection made</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tokenInvalid",
            "description": "<p>Token is Invalid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tokenNotProvided",
            "description": "<p>Token is required</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/connection_route.js",
    "groupTitle": "Connection"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "",
    "name": "GetLogout",
    "group": "User",
    "description": "<p>Does nothing as Logout is client side deleteing of token</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if successful</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>just says Logged out</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/user_route.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "",
    "name": "GetUser",
    "group": "User",
    "description": "<p>Returns back data about the user</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if successful</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>UserProfile Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.UserName",
            "description": "<p>The Username of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.Email",
            "description": "<p>The email address of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.Country",
            "description": "<p>The country of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.PhoneNum",
            "description": "<p>The Phone Number of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "user.TimeStamp",
            "description": "<p>The timestamp of user creation</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>The login token of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tokenInvalid",
            "description": "<p>Token is Invalid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tokenNotProvided",
            "description": "<p>Token is required</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/user_route.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "",
    "name": "PostLogin",
    "group": "User",
    "description": "<p>Gives a valid Token if Login successful</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>the username of the user to login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>the password of the user to login</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if successful</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Successfully Logged In</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>UserProfile Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.UserName",
            "description": "<p>The Username of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.Email",
            "description": "<p>The email address of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.Country",
            "description": "<p>The country of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.PhoneNum",
            "description": "<p>The Phone Number of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "user.TimeStamp",
            "description": "<p>The timestamp of user creation</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>The login token of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalidPassword",
            "description": "<p>The Password is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalidUsername",
            "description": "<p>The UserName does not exist</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "incompleteForm",
            "description": "<p>The UserName/Password was not provided</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/user_route.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "",
    "name": "PostUser",
    "group": "User",
    "description": "<p>Creates User</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user to create</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user to create</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user to create</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phoneNumber of the user to create</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the user to create</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if successful</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Successfully Created</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNameUnavailable",
            "description": "<p>message UserName Already in Use</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/user_route.js",
    "groupTitle": "User"
  }
] });
