import React, { use, useContext, useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import RichTextEditor from "../RichTextEditor";
import GlobalApi from "./../../../../../service/GlobalApi";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
const formField = {
  positionTitle: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  summary: "",
};
export default function Experience({ onRichTextEditorChange, enableNext }) {
  const [experienceList, setExperienceList] = useState([formField]);

  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [loading, setLoading] = useState(false);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };

  const RemoveExperience = () => {
    // setExperienceList([(experienceList) => experienceList.slice(0, -1)]);
    setExperienceList((prev) => prev.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList,
      },
    };
    console.log(data);
    GlobalApi.UpdateResumeDetail(params.resumeid, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Experience details updated successfully!");
      },
      (error) => {
        setLoading(false);
        toast("server error, please try again later");
      }
    );
  };


  
  
  
  

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
    enableNext(true);
  }, [experienceList]);

  return (
    <div>
      <div
        className="p-5 shadow-lg rounded-lg border
   border-t-primary border-t-4 mt-10"
      >
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your Previous Job Experience</p>
        <div>
          {Array.isArray(resumeInfo?.experience) &&
            resumeInfo.experience.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                  <div>
                    <label className="text-xs">Position Title</label>
                    <Input
                      name="positionTitle"
                      value={item.positionTitle || ""}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div>
                    <label className="text-xs">Company Name</label>
                    <Input
                      name="companyName"
                      value={item.companyName || ""}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div>
                    <label className="text-xs">City</label>
                    <Input
                      name="city"
                      value={item.city || ""}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div>
                    <label className="text-xs">State</label>
                    <Input
                      name="state"
                      value={item.state || ""}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div>
                    <label className="text-xs">Start Date</label>
                    <Input
                      type="date"
                      name="startDate"
                      value={item.startDate || ""}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div>
                    <label className="text-xs">End Date</label>
                    <Input
                      type="date"
                      name="endDate"
                      value={item.endDate || ""}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div className="col-span-2">
                    {/* work summery  */}
                    {/* <RichTextEditor
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                  /> */}
                    <RichTextEditor
                      index={index}
                      value={item.summary}
                      onChange={(event) =>
                        handleRichTextEditor(event, "summary", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewExperience}
            >
              {" "}
              + Add More Experience{" "}
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveExperience}
            >
              {" "}
              - Remove{" "}
            </Button>
          </div>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={loading}
            onClick={() => onSave()}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
