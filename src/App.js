import React from 'react';
import Calculator from "./pages/Calculator";
import { createStore } from "redux";
import { Provider } from 'react-redux';
import calculatorReducer from "./pages/Calculator/reducers/calculator";

const store = createStore(calculatorReducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Calculator/>
            </Provider>
        );
    }
}

export default App;
