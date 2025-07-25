import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { RadioGroup } from '../ui/radio-group';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import Footer from '../shared/Footer';

const Login = () => {
  const { loading } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: ''
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append('email', input.email);
    formData.append('password', input.password);
    formData.append('role', input.role);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (response.data.success) {
        console.log("yeh hai vo user jo dispatch hony wala hai: "+response.data.userExists);
        dispatch(setUser(response.data.userExists));
        navigate('/');
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>

            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...</Button> : <Button type="submit" className="w-full my-4">Login</Button>
          }
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign Up</Link></span>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Login;