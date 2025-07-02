import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Brain, LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { generateSummary } from "../../../../service/AIModal";

const EXPERIENCE_PROMPT = `position title:{positionTitle}, depends on the position title, give me 4-5 bullet points to my experience  in resume,give me result in html format`;

export default function RichTextEditor({ value, onChange, index }) {
  // const [value, setValue] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].positionTitle) {
      toast("Please add a position title first.");
      return;
    }
    const prompt = EXPERIENCE_PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].positionTitle
    );
    const aiResult = await generateSummary(prompt);
    if (aiResult) {
      setResumeInfo((prev) => {
        const updatedExperience = [...prev.experience];
        updatedExperience[index].summary = aiResult;
        return {
          ...prev,
          experience: updatedExperience,
        };
      });
      console.log(typeof aiResult, aiResult)
      toast("✅ Experience generated from AI!");
    } else {
      toast("❌ Failed to generate experience. Try again shortly.");
    }
    
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={onChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}
