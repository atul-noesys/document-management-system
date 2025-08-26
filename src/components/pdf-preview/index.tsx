interface PDFPreviewProps {
  pdfUrl: string;
  docName: string;
}

export function PDFPreview({ pdfUrl, docName }: PDFPreviewProps) {
  
  return (
    <div className="rounded-lg shadow-sm h-full flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <iframe 
          src={"https://arxiv.org/pdf/2201.00626.pdf"}
          className="w-full h-full border border-gray-200 rounded-md shadow-sm"
          frameBorder="0"
          title={docName}
        />
      </div>
    </div>
  );
}