import React from 'react';
import classes from './MyInput.module.css';


// React.forwardRef для неуправляемого компонента
const MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.myInput} {...props} />
    )
})


export default MyInput;
