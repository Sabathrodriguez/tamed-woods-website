import React from 'react';
import '../App.css';

const InputWithLabel = ({id, value, type="text", onInputChange, isFocused, children}) => {
    const inputRef = React.useRef();
  
    React.useEffect(() => {
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isFocused]);
  
    return (
      <div className="mainInputWithLabel-div">
        <label htmlFor={id}>{children}</label> &nbsp;
        <input ref={inputRef} id={id} type={type} value={value} autoFocus={isFocused} onChange={onInputChange}/>
      </div>
    );
  }

  export default InputWithLabel;