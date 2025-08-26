"use client";

import { Suspense } from "react";
import { PDFPreview } from "@/components/pdf-preview";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import { useStore } from "@/store/store-context";
import { Document } from "@/components/pdf-list";

type PropsType = {
  searchParams: Promise<{
    selected_pdf?: string;
  }>;
};

export default function ApproveDocument({ searchParams }: PropsType) {
  const { t, language } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const { nguageStore } = useStore();
  const [paginationData, setPaginationData] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await nguageStore.GetPaginationData({
        table: "documents",
        skip: 0,
        take: 10,
        NGaugeId: "1",
      });

      if (response && (response as any).data) {
        const financeData = (response as any).data.filter(
          (item: any) => item.Department === "Finance",
        );
        setPaginationData(financeData as Document[]);

        // Select the first document by default
        if (financeData.length > 0) {
          setSelectedDoc(financeData[0]);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent rendering until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="flex h-[calc(100vh-105px)] flex-col gap-6 lg:flex-row">
        <div className="w-full">
          <div className="h-full overflow-y-auto rounded-xl bg-white p-6 shadow-sm">
            {/* Skeleton loader while hydrating */}
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
    <div className="flex h-[calc(100vh-105px)] gap-4">
      <div className="flex-1">
        <Suspense
          fallback={<div className="animate-pulse rounded-lg bg-gray-100" />}
        >
          <PDFPreview
            pdfUrl={"https://arxiv.org/pdf/2201.00626.pdf"}
            docName={"Approval Document Preview"}
          />
        </Suspense>
      </div>
      <div className="flex-1">
        <div className="flex h-[calc(100vh-105px)] flex-col gap-6 lg:flex-row">
          {/* Form Section */}
          <div className="w-full">
            <div className="h-full overflow-y-auto rounded-xl bg-white p-6 shadow-sm">
              <h1
                className="mb-4.5 text-2xl font-bold text-gray-800"
                style={{
                  textAlign: language === "ar" ? "right" : "left",
                  direction: language === "ar" ? "rtl" : "ltr",
                }}
              >
                {t("approve_document")}
              </h1>
              <form className="space-y-6">
                {/* First row: Name and Document Type */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name Field */}
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
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={selectedDoc?.Name}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                      placeholder={t("enter_document_name")}
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                        direction: language === "ar" ? "rtl" : "ltr",
                      }}
                    />
                  </div>

                  {/* Document Type Field */}
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
                    </label>
                    <select
                      id="documentType"
                      name="documentType"
                      value={selectedDoc?.["Document Type"]}
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

                {/* Second row: Creator and Approver */}
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
                    </label>
                    <select
                      id="creator"
                      name="creator"
                      value={selectedDoc?.Creater}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                        direction: language === "ar" ? "rtl" : "ltr",
                      }}
                    >
                      <option value="">{t("select_creator")}</option>
                      <option value="Kiran H R">Kiran H R</option>
                      <option value="Sneha Nair">Sneha Nair</option>
                      <option value="Kiran Kumar">Kiran Kumar</option>
                      <option value="Neha Gupta">Neha Gupta</option>
                      <option value="Anjali Singh">Anjali Singh</option>
                    </select>
                  </div>

                  {/* Approver Field */}
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
                    </label>
                    <select
                      id="approver"
                      name="approver"
                      value={selectedDoc?.Approver}
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
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Memo Field (full width) */}
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
                    </label>
                    <textarea
                      id="memo"
                      name="memo"
                      rows={5}
                      value={selectedDoc?.Memo}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                      placeholder={t("add_memo_details")}
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                        direction: language === "ar" ? "rtl" : "ltr",
                      }}
                    />
                  </div>

                  {/* Attachment Field (full width) */}
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
                        className="flex h-[140px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-blue-500 hover:bg-blue-50"
                      >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                            <span className="font-semibold">
                              {selectedDoc?.attachment
                                ? selectedDoc?.attachment
                                : t("click_to_upload")}
                            </span>{" "}
                            {selectedDoc?.attachment
                              ? ""
                              : t("or_drag_and_drop")}
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedDoc?.attachment ? "" : t("pdf_max_10mb")}
                          </p>
                        </div>
                        <input
                          id="attachment"
                          name="attachment"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Third row: Status (full width) */}
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
                    </label>
                    <input
                      type="text"
                      id="status"
                      name="status"
                      value={selectedDoc?.Status}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                      placeholder={t("enter_document_status")}
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                        direction: language === "ar" ? "rtl" : "ltr",
                      }}
                    />
                  </div>

                  {/* Document Summary Field (full width) */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-gray-700"
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                        direction: language === "ar" ? "rtl" : "ltr",
                      }}
                    >
                      {t("document_summary")}
                    </label>
                    <input
                      type="text"
                      id="summary"
                      name="summary"
                      value={selectedDoc?.document_summary || ""}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                      placeholder={t("add_document_summary")}
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                        direction: language === "ar" ? "rtl" : "ltr",
                      }}
                    />
                  </div>
                </div>

                {/* Submit Button (full width) */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    {t("approve")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
