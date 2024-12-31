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
import { File, FileDown, HandHeartIcon, ReceiptTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import html2pdf from "html2pdf.js";
import { useInvoiceContext } from "@/contexts/POSInvoiceContext";
import {
  APP_ADDRESS,
  APP_CONTACT,
  APP_EMAIL,
  APP_NAME,
} from "@/config/website-detail";
import Image from "next/image";

const InvoiceDialog = () => {
  const [printSize, setPrintSize] = React.useState("80");
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
      html2canvas: { scale: 4 },
      jsPDF: {
        unit: "in",
        format: printSize === "80" ? "letter" : "a4",
        orientation: "portrait",
      },
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
          className="h-screen max-h-[90vh]"
          closeBtnClassName="-top-0.5 -right-0.5"
        >
          <DialogHeader className={`hidden`}>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <div className="relative mb-4 overflow-y-auto border border-gray-300 border-dashed rounded-lg custom-scrollbar">
            <div
              ref={contentRef}
              className={`mx-auto p-4 bg-white text-black ${
                printSize === "80" ? "w-[80mm]" : "max-w-4xl"
              }`}
            >
              {/* Header Section */}
              <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-black border-dashed">
                <div className="flex flex-col items-start space-y-1">
                  <h1
                    className={`font-bold ${
                      printSize === "80" ? "text-lg" : "text-2xl"
                    }`}
                  >
                    Invoice
                  </h1>
                  <p className="text-sm">
                    #
                    {new Intl.NumberFormat("en", {
                      minimumIntegerDigits: 6,
                      useGrouping: false,
                    }).format(invoice.id)}
                  </p>
                  <p className="text-sm">
                    {invoice?.created_at &&
                      new Date(invoice.created_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </p>
                  {invoice?.payment?.name && (
                    <p className="text-sm">
                      <span className="font-medium">Pay With: </span>
                      {invoice?.payment?.name}
                    </p>
                  )}
                  {invoice?.customer?.name && (
                    <p className="text-sm">
                      <span className="font-medium">Customer: </span>
                      {invoice?.customer?.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end space-y-1 text-right">
                  <div className="flex items-center gap-1">
                    <Image
                      width={30}
                      height={30}
                      alt=""
                      src={`/images/app_logo.png`}
                      className="object-contain w-8 h-8"
                    />
                    <h2
                      className={`font-semibold ${
                        printSize === "80" ? "text-lg" : "text-xl"
                      }`}
                    >
                      {APP_NAME}
                    </h2>
                  </div>
                  <p className="text-sm">{APP_ADDRESS}</p>
                  <p className="text-sm">{APP_CONTACT}</p>
                </div>
              </div>

              {/* Table Section */}
              <div className="mb-6 overflow-x-auto">
                <table className="w-full text-sm border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1 border-b">Item</th>
                      <th className="px-2 py-1 text-right border-b">Qty</th>
                      <th className="px-2 py-1 text-right border-b">Price</th>
                      <th className="px-2 py-1 text-right border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice?.items?.map((item) => (
                      <tr key={item.id}>
                        <td className="px-2 py-1 border-b">{item.title}</td>
                        <td className="px-2 py-1 text-right border-b">
                          {item.quantity}
                        </td>
                        <td className="px-2 py-1 text-right border-b whitespace-nowrap">
                          {(
                            item.price -
                            item.price * (item.discount / 100)
                          ).toFixed(2)}{" "}
                          $
                        </td>
                        <td className="px-2 py-1 text-right border-b whitespace-nowrap">
                          {(
                            (item.price - item.price * (item.discount / 100)) *
                            item.quantity
                          ).toFixed(2)}{" "}
                          $
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1 text-right border-t" colSpan="3">
                        Subtotal
                      </th>
                      <td className="px-2 py-1 text-right border-t whitespace-nowrap">
                        {Number(invoice.subtotal).toFixed(2)} $
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="px-2 py-1 text-right whitespace-nowrap"
                        colSpan="3"
                      >
                        Discount ({invoice.discount}
                        {invoice.discountType === "dollar" ? " $" : " %"})
                      </th>
                      <td className="px-2 py-1 text-right whitespace-nowrap">
                        {invoice.discountType === "dollar"
                          ? invoice.discount
                          : (
                              invoice.subtotal *
                              (invoice.discount / 100)
                            ).toFixed(2)}{" "}
                        $
                      </td>
                    </tr>
                    <tr>
                      <th className="px-2 py-1 text-right" colSpan="3">
                        Total
                      </th>
                      <td className="px-2 py-1 text-right">
                        {Number(invoice.total).toFixed(2)} $
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Footer Section */}
              <div className="text-sm text-center">
                <p>Thank you for your purchase!</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              className="bg-gray-100"
              onClick={() => setIsOpenInvoiceDialog(false)}
            >
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
          <div className="absolute top-0 space-x-1 left-6">
            <button
              size="icon"
              onClick={() => setPrintSize("80")}
              className={`px-1 text-sm ${
                printSize == "80"
                  ? "text-gray-100 bg-black"
                  : "text-gray-950 bg-gray-200"
              } rounded-sm`}
            >
              80mm
            </button>
            <button
              size="icon"
              onClick={() => setPrintSize("a4")}
              className={`px-1 text-sm ${
                printSize == "a4"
                  ? "text-gray-100 bg-black"
                  : "text-gray-950 bg-gray-200"
              } rounded-sm`}
            >
              A4
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceDialog;
