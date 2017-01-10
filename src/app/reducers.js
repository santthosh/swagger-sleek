import { combineReducers } from 'redux'
import { FETCH_SWAGGER_REQUEST, FETCH_SWAGGER_FAILURE, FETCH_SWAGGER_SUCCESS } from './actions/swaggerRequestAction'
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
            console.log('reducer: FETCH_SWAGGER_REQUEST');
            return Object.assign({}, state, {
                'current': {
                    name: action.name,
                    url: action.url,
                    'status': 'loading'
                },
                definitions: state.definitions
            });
        case FETCH_SWAGGER_FAILURE:
            console.log('reducer: FETCH_SWAGGER_FAILURE');
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
            console.log('reducer: FETCH_SWAGGER_SUCCESS');
            var current = {
                name: state.current.name,
                url: state.current.url,
                'swagger' :  JSON.parse(action.response),
                'status':'hide'
            };
            var definitions = deepcopy(state.definitions);
            definitions[current.url] = current;

            return Object.assign({}, state, {
                current:current,
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