export const FETCH_SWAGGER_REQUEST = 'FETCH_SWAGGER_REQUEST';
export const FETCH_SWAGGER_FAILURE = 'FETCH_SWAGGER_FAILURE';
export const FETCH_SWAGGER_SUCCESS = 'FETCH_SWAGGER_SUCCESS';

export const fetchSwagger = (name,url) => {
    return (dispatch) => {
        dispatch(fetchSwaggerRequest(name,url));
        const request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    dispatch(fetchSwaggerSuccess(request.responseText));
                } else {
                    dispatch(fetchSwaggerFailure(new Error('Failed to fetch swagger for url: ' + url)));
                }
            }
        };
        request.open('GET', url, true);
        request.send();
    }
};

export const fetchSwaggerRequest = (name,url) => {
    return {
        type: FETCH_SWAGGER_REQUEST,
        name: name,
        url: url
    }
};

export const fetchSwaggerFailure = (error) => {
    return {
        type: FETCH_SWAGGER_FAILURE,
        error: error
    }
};

export const fetchSwaggerSuccess = (response) => {
    return {
        type: FETCH_SWAGGER_SUCCESS,
        response: response
    }
};
