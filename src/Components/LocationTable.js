import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import { db } from '../firebase/config'
import { Typography, Modal, DialogContent, Button } from '@material-ui/core';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { CSVLink, CSVDownload } from 'react-csv';

export default function LocationTable() {
    let [data, setData] = useState(null)
    let [uniqueLocations, setUniqueLocations] = useState(null)
    let [csvData, setCsvData] = useState("")
    let [showEditModal, setShowEditModal] = useState(false)
    let [editModalData, setEditModalData] = useState(null)
    let [showDeleteModal, setShowDeleteModal] = useState(false)
    let [deleteModalData, setDeleteModalData] = useState(null)

    useEffect(() => {

        db.collection('locations').get()
            .then(snapshot => {
                let data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                data.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
                setData(data)

                //This is to log all the unique locations 
                let tempUniqueLocations = [];

                data.forEach(loc => {
                    if (!tempUniqueLocations.includes(loc.title)) {
                        tempUniqueLocations.push(loc.title)
                    }
                })

                setUniqueLocations(tempUniqueLocations)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const changeShowEditModal = (row) => {

        setEditModalData(row)
        setShowEditModal(true)

    }

    const changeShowDeleteModal = (row) => {

        setDeleteModalData(row)
        setShowDeleteModal(true)

    }

    const downloadBackup = (event, done) => {

        const csvData = data;
        const headers = ['title', 'description', 'imgURL', 'videoURL', 'lat', 'lng'];
        const csvRows = [];
        csvRows.push(headers);

        for (const row of csvData) {
            const values = [
                row.title,
                row.description,
                row.imgURL,
                row.videoURL,
                row.coords.lat,
                row.coords.lng,
            ]
            csvRows.push(values);
        }

        setCsvData(csvRows)
    }

    if (data !== null) {
        return (
            <>
                <div style={{
                    textAlign: 'center',
                    margin: '20px',
                }}>
                    {/* <Typography variant="h4">All Locations</Typography>
                    <Typography variant="h6">{`Total Number of Locations: ${data.length}`}</Typography> */}
                </div>
                <div style={{
                    width: '60%',
                    margin: '0 auto',
                }}>

                    <Typography variant="h5">Unique Locations</Typography>
                    {uniqueLocations && <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>TITLE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    uniqueLocations.map((loc, i) =>
                                        <TableRow key={i}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>{loc}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>}

                    <br />
                    <br />

                    <CSVLink onClick={(event, done) => downloadBackup(event, done)} data={csvData}>
                        <Button variant="outlined" size="small">Download Backup</Button>
                    </CSVLink>

                    <Typography variant="h4">All Locations</Typography>
                    <Typography variant="h6">{`Total Number of Locations: ${data.length}`}</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>TITLE</TableCell>
                                    <TableCell>DESCRIPTION</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, id) => (
                                    <TableRow key={row.imgURL}>
                                        <TableCell component="th" scope="row">
                                            {id + 1}
                                        </TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>
                                            <div style={{ width: '30%' }}>
                                                <Edit className="editButton" onClick={() => changeShowEditModal(row)} />
                                                <Delete color="secondary" className="editButton" onClick={() => changeShowDeleteModal(row)} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
                    <DialogContent>
                        <EditModal editModalData={editModalData} setShowEditModal={setShowEditModal} />
                    </DialogContent>
                </Modal>
                <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                    <DialogContent>
                        <DeleteModal deleteModalData={deleteModalData} setShowDeleteModal={setShowDeleteModal} />
                    </DialogContent>
                </Modal>
            </>
        );
    } else return null;
}
