import { LoaderCircle, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { themeColor } from "@/dashboard/resume/components/ThemeColor";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";

export default function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  const [resumeInfo, setResumeInfo] = useState();

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (res) => {
        console.log("Resume deleted successfully", res);
        toast("Resume deleted successfully!");
        setOpenAlert(false);
        refreshData();
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  // const onMenuClick = (url) =>{
  //   navigation(url);
  // }

  return (
    <div>
      <Link
        to={"/dashboard/resume/" + resume.documentId + "/edit"}
        className="flex flex-col items-center justify-center"
      >
        <div
          className="m-4 w-[200px] bg-gradient-to-b from-[#ffe1c1] via-[#ffaf7b] to-[#ff7e2d]
         py-28 bg-secondary 
        flex items-center justify-center h-[280px] border border-primary 
        rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer"
        style={{
          background: `linear-gradient(to bottom, ${resume?.themeColor}33, ${resume?.themeColor}99, ${resume?.themeColor})`,
        }}
        
        >
          {/* <Notebook/> */}
          <img src="/resume.png" width={80} height={80} alt="resume" />
        </div>
      </Link>
      <div
        className="border mx-2 p-3 flex justify-between rounded-lg"
        style={{
          background: resume?.themeColor,
          color: "#fff",
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.documentId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Delete "
                )}
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
