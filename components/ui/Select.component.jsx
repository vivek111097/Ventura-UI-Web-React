import React from "react";

const Select = (props) => {
    const { options,onChange } = props;
    console.log(props);
    return (
        <select onChange={(e)=>onChange(e)}>
            {
                Object.entries(options).map((option, index) => (
                    <option key={index} value={option[0]}>
                        {option[1]}
                    </option>
                ))
            }
            {/* {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))} */}
        </select>
    );
};

export default Select;
