import React from 'react';

//besoin de composant externe
// name
// label
// value
// onChange
// type
//placholder
// error



const Field = ({name,label,value,onChanges,type = "text",placeholder="",error="",disabled=false}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type}
                className={"form-control" + (error && " is-invalid")}
                placeholder={placeholder || label}
                name={name}
                id={name}
                value={value}
                onChange={onChanges}
                disabled={disabled}

            />

            {error &&
                <p className="invalid-feedback">{error}</p>
            }
        </div>
    );
}

export default Field;