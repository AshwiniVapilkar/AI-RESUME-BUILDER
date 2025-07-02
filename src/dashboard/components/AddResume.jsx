import { Loader2, PlusSquare } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; 

export default function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();


  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeid: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data).then((resp) => {
      console.log(resp.data.data.documentId);
      if(resp){
        setLoading(false);
        navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit")
      }
    },(error)=>{
      setLoading(false);
    });
  };
  return (
    <div>
      <div
        className="mt-4 p-14 w-[200px] py-28 border flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 
    transition-all hover:shadow-md cursor-pointer 
    border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <span>Add a title for your new Resume</span>
              <Input
                className="my-2"
                placeholder="Full Stack Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button
                className="cursor-pointer"
                onClick={() => setOpenDialog(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
                className="cursor-pointer"
              >
                {loading ? <Loader2 className='animate-spin' /> : 'Create'} 
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
