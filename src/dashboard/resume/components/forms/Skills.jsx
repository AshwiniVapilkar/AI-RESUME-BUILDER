import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "../../../../components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Skills({ enableNext }) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skillList, setSkillList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  const handleChane = (index, name, value) => {
    const newEntries = [...skillList];
    newEntries[index][name] = value;
    setSkillList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillList([
      ...skillList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const RemoveSkills = () => {
    if (skillList.length > 1) {
      setSkillList((prev) => prev.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);

    const validSkills = skillList.filter(
      (skill) => skill.name.trim() !== "" && typeof skill.rating === "number"
    );

    const data = {
      data: {
        skills: validSkills,
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeid, data)
      .then((resp) => {
        console.log("Save success:", resp);
        setResumeInfo((prev) => ({
          ...prev,
          skills: validSkills,
        }));
        setLoading(false);
        toast("Skills updated successfully!");
      })
      .catch((error) => {
        console.error("Save error:", error);
        setLoading(false);
        toast("server error, please try again later");
      });
  };


  // Load skills from resumeInfo on mount
  useEffect(() => {
    if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
      setSkillList(
        resumeInfo.skills.map((skill) => ({
          name: skill.name || "",
          rating: skill.rating || 0,
        }))
      );
    }
  }, [resumeInfo.skills]);

  // Allow next step
  useEffect(() => {
    enableNext(true);
  }, []);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add Your Top Professional key skills</p>

        <div>
          {skillList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-5 border p-3 mb-2 rounded-lg"
            >
              <div className="flex-1">
                <label className="text-xs">Name</label>
                <Input
                  className="w-full"
                  value={item.name || ""}
                  onChange={(e) => handleChane(index, "name", e.target.value)}
                />
              </div>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating || 0}
                onChange={(v) => handleChane(index, "rating", v)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <Button variant="outline" className="text-primary" onClick={AddNewSkills}>
              + Add More Skills
            </Button>
            <Button variant="outline" className="text-primary" onClick={RemoveSkills}>
              - Remove
            </Button>
          </div>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={loading}
            onClick={onSave}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
