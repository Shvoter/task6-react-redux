import React from "react";
import InputBar from "../components/InputBar";
import OutputBar from "../components/OutputBar";
import { connect } from 'react-redux';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.numbersClick = this.numbersClick.bind(this);
        this.operationsClick = this.operationsClick.bind(this);

        this.state = {
            inputHistory: [],
            inputData: {
                number1: 0,
                number2: '',
                operation: '',
            },
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            mathExamples,
        } = this.props;
        let newState;

        if (prevProps.mathExamples !== mathExamples) {
            newState = {
                inputHistory: [...this.state.inputHistory],
            };
            let i = 0;
            do {
                let initState = this.getStringAsInputData(mathExamples[i]);
                newState = this.getStateAfterMathCalculation(initState, newState.inputHistory, '=');
                i++;
            } while (i < mathExamples.length);
        }
        this.setState(
            newState
        );
    }

    numbersClick(number) {
        const inputData = this.state.inputData;
        let newInputData = {};

        if (inputData.operation === '') {
            if (inputData.number1 === 0) {
                newInputData.number1 = +number;
            } else {
                newInputData.number1 = +(String(inputData.number1) + number);
            }
        } else {
            newInputData.number2 = +(String(inputData.number2) + number);
        }

        this.setState({
            inputData: {
                ...inputData,
                ...newInputData,
            }
        });
    }

    operationsClick(operation) {
        const {
            inputHistory,
            inputData,
        } = this.state;
        let newState = {}

        if (inputData.number2 === '') {
            if (operation !== '=') {
                newState.inputData = {
                    ...inputData,
                    operation: operation
                }
            }
        } else {
            newState = this.getStateAfterMathCalculation(inputData, inputHistory, operation);
        }

        this.setState(
            newState
        );
    }

    getStateAfterMathCalculation(inputData, inputHistory, nextOperation) {
        let newState = {
            inputHistory: [...inputHistory],
            inputData: {
                number1: 0,
                number2: '',
                operation: '',
            },
        };

        let operations = {
            '+': (n1, n2) => n1 + n2,
            '-': (n1, n2) => n1 - n2,
            '*': (n1, n2) => n1 * n2,
            '/': (n1, n2) => n1 / n2,
        };
        let resultOfMath = operations[inputData.operation](inputData.number1, inputData.number2);

        if (!isFinite(resultOfMath)) {
            newState.inputHistory.push(this.getInputDataAsString(inputData) + "=Error: division by zero or too long number");
        } else {
            newState.inputHistory.push(this.getInputDataAsString(inputData) + "=" + resultOfMath);
            newState.inputData.number1 = resultOfMath;
            if (nextOperation !== "=") {
                newState.inputData.operation = nextOperation;
            }
        }
        return newState;
    }

    getInputDataAsString(inputData) {
        return inputData.number1 + inputData.operation + inputData.number2;
    }

    getStringAsInputData(stringToParse) {
        let numbers = stringToParse.match(/\d+\.?\d*/g);
        let operation = stringToParse.match(/[\/+\-*]/)

        return {
            number1: +numbers[0],
            number2: +numbers[1],
            operation: operation[0],

        }
    }

    render() {
        const {
            inputData,
            inputHistory,
        } = this.state;

        return (
            <div>
                <OutputBar
                    inputData={this.getInputDataAsString(inputData)}
                    inputHistory={inputHistory}
                />
                <InputBar
                    numbersClick={this.numbersClick}
                    operationsClick={this.operationsClick}
                />
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    mathExamples: reduxState.mathExamples,
});

export default connect(mapReduxStateToProps)(Calculator);