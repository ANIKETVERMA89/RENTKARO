import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Helper to generate the common PDF content
const _createInvoiceDoc = (booking: any, userEmail: string | null) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // 1. Noir Theme Background
  doc.setFillColor(12, 12, 14); // #0c0c0e
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // 2. Header / Logo
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("RENTKARO", 20, 30);

  doc.setFontSize(10);
  doc.setTextColor(113, 113, 122); // #71717a
  doc.text("INVOICE / RECEIPT", pageWidth - 20, 30, { align: "right" });

  // 3. Decorative Line
  doc.setDrawColor(63, 63, 70); // #3f3f46
  doc.line(20, 40, pageWidth - 20, 40);

  // 4. Booking Details Section
  doc.setFontSize(10);
  doc.setTextColor(161, 161, 170); // #a1a1aa
  doc.text("BOOKING DETAILS", 20, 55);
  doc.text("CUSTOMER", 120, 55);

  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(`Booking ID: #${String(booking.id).slice(0, 8)}`, 20, 65);
  doc.text(`Vehicle: ${booking.car}`, 20, 72);
  doc.setFontSize(10);
  doc.setTextColor(113, 113, 122);
  doc.text(`Spec: ${booking.detail}`, 20, 78);

  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(userEmail || "Guest User", 120, 65);

  // 5. Item Table
  autoTable(doc, {
    startY: 95,
    head: [["DESCRIPTION", "PERIOD", "DURATION", "TOTAL"]],
    body: [
      [
        booking.car,
        booking.period,
        booking.duration,
        String(booking.amount).replace("₹", "Rs. ")
      ]
    ],
    theme: "plain",
    headStyles: {
      fillColor: [19, 19, 21], // #131315
      textColor: [113, 113, 122],
      fontSize: 9,
      fontStyle: "bold",
      halign: "left"
    },
    bodyStyles: {
      textColor: [255, 255, 255],
      fontSize: 11,
      cellPadding: 8
    },
    columnStyles: {
      3: { halign: "right", fontStyle: "bold", fontSize: 14 }
    },
    margin: { left: 20, right: 20 },
  });

  // 6. Status Badge
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFillColor(52, 211, 153, 0.1); // Green tint
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(pageWidth - 60, finalY, 40, 10, 2, 2, "FD");
  doc.setTextColor(52, 211, 153);
  doc.setFontSize(9);
  doc.text(booking.status.toUpperCase(), pageWidth - 40, finalY + 6.5, { align: "center" });

  // 7. Footer
  doc.setTextColor(82, 82, 91); // #52525b
  doc.setFontSize(9);
  doc.text("Thank you for choosing RentKaro. This is a computer-generated receipt.", pageWidth / 2, pageHeight - 20, { align: "center" });

  return doc;
};

export const generateInvoicePDF = (booking: any, userEmail: string | null) => {
  const doc = _createInvoiceDoc(booking, userEmail);
  doc.save(`RentKaro_Invoice_${String(booking.id).slice(0, 8)}.pdf`);
};

export const getInvoiceBase64 = (booking: any, userEmail: string | null): string => {
  const doc = _createInvoiceDoc(booking, userEmail);
  return doc.output("datauristring");
};

