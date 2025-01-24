import MyFooter from "@/components/my-footer";
import MyHeader from "@/components/my-header";
import MyLoadingAnimation from "@/components/ui/my-loading-animation";
import ToTopButton from "@/components/ui/to-top-button";
import { CartProvider } from "@/contexts/CartContext";
import React, { Suspense } from "react";

const ClientLayout = ({ children }) => {
  return (
    <>
      <CartProvider>
        <div className="bg-primary dark:bg-background">
          <div className="max-w-screen-xl px-2 mx-auto">
            <Suspense fallback={<MyLoadingAnimation />}>
              <MyHeader key="home-header" />
            </Suspense>
          </div>
        </div>
        <div className="min-h-[55vh] px-2 mx-auto max-w-screen-xl">
          {children}
        </div>
        <ToTopButton />
        <MyFooter />
      </CartProvider>
      {/* <div className="flex">
          <div>
            <MyHomeSidebar />
          </div>
          {children}
        </div> */}
    </>
  );
};

export default ClientLayout;
