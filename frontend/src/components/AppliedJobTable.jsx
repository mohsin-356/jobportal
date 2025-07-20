import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job || {});

    // Yeh line error fix karti hai - undefined ko empty array bana deti hai
    const appliedJobs = allAppliedJobs || [];

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
                        appliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">
                                    <span className="text-gray-500">You haven't applied any job yet.</span>
                                </TableCell>
                            </TableRow>
                        ) : appliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob?._id || Math.random()}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0] || 'N/A'}</TableCell>
                                <TableCell>{appliedJob?.job?.title || 'N/A'}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name || 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${appliedJob?.status === "rejected"
                                            ? 'bg-red-400'
                                            : appliedJob?.status === 'pending'
                                                ? 'bg-gray-400'
                                                : 'bg-green-400'
                                        }`}>
                                        {appliedJob?.status?.toUpperCase() || 'UNKNOWN'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable