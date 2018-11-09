import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MouseEventHandler } from 'react';
import { Dropdown } from './components/dropdown.jsx';

class MyReactApp extends React.Component<any, any> {
    handleClick: MouseEventHandler;
    constructor(props: any) {
        super(props);

        this.handleClick = (event: React.MouseEvent) => {
            alert(props.alertMessage);
        };
    }

    render() {

        return (
            <div>
                <button onClick={this.handleClick}>Click Me</button>
                <br />
                <Dropdown items={['choice1','choice2','choice3']} />
            </div>
        );
    }
}

ReactDOM.render(<MyReactApp alertMessage='Hello World' />, document.getElementById('app'));