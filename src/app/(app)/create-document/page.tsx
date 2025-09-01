"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useStore } from "@/store/store-context";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const developmentCreators = ["Akash", "Rakesh", "Kiran H R"];

const ItCreators = [
  "Neha Gupta",
  "Vikas Kapoor",
  "Riya Das",
  "Manish Pawar",
  "Sonal Thakur",
  "Harsha Gill",
  "Kritika Bansal",
  "Gaurav Acharya",
  "Tanvi Shetty",
  "Rahul Sharma",
];

const HrCreators = [
  "Harish Verghese",
  "Jyoti Sandhu",
  "Nisha Trivedi",
  "Pooja Jain",
  "Priya Mehta",
  "Radhika Pathak",
  "Rohit Malhotra",
  "Shreya Joshi",
  "Tarun Agarwal",
  "Varun Ghosh",
];

const AdminCreators = [
  "Anita Dixit",
  "Deepak Rao",
  "Divya Menon",
  "Ishita Pandey",
  "Maya Arora",
  "Nikhil Bose",
  "Ramesh Mukherjee",
  "Sneha Nair",
  "Swati Naidu",
  "Vivek Sethi",
];

const OperationsCreators = [
  "Aakash Nanda",
  "Aditya Khanna",
  "Alok Bhatia",
  "Ashish Kulkarni",
  "Kavya Mishra",
  "Kiran Kumar",
  "Meera Iyer",
  "Pallavi Gowda",
  "Rajesh Yadav",
  "Sanjay Reddy",
];

const FinanceCreators = [
  "Abhishek Saxena",
  "Amit Chopra",
  "Anjali Singh",
  "Arjun Verma",
  "Chetan Rajput",
  "Monika Banerjee",
  "Parth Desai",
  "Preeti Chaudhary",
  "Sameer Kohli",
  "Simran Patel",
];

export default function CreateDocument() {
  const { t, language } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFormUploading, setIsFormUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [fileName, setFileName] = useState("");
  const { nguageStore } = useStore();
  const [formData, setFormData] = useState({
    Name: "",
    Memo: "",
    "Document Type": "",
    attachment: "",
    Creater: "",
    Approver: "",
    Status: "Pending",
    created_on: new Date().toISOString().split("T")[0],
    "Due Date": new Date().toISOString().split("T")[0],
    unique_id: uuidv4(),
    Department: "",
    Priority: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError("");

    try {
      const fileNameToUpload = "Ngauge" + uuidv4() + file.name;
      const response = await nguageStore.UploadAttachFile(
        file,
        fileNameToUpload,
      );

      if (response) {
        setFormData({ ...formData, attachment: fileNameToUpload });
        setFileName(fileNameToUpload);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file.name, file.type, file.size);
      handleFileUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormUploading(true);
    await nguageStore.AddDataSourceRow(formData);
    setIsFormUploading(false);
    setFormData({
      Name: "",
      Memo: "",
      "Document Type": "",
      attachment: "",
      Creater: "",
      Approver: "",
      Status: "Pending",
      created_on: new Date().toISOString().split("T")[0],
      "Due Date": new Date().toISOString().split("T")[0],
      unique_id: uuidv4(),
      Department: "",
      Priority: "",
    });
    console.log("Form submitted!", formData);
  };

  if (!isClient) {
    return (
      <div className="flex h-[calc(100vh-105px)] flex-col gap-6 lg:flex-row">
        <div className="w-full">
          <div className="h-full overflow-y-auto rounded-xl bg-white p-6 shadow-sm">
            <div className="animate-pulse">
              <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="h-12 rounded bg-gray-200"></div>
                  <div className="h-12 rounded bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="h-12 rounded bg-gray-200"></div>
                  <div className="h-12 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-105px)] flex-col gap-6 lg:flex-row">
      {/* Form Section */}
      <div className="w-full">
        <div className="h-full overflow-y-auto rounded-xl bg-white p-6 shadow-sm">
          <h1
            className="mb-5 text-2xl font-bold text-gray-800"
            style={{
              textAlign: language === "ar" ? "right" : "left",
              direction: language === "ar" ? "rtl" : "ltr",
            }}
          >
            {t("create_new_document")}
          </h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("document_name")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.Name}
                  onChange={(e) =>
                    setFormData({ ...formData, Name: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                  placeholder={t("enter_document_name")}
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                />
              </div>
              {/* Department Field */}
              <div>
                <label
                  htmlFor="department"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("department")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                  value={formData.Department}
                  onChange={(e) =>
                    setFormData({ ...formData, Department: e.target.value })
                  }
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  <option value="">{t("select_department")}</option>
                  <option value="Development">Development</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Admin">Admin</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Creator Field */}
              <div>
                <label
                  htmlFor="creator"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("creator")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <select
                  id="creator"
                  name="creator"
                  value={formData.Creater}
                  onChange={(e) => {
                    setFormData({ ...formData, Creater: e.target.value });
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  <option value="">{t("select_creator")}</option>
                  {(formData.Department === "Development"
                    ? developmentCreators
                    : formData.Department === "Finance"
                      ? FinanceCreators
                      : formData.Department === "IT"
                        ? ItCreators
                        : formData.Department === "HR"
                          ? HrCreators
                          : formData.Department === "Admin"
                            ? AdminCreators
                            : formData.Department === "Operations"
                              ? OperationsCreators
                              : []
                  ).map((creator, index) => (
                    <option key={index} value={creator}>
                      {creator}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="documentType"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("document_type")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <select
                  id="documentType"
                  name="documentType"
                  value={formData["Document Type"]}
                  onChange={(e) => {
                    if (e.target.value === "Report") {
                      setFormData({
                        ...formData,
                        "Document Type": e.target.value,
                        Approver: "Naresh Jois",
                      });
                    } else if (e.target.value === "Notice") {
                      setFormData({
                        ...formData,
                        "Document Type": e.target.value,
                        Approver: "Kiran H R",
                      });
                    } else if (e.target.value === "Letter") {
                      setFormData({
                        ...formData,
                        "Document Type": e.target.value,
                        Approver: "Smitha Boppana",
                      });
                    }
                  }}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  <option value="">{t("select_document_type")}</option>
                  <option value="Report">Report</option>
                  <option value="Notice">Notice</option>
                  <option value="Letter">Letter</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="approver"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("approver")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <select
                  id="approver"
                  name="approver"
                  value={formData.Approver}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  <option value="">{t("select_approver")}</option>
                  <option value="Naresh Jois">Naresh Jois</option>
                  <option value="Smitha Boppana">Smitha Boppana</option>
                  <option value="Kiran H R">Kiran H R</option>
                </select>
              </div>

              {/* Approval Date Field */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("due_date")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData["Due Date"]}
                  onChange={(e) => {
                    setFormData({ ...formData, "Due Date": e.target.value });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="memo"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("memo")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <textarea
                  id="memo"
                  name="memo"
                  rows={2}
                  value={formData.Memo}
                  onChange={(e) => {
                    setFormData({ ...formData, Memo: e.target.value });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                  placeholder={t("add_memo_details")}
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("attachment")}
                </label>
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="attachment"
                    className={`flex h-[70px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 pt-3 transition-colors hover:border-blue-500 hover:bg-blue-50 ${isUploading ? "opacity-50" : ""}`}
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <span className="ml-2 text-sm text-gray-500">
                          Uploading...
                        </span>
                      </div>
                    ) : fileName ? (
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Uploaded:</span>{" "}
                        {fileName}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-4">
                        <svg
                          className="mb-3 h-10 w-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          {uploadError && (
                            <p className="mt-1 text-sm text-red-600">
                              {uploadError}
                            </p>
                          )}
                          {formData.attachment !== "" ? (
                            <span className="font-semibold">
                              {formData.attachment.slice(42)}
                            </span>
                          ) : (
                            <>
                              {" "}
                              <span className="font-semibold">
                                {t("click_to_upload")}
                              </span>{" "}
                              {t("or_drag_and_drop")}
                            </>
                          )}
                        </p>
                      </div>
                    )}
                    <input
                      id="attachment"
                      name="attachment"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="status"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("status")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={formData.Status}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                  placeholder={t("enter_document_status")}
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                />
              </div>

              {/* Priority Field (full width) */}
              <div>
                <label
                  htmlFor="priority"
                  className="mb-1 block text-sm font-medium text-gray-700"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {t("priority")}
                  <span className="ml-1 font-bold text-red-500">*</span>
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.Priority}
                  onChange={(e) => {
                    setFormData({ ...formData, Priority: e.target.value });
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                  style={{
                    textAlign: language === "ar" ? "right" : "left",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  <option value="">{t("select_priority")}</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Submit Button (full width) */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                {isFormUploading && (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  </>
                )}
                {t("add_document")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
