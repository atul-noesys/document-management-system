"use client";

import { Document, PDFList } from "@/components/pdf-list";
import { PDFListSkeleton } from "@/components/pdf-list/skeleton";
import { PDFPreview } from "@/components/pdf-preview";
import { useStore } from "@/store/store-context";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
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
        const financeData = (response as any).data.filter((item: any) => item.Department === "Finance");
        setPaginationData(financeData as Document[]);
        
        // Select the first document by default
        if (financeData.length > 0) {
          setSelectedDoc(financeData[0]);
        }
      }
    };

    fetchData();
  }, []);

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
          <PDFPreview 
            pdfUrl={`https://docms.infoveave.app/uploads/${selectedDoc?.attachment}` || "https://arxiv.org/pdf/2201.00626.pdf"} 
            docName={selectedDoc?.Name || "No document selected"}
          />
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