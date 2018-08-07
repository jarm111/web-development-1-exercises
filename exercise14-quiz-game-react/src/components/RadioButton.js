import React from 'react';
import PropTypes from 'prop-types';

function RadioButton(props) {
    return (
        <div>
            <input
                    type="radio"
                    value={props.value}
                    onClick={props.onClick}
                    checked={props.checked}
                />
            {props.value}
        </div>
    );
}

RadioButton.defaultProps = {
    value: '',
    checked: false,
};

RadioButton.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    checked: PropTypes.bool,
};

export default RadioButton;