export function PDFListSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-3 rounded-md border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}