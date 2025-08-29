"use client";

import { Suspense } from "react";
import { PDFPreview } from "@/components/pdf-preview";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import { useStore } from "@/store/store-context";
import { Document } from "@/components/pdf-list";
import { useRouter } from "next/navigation";

type PropsType = {
  searchParams: Promise<{
    selected_pdf?: string;
  }>;
};

const getStatusColor = (status: Document["Status"]) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Rework":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ApproveDocumentsList({ searchParams }: PropsType) {
  const { t, language } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const { nguageStore } = useStore();
  const [paginationData, setPaginationData] = useState<Document[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await nguageStore.GetPaginationData({
        table: "documents",
        skip: 0,
        take: 200,
        NGaugeId: "1",
      });

      if (response && (response as any).data) {
        setPaginationData(response.data as Document[]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleApprove = (documentId: number) => {
    router.push(`/approve-document/${documentId}`);
  };

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
    <div className="flex h-[calc(100vh-105px)] gap-4 overflow-y-auto">
      <div className="relative w-full overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-blue-700 text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
              >
                Document Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
              >
                Attachment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
              >
                Approver
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginationData.map((document) => (
              <tr key={document.ROWID} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {document.Name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {document.Department}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {document["Document Type"]}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div
                    className={`inline-flex rounded-full px-2 text-xs font-semibold ${getStatusColor(document.Status)}`}
                  >
                    {document.Status}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {document.attachment?.slice(42) ?? ""}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {document.Approver}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleApprove(document.ROWID)}
                    className={`w-32 rounded-md px-3 py-2 text-sm font-medium uppercase shadow-sm ${document.Status === "Approved" ? "bg-green-500 text-white hover:bg-green-700" : "bg-blue-700 text-white hover:bg-blue-900"}`}
                  >
                    {document.Status === "Approved" ? "✅ Approved" : "👁️ Review"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
