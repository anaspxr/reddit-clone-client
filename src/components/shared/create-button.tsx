import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

export default function CreateButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button asChild variant="ghost">
          <div>
            <Plus width={25} height={25} strokeWidth={1.2} />
            <span className="hidden md:block ">Create</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/create/post">
          <DropdownMenuItem className="p-2 cursor-pointer">
            Create Post
          </DropdownMenuItem>
        </Link>
        <Link href="/create/community">
          <DropdownMenuItem className="p-2 cursor-pointer">
            Create Community
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
