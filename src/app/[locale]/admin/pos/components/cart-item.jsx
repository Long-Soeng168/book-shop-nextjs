import { Button } from "@/components/ui/button";
import { IMAGE_BOOK_URL } from "@/config/env";
import { usePOSCart } from "@/contexts/POSContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartItem = ({ item, isReadOnly = false }) => {
  const { removeFromCart, handleQuantityChange } = usePOSCart();
  const hasDiscount = item.discount != 0 && item.discount != null;
  const discountedPrice = (
    item.price -
    item.price * (item.discount / 100)
  ).toFixed(2);
  return (
    <tr className="relative group">
      <td>
        <span className="relative flex shrink-0 overflow-hidden border-[0.5px] rounded-sm w-16 h-16 m-1">
          <Image
            className="object-cover w-full h-full rounded-sm aspect-square"
            height={100}
            width={100}
            alt=""
            src={`${IMAGE_BOOK_URL}thumb/${item.image}`}
          />
        </span>
      </td>
      <td>
        <div className="flex-1 shrink-0">
          <p className="text-sm line-clamp-2 shrink-0">{item.title}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 line-clamp-1 shrink-0 whitespace-nowrap ">
            <p
              className={`text-sm text-gray-600 ${
                hasDiscount ? "line-through" : "text-red-600"
              }`}
            >
              $ {item.price}
            </p>
            {hasDiscount && <p className="text-red-600">$ {discountedPrice}</p>}
          </div>
        </div>
      </td>
      <td className="p-2">
        <div className="flex items-center">
          {!isReadOnly && (
            <Button
              onClick={() => handleQuantityChange(item.id, -1)}
              variant="outline"
              size="xs"
            >
              <Minus />
            </Button>
          )}
          <p className="mx-2 text-base text-black">{item.quantity}</p>
          {!isReadOnly && (
            <Button
              onClick={() => handleQuantityChange(item.id, +1)}
              variant="outline"
              size="xs"
            >
              <Plus />
            </Button>
          )}
        </div>
      </td>
      <td className="p-2">
        <p className="ml-2 text-base text-primary whitespace-nowrap">
          ${" "}
          {(
            (item.price - item.price * (item.discount / 100)) *
            item.quantity
          ).toFixed(2)}
        </p>
      </td>
      <td className="p-2">
        {!isReadOnly && (
          <Button
            onClick={() => removeFromCart(item)}
            variant="ghost"
            size="xs"
          >
            <Trash2 className="text-destructive" />
          </Button>
        )}
      </td>
    </tr>
  );
};

export default CartItem;
