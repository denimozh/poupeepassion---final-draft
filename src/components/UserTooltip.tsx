import { useSession } from "@/app/(main)/SessionProvider";
import { FollowerInfo, UserData } from "@/lib/types";
import { PropsWithChildren } from "react";

interface UserTooltipProps extends PropsWithChildren {
    user: UserData
}

export default function UserTooltip({children, user}: UserTooltipProps) {
    const { user: loggedInUser } = useSession();

    const followerState: FollowerInfo = {

    }
}