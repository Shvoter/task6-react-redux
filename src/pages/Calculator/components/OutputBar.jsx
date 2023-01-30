import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class OutputBar extends React.Component {
    render() {
        const {
            inputData,
            inputHistory,
        } = this.props;
        let oldHistory = inputHistory.slice(0, -1).join("\n");
        let lastHistory = inputHistory[inputHistory.length - 1];

        return (
            <div>
                <div>
                    <TextareaAutosize
                        maxRows={4}
                        readOnly
                        value={oldHistory}
                    />
                    <div>
                        {lastHistory}
                    </div>
                </div>
                <div>
                    <input
                        type='text'
                        value={inputData}
                        readOnly
                    />
                </div>
            </div>
        );
    }
}

export default OutputBar;