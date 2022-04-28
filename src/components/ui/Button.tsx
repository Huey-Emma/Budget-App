import React from 'react';
import classes from './Button.module.css';

const Button: React.FC<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > & { children?: React.ReactNode }
> = ({ children, ...rest }) => {
    return (
        <button className={classes.btn} {...rest}>
            {children}
        </button>
    );
};

export default Button;
