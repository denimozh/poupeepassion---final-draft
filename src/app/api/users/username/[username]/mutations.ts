import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadThing";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UpdateUserProfileValues } from "@/lib/validation";
import { updateUserProfile } from "./actions";
import { PostsPage } from "@/lib/types";

export function useUpdateProfileMutation(){
    const {toast} = useToast();

    const router = useRouter();

    const queryClient = useQueryClient();

    const {startUpload: startAvatarUpload} = useUploadThing("avatar");

    const mutation = useMutation({
        mutationFn: async ({values, avatar}: {values: UpdateUserProfileValues, avatar?: File}) => {
            return Promise.all([
                updateUserProfile(values),
                avatar && startAvatarUpload([avatar])
            ])
        },
        onSuccess: async ([updatedUser, uploadResult]) => {
            const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl;

            const queryFilter: QueryFilters = {
                queryKey: ["post-feed"]
            }

            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>()
        }
    })
}