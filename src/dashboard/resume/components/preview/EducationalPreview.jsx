import React from 'react'

export default  function EducationalPreview({resumeInfo}) {
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Education
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {(resumeInfo?.education || []).map((education,index) => (
        <div key={index} className="my-5">
          <h2 className='text-sm font-bold'
          style={{color:resumeInfo?.themeColor}}>
            {education?.universityName}</h2>
          <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}
          <span>{formatDate(education?.startDate)} To {formatDate(education?.endDate)}</span>
          </h2>
          <p className='text-xs my-2'>
            {education?.description}
          </p>
        </div>
      ))}
    </div>
  )
}
