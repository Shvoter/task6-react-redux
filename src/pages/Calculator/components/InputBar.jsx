import React from 'react';
import inputBarStore from './inputBarStore';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import calculatorActions from "../actions/calculator";

class InputBar extends React.Component {
    render() {
        const {
            numbers,
            operations,
        } = inputBarStore;
        const {
            numbersClick,
            operationsClick,
            isLoading,
            isError,
            dispatch
        } = this.props;
        const mathExamplesCount = 5;

        return (
            <div>
                <div>
                    {numbers.map((number) => (
                        <Button
                            onClick={() => {
                                numbersClick(number);
                            }}
                            variant="contained"
                            color="primary"
                        >
                            {number}
                        </Button>
                    ))}
                </div>
                <div>
                    {operations.map(((operation) => (
                        <Button
                            onClick={() => {
                                operationsClick(operation);
                            }}
                            variant="contained"
                            color="primary"
                        >
                            {operation}
                        </Button>
                    )))}
                </div>
                <div>
                    <Button
                        onClick={() => calculatorActions.fetchMathExamples({
                            mathExamplesCount: mathExamplesCount,
                        })(dispatch)}
                        variant="contained"
                        color="primary"
                    >
                        Load {mathExamplesCount} math examples
                    </Button>
                    {isLoading && (
                        <div>
                            Loading data...
                        </div>
                    )}
                    {isError && (
                        <div>
                            Error of last loading
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    isLoading: reduxState.isLoading,
    isError: reduxState.isError,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default connect(mapReduxStateToProps, mapDispatchToProps)(InputBar);