import React from 'react';
import ReactDOM from 'react-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Device } from 'components/device';
import './index.scss';

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <DndProvider backend={HTML5Backend}>
                    <Device />
                </DndProvider>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
