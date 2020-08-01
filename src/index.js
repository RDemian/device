import React from 'react';
import ReactDOM from 'react-dom';
import { Device } from 'components/device';
import './index.scss';

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <Device />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
