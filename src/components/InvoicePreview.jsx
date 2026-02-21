import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer } from 'lucide-react';

const Quotation = ({ quotation }) => {

  const generatePDF = async () => {
    // Force specific light mode text colors for PDF generation regardless of current theme
    const original = document.getElementById("pdf-target");
    if (!original) return null;
    
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    
    Object.assign(iframe.style, {
      position: "fixed",
      top: "-10000px",
      left: "-10000px",
      width: "794px",
      height: "1123px",
      border: "none",
      visibility: "hidden"
    });

    const doc = iframe.contentWindow.document;
    doc.open();
    // Using explicit colors in the style block ensuring PDF is always black text on white background
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              font-family: 'Inter', sans-serif;
              background: white;
              color: #111827 !important; /* Force black text */
              font-size: 13px;
              line-height: 1.4;
            }

            .page {
              width: 794px;
              min-height: 1123px;
              padding: 50px 60px;
              background-color: white !important;
              box-sizing: border-box;
              page-break-after: always;
            }

            /* Force all text elements to be dark for PDF */
            h1, h2, p, span, div, td, th {
               color: #111827 !important;
            }
            .text-gray-500, .text-gray-600 {
                color: #4b5563 !important;
            }
            .bg-gray-100 {
                background-color: #f3f4f6 !important;
            }
            
            h1 {
              font-family: 'Inter', sans-serif;
              font-size: 26px;
              font-weight: 700;
              text-align: center;
              margin-bottom: 30px;
              color: #111827 !important;
              letter-spacing: 3px;
            }

            .header-grid {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }

            .from-section, .to-section {
              width: 48%;
            }

            .section-title {
              font-size: 14px;
              font-weight: 700;
              color: #111827 !important;
              margin-bottom: 10px;
            }

            .company-name {
              font-size: 12px;
              font-weight: 700;
              color: #111827 !important;
              margin-bottom: 5px;
            }

            .address-line {
              font-size: 11px;
              color: #374151 !important;
              margin: 2px 0;
            }

            .to-row {
              display: flex;
              margin: 5px 0;
              font-size: 11px;
            }

            .to-label {
              font-weight: 600;
              width: 60px;
              color: #111827 !important;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 11px;
            }

            th, td {
              border: 1px solid #d1d5db !important;
              padding: 10px 12px;
              text-align: left;
              vertical-align: middle;
            }

            thead th {
              background-color: #f3f4f6 !important;
              font-weight: 600;
              color: #111827 !important;
            }

            tbody td {
              background-color: white !important;
            }

            .info-table td:first-child {
              font-weight: 600;
              color: #111827 !important;
              width: 50%;
            }

            .items-table th:first-child { width: 50px; }
            .items-table th:nth-child(2) { width: 35%; }
            .items-table th:nth-child(3) { width: 20%; }
            .items-table th:nth-child(4) { width: 60px; text-align: center; }
            .items-table th:nth-child(5) { width: 20%; text-align: right; }
            .items-table td:nth-child(4) { text-align: center; }
            .items-table td:nth-child(5) { text-align: right; }

            .grand-total-row td {
              font-weight: 700;
              font-size: 12px;
            }

            .grand-total-row td:last-child {
              border: 2px solid #111827 !important;
              color: #111827 !important;
            }

            .pdf-footer-section {
              margin-top: 30px;
              font-size: 11px;
              line-height: 1.5;
              padding: 15px;
              background-color: #f9fafb !important;
              border: 1px solid #e5e7eb !important;
            }

            .pdf-footer-section h2 {
              font-size: 12px;
              font-weight: 700;
              color: #111827 !important;
              margin: 15px 0 8px;
            }

            .pdf-footer-section h2:first-child {
              margin-top: 0;
            }

            .pdf-footer-section p {
              margin: 3px 0;
              font-size: 11px;
              color: #374151 !important;
            }

            @page {
              size: A4;
              margin: 0;
            }

            html, body {
              width: 100%;
              height: 100%;
              background: white !important;
              overflow: visible;
            }
          </style>
        </head>
        <body>
          <div class="page" id="page1">${original.querySelector("#pdf-main")?.innerHTML || original.innerHTML}</div>
          <div class="page" id="page2">${original.querySelector(".pdf-footer-section")?.innerHTML || ""}</div>
        </body>
      </html>
    `);
    doc.close();

    return new Promise((resolve) => {
      setTimeout(async () => {
        const page1 = iframe.contentWindow.document.getElementById("page1");
        const page2 = iframe.contentWindow.document.getElementById("page2");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfW = pdf.internal.pageSize.getWidth();

        const canvas1 = await html2canvas(page1, { scale: 2 });
        pdf.addImage(canvas1.toDataURL("image/png"), "PNG", 0, 0, pdfW, (canvas1.height * pdfW) / canvas1.width);

        if (page2 && page2.innerHTML.trim() !== "") {
          const canvas2 = await html2canvas(page2, { scale: 2 });
          pdf.addPage();
          pdf.addImage(canvas2.toDataURL("image/png"), "PNG", 0, 0, pdfW, (canvas2.height * pdfW) / canvas2.width);
        }

        document.body.removeChild(iframe);
        resolve(pdf);
      }, 600);
    });
  };

  const getFileName = () => {
    const name = quotation.customerName?.trim() || "Customer";
    const sanitizedName = name.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
    const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    return `Quotation_${sanitizedName}_${today}.pdf`;
  };

  const handlePrint = async () => {
    const pdf = await generatePDF();
    if (pdf) {
      const fileName = getFileName();
      pdf.save(fileName);
    }
  };

  const applyTHStyles = () => {
    document.querySelectorAll(".cd").forEach(cd => cd.classList.remove("border"));

    const target = document.getElementById("pdf-target");
    if (!target) return;

    target.querySelectorAll("th").forEach(th => {
        th.style.backgroundColor = "#f3f4f6";
        th.style.color = "#374151";
        // User requested more padding
        th.style.padding = "8px"; 
        th.style.border = "1px solid #e5e7eb";
        th.style.textAlign = "left";
    });

    target.querySelectorAll("td").forEach(td => {
        if (!td.classList.contains("gt")) {
            td.style.padding = "8px"; // User requested more padding
            td.style.border = "1px solid #e5e7eb";
        }
    });

    target.querySelectorAll("table").forEach(table => {
        if (!table.classList.contains('no-pdf-border')) {
          table.style.borderCollapse = "collapse";
          table.style.width = "100%";
        }
    });
  };

  return (
    <div className="flex flex-col lg:m-0 ">
      <div id="pdf-target" className="max-w-[210mm] mx-auto p-4 gap-10 lg:p-8 bg-white dark:bg-transparent text-black dark:text-white text-sm font-sans shadow-md rounded-md border border-transparent dark:border-gray-700 print:shadow-none print:w-full">
        
        {/* Unified Title */}
        <div id="pdf-main">
          <h1 className="text-xl font-bold mb-4 text-center uppercase tracking-widest text-gray-900 dark:text-white">QUOTATION</h1>

          <table className="w-full mb-4 text-xs text-gray-800 dark:text-gray-200 no-pdf-border" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%', border: 'none' }}>
              <tbody>
                  <tr>
                      <td className="w-1/2 align-top pr-4" style={{ width: '50%', border: 'none', verticalAlign: 'top' }}>
                          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">From:</h2>
                          <p>CRYSTAL INTEGRATED SERVICES</p>
                          <p>Company Address Line 1</p>
                          <p>Company Address Line 2</p>
                          <p>City - Pincode</p>
                          <p>GSTIN/UIN : XXXXXXXXXXXXXXX</p>
                          <p>State Name : State, Code : XX</p>
                      </td>
                      <td className="w-1/2 align-top pl-4" style={{ width: '50%', border: 'none', verticalAlign: 'top' }}>
                          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">To:</h2>
                          <div className="space-y-1">
                              <p className="font-medium"><strong>Name :</strong> {quotation.customerName || '-'}</p>
                              <p><strong>E-Mail :</strong> {quotation.customerEmail || '-'}</p>
                              <p><strong>Phone :</strong> {quotation.customerPhone || '-'}</p>
                              <p><strong>Date :</strong> {quotation.quotationDate || '-'}</p>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>

          {/* Details Table */}
          {quotation.materials && quotation.materials.length > 0 && (
            <table className="w-full table-auto border border-gray-300 dark:border-gray-600 border-collapse mb-4 text-left text-xs">
                <thead className="bg-gray-100 dark:bg-gray-700 dark:text-white">
                    <tr>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Metal Type</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Material</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Grade</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Size</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Thk</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Finish</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Usage</th>
                    </tr>
                </thead>
                <tbody>
                    {quotation.materials.map((mat, index) => (
                      <tr key={index} className="border border-gray-300 dark:border-gray-600">
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{mat.metalType}</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{mat.material}</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{mat.grade}</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{mat.size}</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{mat.thk}</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{mat.finish}</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{mat.usage}%</td>
                      </tr>
                    ))}
                </tbody>
            </table>
          )}

          {/* Pricing Table */}
          <table className="w-full table-auto border border-gray-300 dark:border-gray-600 border-collapse text-left mb-4 text-xs">
              <thead className="bg-gray-100 dark:bg-gray-700 dark:text-white">
                  <tr>
                      <th className="p-2 border border-gray-300 dark:border-gray-600">Item</th>
                      <th className="p-2 border border-gray-300 dark:border-gray-600">Details</th>
                      <th className="p-2 border border-gray-300 dark:border-gray-600">Amount (excl VAT)</th>
                      <th className="p-2 border border-gray-300 dark:border-gray-600">Amount (incl 5% VAT)</th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="border border-gray-300 dark:border-gray-600">
                      <td className="p-2 border border-gray-300 dark:border-gray-600">Material Cost</td>
                      <td className="p-2 border border-gray-300 dark:border-gray-600"></td>
                       <td className="p-2 border border-gray-300 dark:border-gray-600">{quotation.materialPrice}</td>
                      <td className="p-2 border border-gray-300 dark:border-gray-600">{quotation.materialVAT}</td>
                  </tr>
                   {quotation.accessories && quotation.accessories.length > 0 && (
                      <tr className="border border-gray-300 dark:border-gray-600">
                          <td className="p-2 border border-gray-300 dark:border-gray-600">Accessories</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{quotation.accessories.length} Items</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{quotation.accessoriesPrice}</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{quotation.accessoriesVAT}</td>
                      </tr>
                  )}
                  {quotation.woodWorkPrice && quotation.woodWorkPrice !== '-' && (
                      <tr className="border border-gray-300 dark:border-gray-600">
                          <td className="p-2 border border-gray-300 dark:border-gray-600">Wood Work</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">Custom Estimation</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{quotation.woodWorkPrice}</td>
                          <td className="p-2 border border-gray-300 dark:border-gray-600">{quotation.woodWorkVAT}</td>
                      </tr>
                  )}
                  <tr className="border border-gray-300 dark:border-gray-600 font-bold">
                      <td className="p-2 border border-gray-300 dark:border-gray-600" colSpan="2">Total (excl. VAT)</td>
                      <td className="p-2 border border-gray-300 dark:border-gray-600">{quotation.totalCost}</td>
                      <td className="p-2 border border-gray-300 dark:border-gray-600"></td>
                  </tr>
                  <tr className="border border-gray-300 dark:border-gray-600 font-bold text-gray-700 dark:text-gray-300">
                       <td className="p-2 border border-gray-300 dark:border-gray-600" colSpan="3">Total VAT Amount (5%)</td>
                       <td className="p-2 border border-gray-300 dark:border-gray-600 text-sm">{quotation.totalVATAmount}</td>
                  </tr>
                  <tr className="border border-gray-300 dark:border-gray-600 font-bold">
                       <td className="p-2 border border-gray-300 dark:border-gray-600" colSpan="3">Grand Total (incl. VAT)</td>
                       <td className="p-2 border border-gray-300 dark:border-gray-600 text-base">{quotation.totalCostWithVAT}</td>
                  </tr>
              </tbody>
          </table>
        </div>


        <div className="mt-2 pdf-footer-section break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <h1 className="text-base font-bold text-gray-800 dark:text-white mb-2">Terms & Conditions</h1>
            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                <div>
                    <strong>Delivery Details:</strong><br/>
                    • Delivery within 30 to 45 days from the date of order confirmation.
                </div>
                <div>
                    <strong>Payment Terms:</strong><br/>
                    • 60% Advance Payment – upon order confirmation.<br/>
                    • 20% on Material Handover – after delivery of all materials.<br/>
                    • 20% on Completion – after full installation and final handover.
                </div>
                <div>
                     <strong>Note:</strong><br/>
                     • Valid for 15 Days from Date of Quotation.
                </div>
            </div>
        </div>

      </div>

      <div className="flex flex-col p-3 gap-2 rounded-2xl mb-24 mt-10 lg:mb-20 print:hidden">
         <button 
            onClick={handlePrint}
            className="w-full px-3 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium "
         >
            Download PDF
         </button>
      </div>

    </div>
  );
};

export default Quotation;
