import { combineReducers } from 'redux'
import { FETCH_SWAGGER_REQUEST, FETCH_SWAGGER_FAILURE, FETCH_SWAGGER_SUCCESS, REMOVE_SWAGGER } from './actions/swaggerRequestAction'
import { NOTIFICATION_ACKNOWLEDGED } from './actions/notificationRequestAction'
import JsonRefs from 'json-refs';
import deepcopy from 'deepcopy';

const defaultState = {
    'notification' : {
      notified: true,
      message: ''
    },
    'current': {
        'name': 'Pet Store',
        'url': 'http://petstore.swagger.io/v2/swagger.json',
        'status': 'hide',
        'exception': null,
        'swagger' : null
    },
    'definitions' : {
    }
};

const swagger = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_SWAGGER_REQUEST:
            return Object.assign({}, state, {
                'current': {
                    name: action.name,
                    url: action.url,
                    'status': 'loading'
                },
                definitions: state.definitions
            });
        case FETCH_SWAGGER_FAILURE:
            return Object.assign({}, state, {
                'current': {
                    name: state.current.name,
                    url: state.current.url,
                    'exception' :  action.error,
                    'status':'hide'
                },
                'notification': {
                    notified: false,
                    message: action.error.message
                },
                definitions: state.definitions
            });
        case FETCH_SWAGGER_SUCCESS:
            // Some swaggers don't have tags explicitly
            var response = JSON.parse(action.response);
            if(!response.tags) {
                var tags = [];
                var keys = [];
                for(var key in response.paths) {
                    if(response.paths.hasOwnProperty(key)) {
                        var methods = response.paths[key];
                        for(var methodKey in methods) {
                            if(methods.hasOwnProperty(methodKey)) {
                                var method = methods[methodKey];
                                method.tags.map(function(tag){
                                    var result = { name: tag, description: ''};
                                    if(!(keys.indexOf(tag) > -1)) {
                                        tags.push(result);
                                        keys.push(tag);
                                    }
                                });
                            }
                        }
                    }
                }
                response['tags'] = tags;
            }
            var definitions = deepcopy(state.definitions);
            var current = {
                name: state.current.name,
                url: state.current.url,
                'swagger' : response,
                'status':'hide'
            };
            var message = state.current.name + ' added';
            if(definitions.hasOwnProperty(current.url)) {
                message = state.current.name + ' refreshed'
            }
            JsonRefs.resolveRefs(response)
                .then(function(schema) {
                    current = {
                        name: state.current.name,
                        url: state.current.url,
                        'swagger' :  schema.resolved,
                        'status':'hide'
                    };
                    definitions[current.url] = current;
                    return Object.assign({}, state, {
                        current:current,
                        'notification': {
                            notified: false,
                            message: message
                        },
                        definitions: definitions
                    });
                })
                .catch(function(err) {
                    definitions[current.url] = current;
                    return Object.assign({}, state, {
                        current:current,
                        'notification': {
                            notified: false,
                            message: message
                        },
                        definitions: definitions
                    });
                });
            break;
        case REMOVE_SWAGGER:
            var definitions = deepcopy(state.definitions);
            delete definitions[action.url];

            return Object.assign({}, state, {
                current:state.current,
                notification: {
                  notified: false,
                  message: action.name + ' removed'
                },
                definitions: definitions
            });
            break;
        case NOTIFICATION_ACKNOWLEDGED:
            return Object.assign({}, state, {
                current:state.current,
                'notification': {
                    notified: true,
                    message: ''
                },
                definitions: state.definitions
            });
        default:
            return state
    }
};

const swaggerApp = combineReducers({
    swagger
});

export default swaggerApp