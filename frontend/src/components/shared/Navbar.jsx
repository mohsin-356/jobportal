import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = false;
    return (
        <div className="bg-white shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <h1 className="text-2xl font-bold">
                    Carbon <span className="text-[#F83002]">Jobs</span>
                </h1>

                <div className="flex items-center gap-6">
                    <ul className="flex font-medium items-center gap-10 text-sm text-gray-700">
                        <li className="hover:text-[#F83002] cursor-pointer transition">Home</li>
                        <li className="hover:text-[#F83002] cursor-pointer transition">Jobs</li>
                        <li className="hover:text-[#F83002] cursor-pointer transition">Browse</li>
                    </ul>

                    {/* User checker */}
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="outline" className="w-full text-sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="outline" className="w-full text-sm bg-black text-white">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    className="w-64 rounded-xl border border-gray-200 shadow-lg bg-white p-4 space-y-4"
                                >
                                    {/* Profile Section */}
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">Mohisn Mernstack</h4>
                                            <p className="text-sm text-muted-foreground">mohisn@example.com</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-gray-600">
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link">
                                                View Profile
                                            </Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>
    )
}
export default Navbar;

// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
// import React from 'react'
// import { Button } from '../ui/button'

// const Navbar = () => {

//     return (
//         <div className='bg-white'>
//             <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
//                 <div>
//                     <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
//                 </div>
//                 <div className='flex items-center gap-6'>
//                     <ul className='flex font-medium items-center gap-12'>
//                         <li>Home</li>
//                         <li>Jobs</li>
//                         <li>Browse</li>
//                     </ul>
//                     <Popover>

//                         <PopoverTrigger asChild>
//                             <Avatar className='cursor-pointer'>
//                                 <AvatarImage
//                                     src="https://github.com/shadcn.png"
//                                     alt="@shadcn"
//                                     className="w-10 h-10 rounded-full object-cover"
//                                 />
//                             </Avatar>
//                         </PopoverTrigger>

//                         <PopoverContent className='w-88'>
//                             <div className='flex gap-4 space-y-2'>
//                                 <Avatar className='cursor-pointer'>
//                                     <AvatarImage
//                                         src="https://github.com/shadcn.png"
//                                         alt="@shadcn"
//                                         className="w-10 h-10 rounded-full object-cover"
//                                     />
//                                 </Avatar>
//                                 <div>
//                                     <h1 className='text-lg font-semibold'>Shadcn</h1>
//                                     <p className='text-sm text-gray-500'>shadcn@example.com</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <Button variant='link' >View Profile</Button>
//                                 <Button variant='link' >Logout</Button>
//                             </div>
//                         </PopoverContent>

//                     </Popover>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navbar