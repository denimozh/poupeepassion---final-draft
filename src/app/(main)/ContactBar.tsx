"use client"
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { Bell, Bookmark, Home, Mail, Store } from "lucide-react";
import Link from "next/link";
import { useSession } from "./SessionProvider";

interface ContactBarProps {
  className?: string;
}

const ContactBar = ({ className }: ContactBarProps) => {
  const { user } = useSession();
  return (
    <div className={className}>
      <p className="text-xl font-medium pl-5">My Contacts</p>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 h-16"
        title="Home"
        asChild
      >
        <Link href="/">
          <UserAvatar avatarUrl={user.avatarUrl} size={50} />
          <span className="hidden lg:inline">username</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 h-16"
        title="Home"
        asChild
      >
        <Link href="/">
          <UserAvatar avatarUrl={user.avatarUrl} size={50} />
          <span className="hidden lg:inline">username</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3 h-16"
        title="Home"
        asChild
      >
        <Link href="/">
          <UserAvatar avatarUrl={user.avatarUrl} size={50} />
          <span className="hidden lg:inline">username</span>
        </Link>
      </Button>
    </div>
  )
}

export default ContactBar