/* eslint-disable */
import React, { useState, useEffect } from 'react';

interface Props {
    message: string;
}

interface State {
    count: number;
}

const TestComponent: React.FC<Props> = (props) => {
    const [state, setState] = useState<State>({ count: 0 });

    useEffect(() => {
        document.title = `Count: ${state.count}`;
    });

    const handleClick = () => {
        setState({ count: state.count + 1 });
    };

    return (
        <div>
            <p>{props.message}</p>
            <p>{state.count}</p>
            <button onClick={handleClick}>Increase</button>
            {state.count > 0 && <p>You clicked {state.count} times</p>}
            {['Alice', 'Bob', 'Charlie'].map((name) => (
                <p key={name}>Hello, {name}</p>
            ))}
        </div>
    );
};

export default TestComponent;
