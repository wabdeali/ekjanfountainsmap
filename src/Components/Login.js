import React, { useState } from 'react';

import { auth } from '../firebase/config'

import { TextField, Button, Typography } from '@material-ui/core'

const Login = () => {
    let [errorMessage, setErrorMessage] = useState(false)

    const login = () => {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        auth.signInWithEmailAndPassword( email, password )
            .then( user => {
                console.log('succesfully logged in')
            })
            .catch( err => {
                console.log(err)
                setErrorMessage(true)
            })
        
    }

    return (
        <div
        style={{
            width: '50%',
            margin: '20px auto',
            textAlign: 'center',
        }}>
            <Typography variant="h4">
                Login
            </Typography>
            <div className="formInput">
                <TextField
                    className="formInput"
                    id="email"
                    required
                    fullWidth
                    label="Email"
                    variant="filled"
                    name="title"

                />
            </div>

            <div className="formInput">
                <TextField
                    className="formInput"
                    id="password"
                    required
                    type="password"
                    fullWidth
                    label="Password"
                    variant="filled"
                    name="description"
                />
            </div>
            <Button onClick={login} variant="outlined">Login</Button>
            {errorMessage && <div style={{ color: 'red' }}>
                Incorrect Email or Password
            </div>}
        </div>
    );
}

export default Login;