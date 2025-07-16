import axios from 'axios';
import React, { useEffect } from 'react'

const useGetAllJobs = () => {
    useEffect(()=>{
        const fetchAllJobs=async()=>{
            try {
                const res=await axios.get();
            } catch (error) {
                console.log(error);
            }
        }
    });
}

export default useGetAllJobs