import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { db } from '../firebase/config'
import { Button, Typography } from '@material-ui/core';

export default function LocationTable() {
    let [data, setData] = useState(null)

    useEffect(() => {

        db.collection('locations').get()
            .then(snapshot => {
                let data = snapshot.docs.map(doc => doc.data())
                data.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)); 
                setData( data )
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return (
        <>  
            <div style={{
                textAlign: 'center',
                margin: '20px',
            }}>
                <Typography variant="h4">All Locations</Typography>
            </div>
            <div style={{
                margin: '10px 20px',

            }}>
            { data !== null && <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>TITLE</TableCell>
                            <TableCell>DESCRIPTION</TableCell>
                            <TableCell>IMAGE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, id) => (
                            <TableRow key={row.imgURL}>
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell><Button href={row.imgURL} target="_blank" variant="outlined">View Image</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            </div>
        </>
    );
}