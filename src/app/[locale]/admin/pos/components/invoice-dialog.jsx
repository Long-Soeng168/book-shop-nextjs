"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File, FileDown, ReceiptTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import html2pdf from "html2pdf.js";
import { useInvoiceContext } from "@/contexts/POSInvoiceContext";
import {
  APP_ADDRESS,
  APP_CONTACT,
  APP_EMAIL,
  APP_NAME,
} from "@/config/website-detail";

const InvoiceDialog = () => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const { invoice, setInvoice, isOpenInvoiceDialog, setIsOpenInvoiceDialog } =
    useInvoiceContext();

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleDownloadPDF = () => {
    const element = contentRef.current;
    const options = {
      margin: 0.5,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };
  if (!invoice || !isClient) {
    return null;
  }
  return (
    <div>
      <Dialog
        open={isOpenInvoiceDialog}
        onOpenChange={(state) => setIsOpenInvoiceDialog(state)}
      >
        <DialogTrigger className="hidden p-4 border-2 rounded-md">
          Open
        </DialogTrigger>
        <DialogContent
          className="h-screen"
          closeBtnClassName="-top-0.5 -right-0.5"
        >
          <DialogHeader className={`hidden`}>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <div className="mb-4 overflow-y-auto border border-gray-300 border-dashed rounded-lg">
            <div ref={contentRef} className="max-w-4xl p-6 mx-auto bg-white ">
              <div className="grid grid-cols-2 pb-4 mb-4 border-b border-gray-400 border-dashed">
                <div className="flex flex-col items-start">
                  <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
                  <p className="text-sm text-gray-600">
                    #
                    {new Intl.NumberFormat("en", {
                      minimumIntegerDigits: 6,
                      useGrouping: false,
                    }).format(invoice.id)}
                    {/* #{invoice.id} */}
                  </p>
                  <p className="text-sm text-gray-600 whitespace-nowrap">
                    {invoice?.created_at &&
                      new Date(invoice.created_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                  </p>
                  {invoice?.payment?.name && (
                    <p className="flex gap-1 text-sm text-gray-600">
                      <span>Pay With: </span>
                      <span>{invoice?.payment?.name}</span>
                    </p>
                  )}
                  {invoice?.customer?.name && (
                    <p className="flex gap-1 text-sm text-gray-600">
                      <span>Customer:</span>
                      <span>{invoice?.customer?.name}</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end text-right">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {APP_NAME}
                  </h2>
                  <p className="text-sm text-gray-600">{APP_ADDRESS}</p>
                  <p className="text-sm text-gray-600">{APP_CONTACT}</p>
                  <p className="text-sm text-gray-600">{APP_EMAIL}</p>
                </div>
              </div>
              <div className="mb-6 overflow-x-auto">
                <table className="min-w-full text-sm text-gray-600 border border-gray-300">
                  <thead className="text-gray-800 bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border-b">Item</th>
                      <th className="px-4 py-2 text-right border-b">Qty</th>
                      <th className="px-4 py-2 text-right border-b">Price</th>
                      <th className="px-4 py-2 text-right border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice?.items?.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 border-b">{item.title}</td>
                        <td className="px-4 py-2 text-right border-b">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 text-right border-b whitespace-nowrap">
                          {(
                            item.price -
                            item.price * (item.discount / 100)
                          ).toFixed(2)}{" "}
                          $
                        </td>
                        <td className="px-4 py-2 text-right border-b whitespace-nowrap">
                          {(
                            (item.price - item.price * (item.discount / 100)) *
                            item.quantity
                          ).toFixed(2)}{" "}
                          $
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="relative bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-right border-t" colSpan="3">
                        Subtotal
                      </th>
                      <td className="px-4 py-2 text-right border-t whitespace-nowrap">
                        {Number(invoice.subtotal).toFixed(2)} $
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="px-4 py-2 text-right whitespace-nowrap"
                        colSpan="3"
                      >
                        Discount ({invoice.discount}
                        {invoice.discountType == "dollar" ? " $" : " %"})
                      </th>
                      <td className="px-4 py-2 text-right whitespace-nowrap">
                        {invoice.discountType == "dollar"
                          ? invoice.discount
                          : (
                              invoice.subtotal *
                              (invoice.discount / 100)
                            ).toFixed(2)}{" "}
                        $
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="px-4 py-2 text-right whitespace-nowrap"
                        colSpan="3"
                      >
                        Total
                      </th>
                      <td className="px-4 py-2 text-right">
                        {Number(invoice.total).toFixed(2)} $
                      </td>
                    </tr>
                    {/* <tr className="absolute bottom-0 left-0 p-4 bg-yellow-200">
                      <td>paid</td>
                    </tr> */}
                  </tfoot>
                </table>
              </div>

              <div className="text-sm text-center text-gray-600">
                <p>Thank you for your purchase!</p>
                <p>
                  If you have any questions about this invoice, please contact
                  us at {APP_EMAIL}.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" className='bg-gray-100' onClick={() => setIsOpenInvoiceDialog(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <FileDown />
              Download PDF
            </Button>
            <Button onClick={reactToPrintFn}>
              <ReceiptTextIcon />
              Print
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceDialog;
