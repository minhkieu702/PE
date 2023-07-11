import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../styles/home.css";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const URL = 'https://649911d179fbe9bcf83ea17c.mockapi.io/api/v1/staffManagement';
const Home = () => {
    const [staffs, setStaffs] = useState([]);
    const [detailPopup, setDetailPopup] = useState(null)

    const getListStaff = async () => {
        const res = await axios.get(`${URL}`)
        if (res.status === 200) {
            setStaffs(res.data)
        }
    }

    useEffect(() => {
        getListStaff();
    }, [])

    //popup
    // const handleViewPopup = (staff) => {
    //     setDetailPopup(staff)
    // }

    // const handleClosePopup = () => {
    //     setDetailPopup(null)
    // }
    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure that you want to delete a staff with ID: ${id}`)) {
            const res = await axios.delete(`${URL}/${id}`);
            if (res.status === 200) {
                getListStaff();
                setDetailPopup();
                window.alert("Deleted Successfully ~");
            } else {
                window.alert("Delete: Error!");
            }
        }
    }
console.log(detailPopup);
    return (
        <div className='container'>
            {staffs && staffs.map( //if staffs is exist then map is working, that reduce error in the case staffs is not exist
                (staff) => {
                    return (
                        <div className='card' key={staff.id}>
                            <img src={staff.avatar} alt={staff.id}></img>
                            <h3>{staff.name}</h3>
                            <button onClick={() => setDetailPopup(staff)}>View Details</button>{/* setDetailPopUp that pass parameter to detailPopup (that mean detailPopup not null) */}
                        </div>
                    )
                })}
                {detailPopup && (
                    <div className='popup'>
                        <div className='popup-content'>
                            <div>
                                <span className='close' onClick={() => setDetailPopup(null)}>&times;</span>
                                <img src={detailPopup.avatar} alt={detailPopup.id}/>
                                    <h2>ID: {detailPopup.id}</h2>
                                    <p>Name: {detailPopup.name}</p>
                                    <p>Age: {detailPopup.age}</p>
                                    <p>Address: {detailPopup.Address}</p>
                                    <p>CreatedAt: {new Date(detailPopup.createdAt*1000).toLocaleDateString()}</p>
                                    {/* <Button color='warning' variant='contained' component={Link} to={`/update/${detailPopup.id}`}>Edit</Button> */}
                                    <Link to={`/update/${detailPopup.id}`}><button>Update</button></Link>
                                    <button onClick={() => handleDelete(detailPopup.id)}>Delete</button>
                                </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Home
