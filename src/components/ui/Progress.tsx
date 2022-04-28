import React from 'react';
import classes from './Progress.module.css';

export type IndicatorColorType = 'blue' | 'yellow' | 'red';

const Progress: React.FC<{ value: number }> = ({ value }) => {
    const indicatorCrescendo = (value: number): IndicatorColorType => {
        if (value > 40 && value <= 70) return 'yellow';
        if (value > 70) return 'red';
        return 'blue';
    };

    const indicatorStyles = {
        width: value.toString() + '%',
        backgroundColor: indicatorCrescendo(value),
    };

    return (
        <div className={classes['progress-bar']}>
            <div
                className={classes['progress-indicator']}
                style={indicatorStyles}
            ></div>
        </div>
    );
};

export default Progress;
