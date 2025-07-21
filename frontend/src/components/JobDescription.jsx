import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const [isApplied, setIsApplied] = useState(false);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...(singleJob.applications || []), { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch]);

    // ✅ Set applied state when singleJob or user changes
    useEffect(() => {
        if (singleJob && user) {
            const applied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
            setIsApplied(applied);
        }
    }, [singleJob, user]);

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-10 bg-white text-black">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <Badge className="text-blue-700 font-semibold bg-blue-50" variant="ghost">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge className="text-[#F83002] font-semibold bg-red-50" variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className="text-[#7209b7] font-semibold bg-purple-50" variant="ghost">
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>

                    {user && (
                        <Button
                            onClick={isApplied ? undefined : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-lg px-6 py-2 transition-all duration-200 text-white font-semibold ${isApplied
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#F83002] hover:bg-red-600'
                                }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    )}
                </div>

                <div className="mt-10">
                    <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-6">
                        Job Description
                    </h2>

                    <div className="space-y-4">
                        <p>
                            <span className="font-semibold">Role:</span>
                            <span className="ml-3 text-gray-700">{singleJob?.title}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Location:</span>
                            <span className="ml-3 text-gray-700">{singleJob?.location}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Description:</span>
                            <span className="ml-3 text-gray-700">{singleJob?.description}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Experience:</span>
                            <span className="ml-3 text-gray-700">{singleJob?.experience} yrs</span>
                        </p>
                        <p>
                            <span className="font-semibold">Salary:</span>
                            <span className="ml-3 text-gray-700">{singleJob?.salary} LPA</span>
                        </p>
                        <p>
                            <span className="font-semibold">Total Applicants:</span>
                            <span className="ml-3 text-gray-700">{singleJob?.applications?.length || 0}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Posted Date:</span>
                            <span className="ml-3 text-gray-700">{singleJob?.createdAt?.split('T')[0]}</span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobDescription;
