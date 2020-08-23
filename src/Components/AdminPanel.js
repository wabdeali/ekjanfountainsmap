import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config'

import LocUpload from './LocUpload';
import Login from './Login';

const AdminPanel = () => {
    let [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false)
            }
        })
    }, [])

    return (
        <>
            {isLoggedIn ? <LocUpload /> : <Login />}
        </>
    )
}

export default AdminPanel;