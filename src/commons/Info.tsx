import React  from "react";
import './Info.css'

interface InfoProps {
    infoState: boolean;
    info: string;
    show: (value: boolean) => void;
    action?: () => void;
}

const Info: React.FC<InfoProps> = ({ infoState, info, show, action }) => {
    return (
        <>
            {infoState && 
                <div className="overlay">
                    <div className="error-container">
                        <button className='error-close' onClick={(e) => { 
                            e.preventDefault()
                            show(false)}}>X</button>
                        <h2 className="error-text">{info}</h2>
                        <button className="error-confirm" onClick={(e) => {
                            e.preventDefault()
                            action?.()
                            show(false)
                        }}>OK</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Info;