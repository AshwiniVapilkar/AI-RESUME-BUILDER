import React, { useContext, useState } from "react";
import { Button } from "../../../../components/ui/button";
import Textarea from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { generateSummary } from "../../../../../service/AIModal";

const SUMMARY_PROMPT = `Write a short, professional summary for a {jobTitle}. 
Avoid repeating any years of experience unless explicitly given. Focus on technical skills, strengths, and industry relevance.`;

export default function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const handleChange = (e) => {
    const value = e.target.value;
    setResumeInfo({
      ...resumeInfo,
      summary: e.target.value,
    });
    if (value.trim().length > 0) {
      enableNext(true);
    } else {
      enableNext(false);
    }
  };


  const GenerateSummaryFromAI = async () => {
    try {
      if (!resumeInfo?.jobTitle || resumeInfo.jobTitle.trim().length === 0) {
        toast("Please enter a job title first.");
        return;
      }
  
      setLoading(true);
      const PROMPT = SUMMARY_PROMPT.replace("{jobTitle}", resumeInfo.jobTitle);
      const aiResult = await generateSummary(PROMPT);
  
      setResumeInfo((prev) => ({
        ...prev,
        summary: aiResult.trim(),
      }));
      enableNext(true);
      toast("✅ Summary generated from AI!");
    } catch (error) {
      console.error("AI error:", error);
      toast("❌ Failed to generate summary. Try again shortly.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
      summary: resumeInfo.summary?.trim() || "Default summary",
      }

    };

    // const data = {
    //   summary: resumeInfo.summary?.trim() || "Default summary",
    // };

    
    console.log("Sending summary:", resumeInfo.summary);
    GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(
      (resp) => {
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add Summary for your job title</p>

      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summary</label>
          <Button
            variant="outline" type='button'
            size="sm"
            className="border-primary text-primary
             hover:bg-primary hover:text-white flex gap-2 cursor-pointer"
             onClick={GenerateSummaryFromAI}
          ><Brain className="h-4 w-4"/>
            Generate From AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          required
          value={resumeInfo?.summary || ""}
          onChange={handleChange}
        />
        <div className="mt-3 flex justify-end">
          <Button type='submit' className='cursor-pointer'
          disabled={loading}>
            {loading?<LoaderCircle className="animate-spin"/>:'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}
