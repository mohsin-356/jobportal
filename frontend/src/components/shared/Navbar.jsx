import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logoutHandler=async()=>{
        try {
            const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
            if(res.data.success)
            {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="bg-white shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <h1 className="text-2xl font-bold">
                    Carbon <span className="text-[#F83002]">Jobs</span>
                </h1>

                <div className="flex items-center gap-6">
                    <ul className="flex font-medium items-center gap-10 text-sm text-gray-700">
                        <li className="hover:text-[#F83002] cursor-pointer transition"><Link to="/">Home</Link></li>
                        <li className="hover:text-[#F83002] cursor-pointer transition"><Link to="/jobs">Jobs</Link></li>
                        <li className="hover:text-[#F83002] cursor-pointer transition"><Link to="/browse">Browse</Link></li>
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
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-gray-600">
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link">
                                                <Link to={'/profile'}>View Profile</Link>
                                            </Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">
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