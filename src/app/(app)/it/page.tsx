"use client";

import { Document, PDFList } from "@/components/pdf-list";
import { PDFListSkeleton } from "@/components/pdf-list/skeleton";
import { PDFPreview } from "@/components/pdf-preview";
import { useStore } from "@/store/store-context";
import { Suspense, useEffect, useState, useCallback } from "react";

export default function IT() {
  const { nguageStore } = useStore();
  const [paginationData, setPaginationData] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await nguageStore.GetPaginationData({
          table: "documents",
          skip: 0,
          take: 200,
          NGaugeId: "1",
        });

        if (response && (response as any).data) {
          const financeData = (response as any).data.filter(
            (item: any) => item.Department === "IT" && item.attachment,
          );
          setPaginationData(financeData as Document[]);

          // Select the first document by default
          if (financeData.length > 0) {
            setSelectedDoc(financeData[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch documents:", err);
        setError("Failed to load documents");
      }
    };

    fetchData();
  }, []);

  // Create a stable callback for fetching PDF
  const fetchPdf = useCallback(async (doc: Document | null) => {
    if (!doc?.attachment) {
      setPdfUrl(null);
      return;
    }

    setLoadingPdf(true);
    setError(null);

    try {
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("access_token");
      }

      // Create a new URL for the API call
      const apiUrl = `/api/GetPdfUrl?attachment=${encodeURIComponent(doc.attachment)}`;
      
      const pdfResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!pdfResponse.ok) {
        throw new Error(
          `Failed to fetch PDF: ${pdfResponse.status} ${pdfResponse.statusText}`,
        );
      }

      // Create a blob from the response
      const pdfBlob = await pdfResponse.blob();

      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(blobUrl);
    } catch (err) {
      console.error("Failed to fetch PDF:", err);
      setError(err instanceof Error ? err.message : "Failed to load PDF");
      setPdfUrl(null);
    } finally {
      setLoadingPdf(false);
    }
  }, []);

  useEffect(() => {
    // Clean up previous blob URL
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    
    // Fetch new PDF
    fetchPdf(selectedDoc);
  }, [selectedDoc, fetchPdf]); // Add fetchPdf to dependencies

  const handleDocSelect = (doc: Document) => {
    setSelectedDoc(doc);
  };

  return (
    <div className="flex h-[calc(100vh-105px)] gap-4">
      {/* PDF Preview Section - Takes about 70% of width */}
      <div className="flex-1">
        <Suspense
          fallback={<div className="animate-pulse rounded-lg bg-gray-100" />}
        >
          {error ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-lg font-medium text-red-500">
                  Error
                </div>
                <div className="text-gray-600">{error}</div>
                <button
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : loadingPdf ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                <div className="mt-4 text-gray-600">Loading PDF...</div>
              </div>
            </div>
          ) : (
            <PDFPreview
              pdfUrl={pdfUrl || "https://arxiv.org/pdf/2201.00626.pdf"}
              docName={selectedDoc?.Name || "No document selected"}
            />
          )}
        </Suspense>
      </div>

      {/* PDF List Section - Takes about 30% of width */}
      <div className="md:w-2/6 lg:w-[30%]">
        <Suspense fallback={<PDFListSkeleton />}>
          <PDFList
            docs={paginationData}
            selectedDocId={selectedDoc?.ROWID}
            onDocSelect={handleDocSelect}
          />
        </Suspense>
      </div>
    </div>
  );
}