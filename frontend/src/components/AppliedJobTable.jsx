import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
const allAppliedJobs=[
    {
        _id: "1",
        createdAt: "2023-01-01T00:00:00Z",
        job: {
            title: "Software Engineer",
            company: {
                name: "Tech Company"
            }
        },
        status: "applied"
    },
    {
        _id: "2",
        createdAt: "2023-01-02T00:00:00Z",
        job: {
            title: "Product Manager",
            company: {
                name: "Business Company"
            }
        },
        status: "interview"
    },
    {
        _id: "3",
        createdAt: "2023-01-03T00:00:00Z",
        job: {
            title: "Data Scientist",
            company: {
                name: "Data Company"
            }
        },
        status: "rejected"
    }
]
const AppliedJobTable = () => {
    // const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable