import React from "react";

export default function ExperiencePreview({ resumeInfo }) {
  const formatDate = (dateStr) => {
    if (!dateStr || !dateStr.includes("-")) return "";

    const [year, month, day] = dateStr.split("-");

    // Add leading zeros to day and month
    const d = day.padStart(2, "0");
    const m = month.padStart(2, "0");

    return `${d}/${m}/${year}`;
  };

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      {(resumeInfo?.experience || []).map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName},{experience?.city},{experience?.state}
            <span>
              {formatDate(experience?.startDate)} To{" "}
              {!experience?.endDate
                ? "present"
                : formatDate(experience?.endDate)}
            </span>
          </h2>
          {/* <p className="text-xs my-2">
            {experience?.workSummery}
          </p> */}
          <div className="text-xs mt-2 prose prose-sm list-disc pl-5" dangerouslySetInnerHTML={{ __html: experience?.summary }} />

          {/* <div
            className="text-xs mt-2 prose prose-sm prose-ul:list-disc prose-ol:list-decimal prose-li:ml-5 prose-ul:pl-5 prose-ol:pl-5"
            dangerouslySetInnerHTML={{
              __html: experience?.workSummery || "<p>No summary available.</p>",
            }}
          /> */}
        </div>
      ))}
    </div>
  );
}
