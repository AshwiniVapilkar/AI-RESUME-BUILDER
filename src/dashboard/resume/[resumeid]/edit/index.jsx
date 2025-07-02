import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import dummy from '@/data/dummy';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import GlobalApi from '../../../../../service/GlobalApi';
export default function EditResume() {
    const params=useParams();
    const [resumeInfo,setResumeInfo] = useState();

    useEffect(() => {
      GetResumeInfo();
    },[]);


    const GetResumeInfo = () => {
      GlobalApi.GetResumeById(params.resumeid)
        .then(resp => {
          console.log(resp.data.data);
          setResumeInfo(resp.data.data);
        })
        .catch(err => {
          console.error("Failed to fetch resume:", err);
        });
    };
    
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* form section*/}
      <FormSection/>
       {/* preview section*/}
       <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}