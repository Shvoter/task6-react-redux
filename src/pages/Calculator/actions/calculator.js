const requestMathExamples = () => (
    {
        type: 'REQUEST_MATH_EXAMPLES',
    }
);

const receiveMathExamples = mathExamples => (
    {
        type: 'RECEIVE_MATH_EXAMPLES',
        mathExamples,
    }
);

const errorReceiveMathExamples = () => (
    {
        type: 'ERROR_RECEIVE_MATH_EXAMPLES',
    }
);

const fetchMathExamples = ({ mathExamplesCount }) => (dispatch) => {
    dispatch(requestMathExamples());
    return fetch('localhost:8080/math/examples?count=' + mathExamplesCount)
        .then((response) => response.json())
        .then((mathExamples) => dispatch(receiveMathExamples(mathExamples)))
        .catch(() => dispatch(errorReceiveMathExamples()));
};

export default {
    fetchMathExamples,
}