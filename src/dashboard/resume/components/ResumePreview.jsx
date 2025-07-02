import React from 'react'
import { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillPreview from './preview/SkillPreview';

export default function ResumePreview() {
    const {resumeInfo} = useContext(ResumeInfoContext);
    if (!resumeInfo || typeof resumeInfo !== 'object') {
      return <div>Loading resume...</div>; 
    }
  
  return (
    <div className='shadow-lg h-full p-14 border border-t-[20px]'
    style={{borderColor:resumeInfo?.themeColor

    }}>
        {/* Personal Details */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo}/>
        {/* Proffesional Experience  */}
        <ExperiencePreview resumeInfo={resumeInfo}/>
        {/* Education */}
        <EducationalPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
        <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

