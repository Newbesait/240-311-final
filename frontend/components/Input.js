const Input = props => {
    return (
        <div className='container'>
            {props.icon && <i className={"fa fa-" + props.icon}></i>}
            <input type={props.type} placeholder={props.placeholder} />
            <style jsx>{`
                .container {
                    display: flex;
                    align-items: center;
                    background-color: white;
                    padding: 4px;
                    border-radius: 8px;
                    margin-right: 6px;
                }
                i {
                    margin-right: 8px;
                }
                input {
                    margin: 0;
                    padding: 0;
                    font-size: 1em;
                    border: none;
                    font-weight: 300;
                    outline: none;
                }
            `}</style>
        </div>
    )
}

export default Input;