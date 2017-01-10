import { combineReducers } from 'redux'
import { FETCH_SWAGGER_REQUEST, FETCH_SWAGGER_FAILURE, FETCH_SWAGGER_SUCCESS, REMOVE_SWAGGER } from './actions/swaggerRequestAction'
import deepcopy from 'deepcopy';

const defaultState = {
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
                                console.log(method);
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
            }
            response['tags'] = tags;
            console.log(response);
            var current = {
                name: state.current.name,
                url: state.current.url,
                'swagger' :  response,
                'status':'hide'
            };
            var definitions = deepcopy(state.definitions);
            definitions[current.url] = current;

            return Object.assign({}, state, {
                current:current,
                definitions: definitions
            });
        case REMOVE_SWAGGER:
            var definitions = deepcopy(state.definitions);
            delete definitions[action.url];

            return Object.assign({}, state, {
                definitions: definitions
            });
        default:
            return state
    }
};

const swaggerApp = combineReducers({
    swagger
});

export default swaggerApp