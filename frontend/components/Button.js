const Button = props => {
    return (
        <button onClick={props.onClick} disabled={props.disabled}>
            {props.children}
            <style jsx>{`
                button {
                    font-size: 1em;
                    font-weight: 200;
                    border: none;
                    border-radius: 8px;
                    padding: 4px 12px;
                    margin: 0;
                    background-color: ${props.disabled ? `var(--gray-light)` : `#00BBD3`};
                    color: white;
                    outline: none;
                    cursor: pointer;
                    transition: 0.8s
                }
            `}</style>
        </button>
    )
}

export default Button;