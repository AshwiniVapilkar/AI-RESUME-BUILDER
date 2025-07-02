import { useEffect, useState } from "react";
import Header from "../../../components/custom/Header";
import { Button } from "../../../components/ui/button";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import ResumePreview from "../../../dashboard/resume/components/ResumePreview";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
export default function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeid } = useParams();

  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    GetResumeInfo();
  }, [updateFlag]);

  // useEffect(() => {
  //   GetResumeInfo();
  // }, []);

  // const GetResumeInfo = () => {
  //   GlobalApi.GetResumeById(resumeid)
  //     .then((resp) => {
  //       const resume = resp.data.data;
  //       console.log("Flattened Resume:", resume);
  //       setResumeInfo({
  //         id: resume.id,
  //         ...resume.attributes,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch resume:", err);
  //     });
  // };

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeid)
      .then((resp) => {
        const resume = resp.data?.data;
        console.log("Full API Response:", resp);
  
        if (resume) {
          setResumeInfo(resume); // <-- FIXED HERE
        } else {
          console.warn("Resume data missing in API response:", resp);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch resume:", err);
      });
  };
  
  

  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-40">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share unique
            resume url with friends and family
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Kindly open the link below to view my resume. Thank you!",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeid +
                  "/view",
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " Resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-40">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}
