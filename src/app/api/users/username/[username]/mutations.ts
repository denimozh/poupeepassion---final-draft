import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadThing";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useUpdateProfileMutation(){
    const {toast} = useToast();

    const router = useRouter();

    const queryClient = useQueryClient();

    const {startUpload: startAvatarUpload} = useUploadThing("avatar");

    
}