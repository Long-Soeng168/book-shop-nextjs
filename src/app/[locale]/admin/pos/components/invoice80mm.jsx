import {
  APP_CONTACT,
  APP_EMAIL,
  APP_LOGO_POS_80_PINTER,
  APP_NAME,
  APP_NAME_KH,
  APP_WEBSITE,
} from "@/config/website-detail";

const Invoice80mm = ({ invoice, contentRef }) => {
  return (
    <div className="relative mb-4 overflow-y-auto border border-gray-300 border-dashed rounded-lg custom-scrollbar">
      <div
        ref={contentRef}
        className="mx-auto p-4 bg-white text-black w-[80mm]"
      >
        {/* Header Section */}
        <div className="flex gap-1 items-top">
          <img
            alt="App Logo"
            width={60}
            height={60}
            src={APP_LOGO_POS_80_PINTER}
            className="object-contain w-auto h-10"
          />
          <div className="flex flex-col justify-center text-start">
            <p className="text-sm font-bold text-gray-800">{APP_NAME_KH}</p>
            <p className="text-sm font-bold text-gray-800">{APP_NAME}</p>
            <p className="mt-0.5 text-[10px] text-black">
              <strong>Phone:</strong> {APP_CONTACT}
            </p>
            <p className="text-[10px] text-black">
              <strong>Email:</strong> {APP_EMAIL}
            </p>
            <p className="text-[10px] text-black">
              <strong>Website:</strong>{" "}
              <a href={APP_WEBSITE} className="text-black hover:underline">
                {APP_WEBSITE}
              </a>
            </p>
          </div>
        </div>

        <hr className="mt-1 border-dashed borderlack" />

        <div className="py-1">
          <h2 className="mb-1 text-base font-semibold text-center text-gray-800">
            INVOICE
          </h2>

          <div className="flex mb-2">
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-[10px] text-black">
                <strong>Customer:</strong> {invoice?.customer?.name || "N/A"}
              </p>
              <p className="text-[10px] text-black">
                <strong>Address:</strong> {invoice?.customer?.address || "N/A"}
              </p>
              <p className="text-[10px] text-black">
                <strong>Telephone:</strong> {invoice?.customer?.phone || "N/A"}
              </p>
              {invoice?.payment?.name && (
                <p className="text-[10px] text-black">
                  <strong>Pay By:</strong> {invoice?.payment?.name || "N/A"}
                </p>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-[10px] text-black">
                <strong>No:</strong> #
                {new Intl.NumberFormat("en", {
                  minimumIntegerDigits: 6,
                  useGrouping: false,
                }).format(invoice.id)}
              </p>
              <p className="text-[10px] text-black">
                <strong>Date:</strong>{" "}
                {invoice?.created_at &&
                  new Date(invoice.created_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-[10px] border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-1 py-1 border">No</th>
                <th className="px-1 py-1 border">Description</th>
                <th className="px-1 py-1 text-right border">Qty</th>
                <th className="px-1 py-1 text-right border">Price</th>
                <th className="px-1 py-1 text-right border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.items?.map((item, index) => (
                <tr key={item.id} className="border-collapse">
                  <td className="px-1 py-1 border">{index + 1}</td>
                  <td className="px-1 py-1 border">{item.title}</td>
                  <td className="px-1 py-1 text-right border">
                    {item.quantity}
                  </td>
                  <td className="px-1 py-1 text-right border whitespace-nowrap">
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}{" "}
                    $
                  </td>
                  <td className="px-1 py-1 text-right border whitespace-nowrap">
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
                <th className="px-2 py-1 text-right border-t" colSpan="4">
                  Subtotal
                </th>
                <td className="px-2 py-1 text-right border-t whitespace-nowrap">
                  {Number(invoice.subtotal).toFixed(2)} $
                </td>
              </tr>
              <tr>
                <th
                  className="px-2 py-1 text-right whitespace-nowrap"
                  colSpan="4"
                >
                  Discount ({invoice.discount}
                  {invoice.discountType === "dollar" ? " $" : " %"})
                </th>
                <td className="px-2 py-1 text-right whitespace-nowrap">
                  {invoice.discountType === "dollar"
                    ? invoice.discount
                    : (invoice.subtotal * (invoice.discount / 100)).toFixed(
                        2
                      )}{" "}
                  $
                </td>
              </tr>
              <tr>
                <th className="px-2 py-1 text-right" colSpan="4">
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
  );
};

export default Invoice80mm;
