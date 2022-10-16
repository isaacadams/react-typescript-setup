import React from 'react';

export const Dropdown = (props) => {
    let { items } = props;
            
    return (
        <select defaultValue={items[0]} className={props.className}>
            {items.map((value, i) =>
                <option key={i}>{value}</option>
            )}
        </select>
    );
};