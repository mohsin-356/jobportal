import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './shared/Footer';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];
//also add id in alljobs array
const allJobs = [
  { id: 1, title: "Software Engineer", company: { name: "ABC Corp", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS3PwERLLNB9XKFpeMgAMPxl5VvN3HRJnXQQ&s" }, description: "Job description", position: "Full-time", jobType: "Remote", salary: 10, createdAt: new Date() },
  { id: 2, title: "Data Scientist", company: { name: "XYZ Inc", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS3PwERLLNB9XKFpeMgAMPxl5VvN3HRJnXQQ&s" }, description: "Job description", position: "Full-time", jobType: "Remote", salary: 12, createdAt: new Date() },
  { id: 3, title: "Product Manager", company: { name: "LMN Ltd", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS3PwERLLNB9XKFpeMgAMPxl5VvN3HRJnXQQ&s" }, description: "Job description", position: "Full-time", jobType: "Remote", salary: 15, createdAt: new Date() },
]

const Browse = () => {
  // useGetAllJobs();
  // const {allJobs} = useSelector(store=>store.job);
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //     return ()=>{
  //         dispatch(setSearchedQuery(""));
  //     }
  // },[])
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
          {
            allJobs.map((job) => {
              return (
                <Job key={job.id} job={job} />
              )
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Browse