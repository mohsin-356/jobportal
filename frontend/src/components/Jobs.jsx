import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "lsekdhjgdsnfvsdkjf"

  return (
    <>
      <Navbar />
      <FilterCard />
      <Footer />
    </>
  )
}

export default Job