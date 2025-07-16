import React from "react";

const ResumeForm = ({ formData, setFormData }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        Build Your CV
      </h2>
      <div className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
        <textarea
          rows={5}
          placeholder="About You"
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          className="w-full px-5 py-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
      </div>
    </div>
  );
};

export default ResumeForm;
