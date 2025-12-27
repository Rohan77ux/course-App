



import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0 || "At least one requirement is needed"
        });
    }, [register, name]);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList, name, setValue]);

    const handleAddRequirement = () => {
        if (requirement.trim()) {
            setRequirementList([...requirementList, requirement.trim()]);
            setRequirement("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddRequirement();
        }
    };

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>
            
            <div className="flex gap-x-2">
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="form-style flex-1 bg-richblack-700 text-richblack-5 p-3 rounded-md border-b border-richblack-500 focus:outline-none focus:ring-1 focus:ring-richblack-200"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    disabled={!requirement.trim()}
                    className="flex items-center justify-center bg-yellow-50 text-richblack-900 py-2 px-4 rounded-md font-medium hover:bg-yellow-25 disabled:bg-richblack-500 disabled:text-richblack-200 disabled:cursor-not-allowed transition-all duration-200"
                >
                    Add
                </button>
            </div>

            {requirementList.length > 0 && (
                <ul className="mt-2 space-y-2">
                    {requirementList.map((requirement, index) => (
                        <li 
                            key={index} 
                            className="flex items-center justify-between bg-richblack-700 px-4 py-2 rounded-md"
                        >
                            <span className="text-richblack-5">{requirement}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="text-xs text-pink-200 hover:text-pink-100 transition-colors duration-200"
                                aria-label={`Remove ${requirement}`}
                            >
                                Clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {errors[name] && (
                <span className="text-xs text-pink-200">
                    {errors[name].message || `${label} is required`}
                </span>
            )}
        </div>
    );
};

export default RequirementField;