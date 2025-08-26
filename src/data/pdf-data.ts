const pdfListData = [
  {
    id: "1",
    title: "Quarterly Financial Report Q1 2023",
    date: "Mar 15, 2023",
    size: "2.4 MB",
  },
  {
    id: "2",
    title: "Project Proposal - Marketing Campaign",
    date: "Apr 2, 2023",
    size: "3.1 MB",
  },
  {
    id: "3",
    title: "User Research Findings - April",
    date: "Apr 18, 2023",
    size: "5.2 MB",
  },
  {
    id: "4",
    title: "Technical Documentation v2.3",
    date: "May 5, 2023",
    size: "4.7 MB",
  },
  {
    id: "5",
    title: "Client Contract - ABC Corporation",
    date: "May 12, 2023",
    size: "1.8 MB",
  },
  {
    id: "6",
    title: "Team Performance Review Q2",
    date: "Jun 30, 2023",
    size: "3.5 MB",
  },
];

export function getPDFList() {
  return pdfListData;
}

export async function getPDFUrl(pdfId: string) {
  // In a real app, this would return the actual PDF URL
  // For demo purposes, we'll return a sample PDF from the web
  return `https://arxiv.org/pdf/2201.00626.pdf`;
}
