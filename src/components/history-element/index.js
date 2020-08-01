import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { HistoryButton } from './history-button';
import { DropButton } from './drop-button';
import './styles.scss';

class HistoryElement extends Component {
    static propTypes = {
        onCopy: PropTypes.func,
        onExecute: PropTypes.func,
        onDelete: PropTypes.func,
        actionName: PropTypes.string.isRequired,
        actionOk: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        onCopy: () => {},
        onExecute:  () => {},
        onDelete:  () => {},
    }

    state = {
        isDropOpen: false,
    }

    onDropToggle = () => {
        this.setState(state => ({
            isDropOpen: !state.isDropOpen,
        }))
    }

    handleClickOutside = ev => {
        ev.stopPropagation();
        const { isDropOpen } = this.state;
        if (isDropOpen) {
            this.setState({
                isDropOpen: false,
            });
        }
    };

    onActionClick = (func, params) => {
        if (typeof func === 'function') func(params);
        const { isDropOpen } = this.state;
        if (isDropOpen) {
            this.setState({
                isDropOpen: false,
            });
        }
    }

    render() {
        const { onCopy, onExecute, onDelete, actionName, actionOk } = this.props;
        const { isDropOpen } = this.state;
        return (
            <div className={`HistoryElement`}>
                <HistoryButton
                    className={`HistoryElement__btn`}
                    actionName={actionName}
                    onClick={() => this.onActionClick(onCopy, actionName)}
                    onDrop={this.onDropToggle}
                    isWrong={!actionOk}
                />
                {isDropOpen &&
                    <div className={`HistoryElement__drop-list`}>
                        <div className={`HistoryElement__drop-btn-wrap`}>
                            <DropButton onClick={() => this.onActionClick(onExecute)} actionName='Выполнить' />
                            <DropButton onClick={() => this.onActionClick(onCopy, actionName)} actionName='Скопировать' />
                        </div>
                        <div className={`HistoryElement__drop-btn-wrap`}>
                            <DropButton onClick={() => this.onActionClick(onDelete, actionName)} actionName='Удалить' isDestruct={true} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default onClickOutside(HistoryElement);
