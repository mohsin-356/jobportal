import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import Footer from '../shared/Footer';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);
    console.log("applicants: ",applicants);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.applicants));
                console.log("res.data.applicants :",res.data.applicants);

            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-10'>Applicants {applicants?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants