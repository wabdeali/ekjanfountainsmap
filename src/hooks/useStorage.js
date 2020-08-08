import { useState, useEffect } from 'react';
import { storage, db } from '../firebase/config';

const useStorage = ( file, data ) => {
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        const storageRef = storage.ref(file.name);
        const collectionRef = db.collection('locations')

        storageRef.put(file).on('state_changed',  snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage)
        }, err => {
            console.log(err)
        }, async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url)
            data.imgURL = url;
            collectionRef.add( data )
        })
    }, [file, data])

    return { progress, url }

}

export default useStorage;