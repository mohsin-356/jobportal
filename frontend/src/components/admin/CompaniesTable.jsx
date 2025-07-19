import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const filterCompany = [
  {
    _id: "64f9b4b3c12f4e001d23a1a1",
    logo: "https://logo.clearbit.com/google.com",
    name: "Google",
    createdAt: "2024-11-25T14:35:21.000Z"
  },
  {
    _id: "64f9b4b3c12f4e001d23a1a2",
    logo: "https://logo.clearbit.com/microsoft.com",
    name: "Microsoft",
    createdAt: "2023-04-10T09:20:00.000Z"
  },
  {
    _id: "64f9b4b3c12f4e001d23a1a3",
    logo: "https://logo.clearbit.com/amazon.com",
    name: "Amazon",
    createdAt: "2023-06-12T10:45:00.000Z"
  },
  {
    _id: "64f9b4b3c12f4e001d23a1a4",
    logo: "https://logo.clearbit.com/meta.com",
    name: "Meta",
    createdAt: "2022-08-08T17:10:00.000Z"
  },
  {
    _id: "64f9b4b3c12f4e001d23a1a5",
    logo: "https://logo.clearbit.com/openai.com",
    name: "OpenAI",
    createdAt: "2025-01-10T11:45:00.000Z"
  }
];
const CompaniesTable = () => {
    // const { companies, searchCompanyByText } = useSelector(store => store.company);
    // const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    // useEffect(()=>{
    //     const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
    //         if(!searchCompanyByText){
    //             return true
    //         };
    //         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

    //     });
    //     setFilterCompany(filteredCompany);
    // },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable