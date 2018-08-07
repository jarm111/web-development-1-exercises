import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    return <input
        className={props.className}
        type="button"
        onClick={props.onClick}
        value={props.value}
        disabled={props.isDisabled}
    />;
}

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.string,
    isDisabled: PropTypes.bool,
};

Button.defaultProps = {
    value: '',
    isDisabled: false,
};

export default Button;
