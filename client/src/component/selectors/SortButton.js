import React from 'react';

const SortButton = ({ sortClick, handleState, text, selected, disable }) => {
    const handleClick = () => {
        handleState(text);
        sortClick();
    }

    return (
        <button 
            id={selected==text ? "selected" : ""}
            disabled={disable}
            onClick={handleClick}
            >{text}</button>
    );
}

export default SortButton;