import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

function RadioButtonList(props) {
    return (
        <ul>
            {props.options.map((value, index) => 
                    <RadioButton
                        key={index} 
                        value={value}
                        onClick={() => props.onClick(index)}
                        checked={props.selected === index}
                    />
            )}
        </ul>
    );
}

RadioButtonList.propTypes = {
    options: PropTypes.array.isRequired,
    selected: PropTypes.number,
};

export default RadioButtonList;