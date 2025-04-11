import React  from "react";
import './Error.css'

interface ErrorProps {
    errorState: boolean;
    error: string;
    show: (value: boolean) => void;
}

const Error: React.FC<ErrorProps> = ({ errorState, error, show }) => {
    return (
        <>
            {errorState && 
                <div className="overlay">
                    <div className="error-container">
                        <h2 className="error-text">{error}</h2>
                        <button className="error-close" onClick={(e) => {
                            e.preventDefault()
                            show(!errorState)
                        }}>OK</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Error;