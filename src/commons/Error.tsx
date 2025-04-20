import React  from "react";
import './Error.css'

interface ErrorProps {
    errorState: boolean;
    error: string;
    show: (value: boolean) => void;
    action: () => void;
}

const Error: React.FC<ErrorProps> = ({ errorState, error, show, action }) => {
    return (
        <>
            {errorState && 
                <div className="overlay">
                    <div className="error-container">
                        <button className='error-close' onClick={(e) => { 
                            e.preventDefault()
                            show(!errorState)}}>X</button>
                        <h2 className="error-text">{error}</h2>
                        <button className="error-confirm" onClick={(e) => {
                            e.preventDefault()
                            action()
                            show(!errorState)
                        }}>OK</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Error;