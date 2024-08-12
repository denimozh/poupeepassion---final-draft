import { Dialog, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { UserData } from '@/lib/types'
import { updateUserProfileSchema, UpdateUserProfileValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useUpdateProfileMutation } from './mutations';

interface EditProfileDialogProps {
    user: UserData;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const EditProfileDialog = ({ user, open, onOpenChange }: EditProfileDialogProps) => {
    const form = useForm<UpdateUserProfileValues>({
        resolver: zodResolver(updateUserProfileSchema),
        defaultValues: {
            displayName: user.displayName,
            bio: user.bio || ""
        }
    })

    const mutation = useUpdateProfileMutation();

    async function onSubmit(values: UpdateUserProfileValues){
        //implement
    }

    return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    )
}

export default EditProfileDialog