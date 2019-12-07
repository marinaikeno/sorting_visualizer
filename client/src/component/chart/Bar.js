import React from 'react';

const Bar = ({ val, sorted, swaped, selected, highlighted }) => {
    let background = sorted ? "#53C8FF" :
               highlighted ? "#FF695D" :
                        swaped ? "#6434C9": 
                            selected ? "#2ECC40" : "gray";

    const style = {
        height: `${val}%`,
        background,
        border: "solid whitesmoke 1px"
    };

    return (
        <li>
            <span style={style}></span>
        </li>
    );
}

export default Bar;