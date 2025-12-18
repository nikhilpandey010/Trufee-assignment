export function exportCSV(feedbacks) {
  const ratingMap = {
    "😊": 3,
    "😐": 2,
    "☹️": 1
  };

  const headers = ["RefID", "Rating", "Message", "Category", "Date"];
  
  const rows = feedbacks.map((f) => {
    
    const ratingValue = ratingMap[f.rating] || 0;

    return [
      f.id,
      ratingValue, 
      `"${f.text.replace(/"/g, '""')}"`, 
      f.category,
      new Date(f.date).toISOString()
    ];
  });

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "feedbacks.csv";
  a.click();
  URL.revokeObjectURL(url);
}
