import React from 'react'


export default function SkillPreview({resumeInfo}) {
  return (
    <div>
        <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      <div className='grid grid-cols-2 gap-3 my-4'>
        {(resumeInfo?.skills || []).map((skill,index) => (
            <div key={index} className='flex items-center justify-between'>
                <h2 className='text-xs'>{skill.name}</h2>
                <div className='h-2 bg-gray-100 w-[120px] overflow-hidden'>
                    <div className='h-2'
                    style={{
                        backgroundColor: resumeInfo?.themeColor || '#FF7E00',
                        width: Math.min((Number(skill?.rating) / 5) * 100, 100) + '%'
                    }}>
                    </div>
                    
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}
