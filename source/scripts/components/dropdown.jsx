import React from 'react';

export const Dropdown = (props) => {
    let options = [];
    let items = props.items;

    items.forEach((value, i) => {
        let option = <option key={i}>{value}</option>;
        options.push(option);
    });
        
    return (
        <select defaultValue={items[0]} className={props.className}>
            {options}
        </select>
    );
};