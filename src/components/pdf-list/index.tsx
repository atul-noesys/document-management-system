"use client";

import { useTranslation } from "@/hooks/useTranslation";

export type Document = {
  Name: string;
  Memo: string;
  "Document Type": "Report" | "Notice" | "Letter";
  attachment: string | null;
  Creater: string;
  Approver: string;
  Status: "Rework" | "Approved" | "Pending";
  InfoveaveBatchId: number;
  document_summary: string | null;
  created_on: string;
  approved_on: string | null;
  "Due Date": string;
  comments: string | null;
  unique_id: string;
  Department: "Development" | "Admin" | "Operations" | "IT" | "HR" | "Finance";
  Priority: "High" | "Medium" | "Low";
  ROWID: number;
};

interface PDFListProps {
  docs: Document[];
  selectedDocId?: number | null;
  onDocSelect: (doc: Document) => void;
}

export function PDFList({ docs, selectedDocId, onDocSelect }: PDFListProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-right">{t("documents")}</h2>
      
      {docs.length === 0 ? (
        <div className="flex items-center justify-center h-[75vh] text-gray-500">
          {t("noDocuments")}
        </div>
      ) : (
        <div className="space-y-2">
          {docs.map((doc) => (
            <div
              key={doc.ROWID}
              className={`block p-3 rounded-md transition-colors cursor-pointer ${
                selectedDocId === doc.ROWID
                  ? "bg-blue-50 border border-blue-200 text-blue-700"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
              onClick={() => onDocSelect(doc)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 text-right">
                  <h3 className="font-medium text-sm truncate">{doc.Name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.created_on} • {doc.Department}
                  </p>
                </div>
                <div className="bg-red-50 p-2 rounded">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}