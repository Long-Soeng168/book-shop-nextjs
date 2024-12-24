"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import Lottie from "lottie-react";
import animationData from "/public/images/animations/success-animation.json";
import { Button } from "@/components/ui/button";
import { ReceiptTextIcon, X } from "lucide-react";

export default function SuccessDialog({
  isOpen = false,
  setIsOpen,
  title = "Success",
  message = "",
  isShowBtnInSuccessSubmit = false,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogContent className="w-auto overflow-hidden">
        <DialogHeader>
          <DialogHeader className="flex items-center justify-center">
            <Lottie
              animationData={animationData}
              className="flex items-center justify-center w-60"
              loop={false}
            />
          </DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className='text-center'>{message}</DialogDescription>
        </DialogHeader>
        {isShowBtnInSuccessSubmit && (
          <DialogFooter className={`mt-4 gap-2`}>
            <Button
              onClick={() => setIsOpen(false)}
              type="button"
              variant="outline"
            >
              <X />
              Close
            </Button>
            <Button type="button">
              <ReceiptTextIcon />
              Print Invoice
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
