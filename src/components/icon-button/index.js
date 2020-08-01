import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const IconButton = ({ Icon, text, firstText, onClick }) => {
    const isBothElem = Icon && text;
    return (
        <button
            className={`IconButton ${firstText}`}
            type='button'
            onClick={onClick}
        >
            {Icon && 
                <span className={`IconButton__element ${!firstText && isBothElem ? 'IconButton__element_first' : ''}`}>
                    <Icon className={`IconButton__icon`} />
                </span>
            }
            {text &&
                <span className={`IconButton__element ${firstText && isBothElem ? 'IconButton__element_first' : '' }`}>
                    {text}
                </span>
            }
        </button>
    )
}

IconButton.defaultProps = {
    Icon: null,
    onClick: () => {},
    firstText: false,
    text: '',
}

IconButton.propTypes = {
    Icon: PropTypes.object,
    onClick: PropTypes.func,
    firstText: PropTypes.bool,
    text: PropTypes.string,
}

export { IconButton };
