import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage'

const Progress = ({ file, data, setReady }) => {

    const { url, progress } = useStorage(file, data)
    console.log(url, progress)

    useEffect(() => {
        if(url) {
            setReady(false)
        }
    }, [url, setReady])

    return(

        <div className="progress-bar"
        style={{
            width: progress + '%'
        }}>
        
        </div>

    )

}

export default Progress