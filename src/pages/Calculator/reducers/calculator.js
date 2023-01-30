const initialState = {
    isLoading: false,
    isError: false,
    mathExamples: [],
    name: "Math examples",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_MATH_EXAMPLES': {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case 'RECEIVE_MATH_EXAMPLES': {
            const {
                mathExamples,
            } = action;
            return {
                ...state,
                isLoading: false,
                mathExamples: mathExamples,
            };
        }
        case 'ERROR_RECEIVE_MATH_EXAMPLES': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        default: return state;
    }
}
