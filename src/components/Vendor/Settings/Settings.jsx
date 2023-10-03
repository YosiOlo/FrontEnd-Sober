import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Generalinformation from "./Generalinformation";
import PayoutInfo from "./PayoutInfo";
import Tax from "./tax";
import ExtendedInfo from "./ExtendedInfo";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");
 
  return (
    <div className="text-black">
      <div className="flex space-x-4">
        <button
          className={`${
            activeTab === "general" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded`}
          onClick={() => setActiveTab("general")}
        >
          General Information
        </button>
        <button
          className={`${
            activeTab === "tax" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded`}
          onClick={() => setActiveTab("tax")}
        >
          Tax Info
        </button>
        <button
          className={`${
            activeTab === "payout" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded`}
          onClick={() => setActiveTab("payout")}
        >
          Payout Info
        </button>
        <button
          className={`${
            activeTab === "extended" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 rounded`}
          onClick={() => setActiveTab("extended")}
        >
          Extended Info
        </button>
      </div>

      {activeTab === "general" && (
        <Generalinformation/>
      )}

      {activeTab === "tax" && (
        <Tax/>
      )}

      {activeTab === "payout" && (
        <PayoutInfo/>
      )}
      {activeTab === "extended" && (
        <ExtendedInfo/>
      )}
    </div>
  );
}

export default Settings;
