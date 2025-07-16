import React, { forwardRef } from "react";

const ResumePreview = forwardRef(({ formData }, ref) => {
  return (
    <div
      ref={ref}
      className="max-w-md mx-auto bg-indigo-50 rounded-xl shadow-xl p-8 text-indigo-900"
      style={{ minHeight: 350 }}
    >
      <h1 className="text-4xl font-extrabold mb-3 border-b-4 border-indigo-600 pb-1">
        {formData.name || "Full Name"}
      </h1>
      <p className="text-lg italic mb-6">{formData.email || "Email"}</p>
      <section>
        <h2 className="text-2xl font-semibold mb-3 border-b border-indigo-300 pb-1">
          About Me
        </h2>
        <p className="whitespace-pre-line leading-relaxed text-indigo-800">
          {formData.about || "Write something about yourself..."}
        </p>
      </section>
    </div>
  );
});

export default ResumePreview;
