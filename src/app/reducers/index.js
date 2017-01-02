import { combineReducers } from 'redux'
import { FETCH_SWAGGER_REQUEST, FETCH_SWAGGER_FAILURE, FETCH_SWAGGER_SUCCESS } from './../actions/index'

var defaultState = {
    'current': {
        'name': 'Pet Store',
        'url': 'http://petstore.swagger.io/v2/swagger.json',
        'status': 'loading',
        'exception': null,
        'swagger' : null
    },
    'definitions' : [
    ]
};

const swagger = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_SWAGGER_REQUEST:
            console.log('reducer: FETCH_SWAGGER_REQUEST');
            return Object.assign({}, state, {
                'current': {
                    'status': 'loading'
                }
            });
        case FETCH_SWAGGER_FAILURE:
            console.log('reducer: FETCH_SWAGGER_FAILURE');
            return Object.assign({}, state, {
                'current': {
                    'exception' :  action.error.message,
                    'status':'hide'
                }
            });
        case FETCH_SWAGGER_SUCCESS:
            console.log('reducer: FETCH_SWAGGER_SUCCESS');
            return Object.assign({}, state, {
                'current': {
                    'swagger' :  JSON.parse(action.response),
                    'status':'hide'
                }
            });
        default:
            return state
    }
}

const swaggerReducer = combineReducers({
    swagger
})

export default swaggerReducer