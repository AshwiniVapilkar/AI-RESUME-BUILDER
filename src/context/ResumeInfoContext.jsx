import { createContext, useContext, useState } from "react";

// 1. Create the context
export const ResumeInfoContext = createContext();

// 2. Create a hook (optional but convenient)
export const useResumeInfo = () => useContext(ResumeInfoContext);

// 3. Create the provider component
export const ResumeInfoProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState({
    firstName: 'James',
    lastName: 'Carter',
    jobTitle: 'Full Stack Developer',
    address: '525 N Tryon Street, NC 28117',
    phone: '(123)-456-7890',
    email: 'example@gmail.com',
    themeColor: "#ff6666",
    summary: 'Lorem ipsum...',
    // add experience, education, skills etc. as needed
  });

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
