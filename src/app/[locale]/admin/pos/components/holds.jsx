"use client";

import * as React from "react";
import { Edit, Eye, ListEnd, ListXIcon, ReceiptTextIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { getHolds, deleteHold } from "@/services/invoices-services";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import { usePOSCart } from "@/contexts/POSContext";
import { usePOSDetailContext } from "@/contexts/POSDetailContext";
import CartItem from "./cart-item";

export function Holds() {
  const [holds, setHolds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedForView, setSelectedForView] = React.useState(false);

  const [isDrawerDetailHoldOpen, setIsDrawerDetailHoldOpen] =
    React.useState(false);
  const token = localStorage.getItem("token");
  const {
    selectedCustomer,
    setSelectedCustomer,
    isOpenDialog,
    setIsOpenDialog,
  } = usePOSDetailContext();

  const { addMultipleToCart, clearCart } = usePOSCart();

  const fetchHolds = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getHolds();
      setHolds(results);
      //   console.log(results)
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isDrawerOpen) {
      fetchHolds();
    }
  }, [isDrawerOpen]);

  const handleEdit = (index) => {
    // console.log(holds[index]);
    clearCart();
    addMultipleToCart(holds[index].items);
    setSelectedCustomer(holds[index].customer?.id || 0);
    handleDelete(holds[index].id);
    setIsDrawerOpen(false);
  };

  const handleDelete = (id) => {
    console.log(id);
    const handleDeleteHold = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await deleteHold(id, token);
        //   setHolds(results);
        console.log(results);
        setHolds(holds.filter((hold) => hold.id != id));
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    handleDeleteHold();
  };

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="relative h-11 border-[0.5px]">
            <span className="flex items-center gap-1">
              <ListEnd className="text-primary" />
              <span>Holds</span>
            </span>
            <span className="absolute px-1.5 bg-yellow-400 rounded-full right-0.5 -top-2 text-xs font-bold">
              {holds?.length}
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col w-full mx-auto">
            <DrawerHeader className="p-0">
              <DrawerTitle className="flex items-center justify-center gap-2 py-2 text-xl font-bold">
                <ListEnd /> Order Holds
              </DrawerTitle>
              <DrawerDescription className="hidden" />
            </DrawerHeader>
            <div className="max-h-[80vh] overflow-auto p-4">
              {loading && <MyLoadingAnimation />}
              {error && <p className="text-red-500">Error: {error}</p>}
              {!loading && !error && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {holds?.map((hold, index) => (
                    <div
                      key={hold.id}
                      className="items-start justify-between gap-2 p-3 bg-gray-100 rounded-md"
                    >
                      <div className="text-base">
                        <span className="text-xl font-bold">ID-{hold.id}</span>
                        <p className="text-gray-600">
                          Customer: {hold.customer?.name || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Total Products: {hold.items?.length || 0}
                        </p>
                        {hold.discount != 0 && (
                          <p className="text-gray-600">
                            Total Discount: {hold.discount || 0}
                            {hold.discountType == "dollar" ? " $" : " %"}
                          </p>
                        )}
                        <p className="text-gray-600">
                          Total Price:{" "}
                          <span className="text-destructive">
                            {hold.total || "0"} $
                          </span>
                        </p>
                        <p className="text-base text-gray-950 line-clamp-5">
                          <span className="font-bold">Note</span>:{" "}
                          {hold.note || "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-2 mt-2">
                        <Button
                          onClick={() => {
                            setSelectedForView(index);
                            setIsDrawerDetailHoldOpen(true)}}
                          size="icon"
                          variant="outline"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => {
                            handleEdit(index);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button size="icon" className="bg-yellow-500">
                          <ReceiptTextIcon className="w-4 h-4" />
                          <span className="sr-only">Print</span>
                        </Button>
                        <Button
                          onClick={() => {
                            handleDelete(hold.id);
                          }}
                          size="icon"
                          variant="destructive"
                        >
                          <Trash className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Sheet
        open={isDrawerDetailHoldOpen}
        onOpenChange={(state) => setIsDrawerDetailHoldOpen(state)}
      >
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className='hidden' />
            <SheetDescription className='hidden'  />
          </SheetHeader>
          <div className="text-base">
            <span className="text-xl font-bold">ID-{holds[selectedForView]?.id}</span>
            <p className="text-gray-600">
              Customer: {holds[selectedForView]?.customer?.name || "N/A"}
            </p>
            <p className="text-gray-6selectedForView">
              Total Products: {holds[selectedForView]?.items?.length || 0}
            </p>
            {holds[selectedForView]?.discount != 0 && (
              <p className="text-gray-600">
                Total Discount: {holds[selectedForView]?.discount || 0}
                {holds[selectedForView]?.discountType == "dollar" ? " $" : " %"}
              </p>
            )}
            <p className="text-gray-600">
              Total Price:{" "}
              <span className="text-destructive">
                {holds[selectedForView]?.total || "0"} $
              </span>
            </p>
            <p className="text-base text-gray-950 line-clamp-5">
              <span className="font-bold">Note</span>: {holds[selectedForView]?.note || "N/A"}
            </p>
            <table className="w-full">
              <tbody>
                <tr>
                  <th></th>
                  <th className="text-gray-500">Items</th>
                  <th className="text-gray-500">Qrt</th>
                  <th className="text-gray-500">Total</th>
                </tr>
                {holds[selectedForView]?.items?.length > 0 ? (
                  holds[selectedForView]?.items?.map((item, index) => (
                    <CartItem isReadOnly={true} item={item} key={index} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="pt-10">
                      <div className="flex justify-center text-primary">
                        <ListXIcon /> No Data..
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
