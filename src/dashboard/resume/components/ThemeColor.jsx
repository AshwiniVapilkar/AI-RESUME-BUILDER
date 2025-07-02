import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../../components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { data, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ThemeColor() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5433FF",
    "#FF335A",
    "#335AFF",
    "#A1FF33",
    "#FF33A1",
    "#000000",
  ];

  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const {resumeid} = useParams();
  const [selectedColor, setSelectedColor] = useState()
  const onColorSelect =(color)=>{
    setSelectedColor(color);
    setResumeInfo({
        ...resumeInfo,
        themeColor: color
    });

    GlobalApi.UpdateResumeDetail(resumeid,{
      data: {
        themeColor: color
      }
    }).then((res) =>{
        console.log(res);
        toast("Theme color updated successfully!");
    })
    console.log("resumeid:", resumeid);

  }


  
  return (
    <Popover>
      <PopoverTrigger asChild>
      <Button variant="outline" size="sm" className="flex gap-2">
            <LayoutGrid />
            Theme
          </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
        {colors.map((item,index) => (
            <div key={index} 
            onClick={()=>onColorSelect(item)}
            className={`h-5 w-5 border rounded-full 
            cursor-pointer hover:border-black
            ${selectedColor === item &&'border border-black'}
            `}
            style={{
                background: item,
            }}></div>
        ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
