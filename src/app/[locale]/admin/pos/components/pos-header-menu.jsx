import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { AlignLeft, Layout, LogOut, PanelTop } from "lucide-react";

const POSHeaderMenu = ({className}) => {
  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="shrink-0 h-11 border-[0.5px]">
            <AlignLeft className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-48">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <PanelTop />
            Fronend Page
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layout />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div>
              <p className="font-semibold line-clamp-1">Long Soeng</p>
              <p className="line-clamp-2">longsoeng@gmail.com</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default POSHeaderMenu;
