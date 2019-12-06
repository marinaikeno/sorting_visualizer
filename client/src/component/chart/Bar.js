import React from 'react';

const Bar = ({ val, sorted, swaped, selected, highlighted }) => {
    let background = sorted ? "#53C8FF" :
                        swaped ? "#6434C9": 
                            selected ? "#2ECC40" :
                                highlighted ? "#FF695D" : "gray";

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