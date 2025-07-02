import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

export default function Education() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState(
    resumeInfo?.education?.length
      ? resumeInfo.education
      : [
          {
            universityName: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);

    // Update context live
    setResumeInfo((prev) => ({
      ...prev,
      education: newEntries,
    }));
  };

  const AddNewEducation = () => {
    const updated = [
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    setEducationalList(updated);
    setResumeInfo((prev) => ({
      ...prev,
      education: updated,
    }));
  };

  const RemoveEducation = () => {
    const updated = educationalList.slice(0, -1);
    setEducationalList(updated);
    setResumeInfo((prev) => ({
      ...prev,
      education: updated,
    }));
  };

  // const onSave = () => {
  //   setLoading(true);
  //   const data = {
  //     data: {
  //       education: educationalList,
  //     },
  //   };

  //   GlobalApi.UpdateResumeDetail(params.resumeid, data).then(
  //     (resp) => {
  //       setLoading(false);
  //       toast("Education details updated successfully!");
  //     },
  //     (error) => {
  //       setLoading(false);
  //       toast("Server error, please try again later.");
  //     }
  //   );
  // };

  const onSave = () => {
    setLoading(true);
    const payload = {
      data: {
        education: educationalList.map(({ id, ...rest }) => ({ ...rest })),
      },
    };
  
    GlobalApi.UpdateResumeDetail(params.resumeid, payload)
      .then(() => {
        setLoading(false);
        toast("Education details updated successfully!");
      })
      .catch((error) => {
        setLoading(false);
        console.error("🔥 Strapi Response:", error.response?.data);
        toast("Server error, please try again later.");
      });
  };
  

  
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details</p>

        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 p-3 mt-5 my-5 border rounded-lg">
                <div className="col-span-2">
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    value={item.universityName || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    value={item.degree || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    value={item.major || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item.startDate || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item.endDate || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2">
                  <label>Description</label>
                  <Textarea
                    name="description"
                    value={item.description || ""}
                    onChange={(e) => handleChange(e, index)}
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
              onClick={AddNewEducation}
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveEducation}
            >
              - Remove
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
