import React, { useEffect } from 'react'
import { useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';


export default function Dashboard() {
  const {user} = useUser();
  const [resumeList, setResumeList] = useState([]);
  useEffect(()=>{
    user && GetResumeList();
  },[user])

  // Used to Get Users Resumes List
  const GetResumeList = () =>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then((resp)=>{
      setResumeList(resp.data.data);
    },(error)=>{
      console.log(error);
    });
  }
  return (
    <div className='p-8 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5'>
        <AddResume />
        {resumeList.length>0 && resumeList.map((resume,index) => (
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumeList}/>
        ))}
        
      </div>
    </div>
  )
}
