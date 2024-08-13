import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { UserData } from '@/lib/types'
import { updateUserProfileSchema, UpdateUserProfileValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useUpdateProfileMutation } from './mutations';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LoadingButton from '@/components/LoadingButton';
import Image, { StaticImageData } from 'next/image';
import { Label } from '@/components/ui/label';
import AvatarPlaceholder from "@/assets/avatar-placeholder.png"
import { Camera } from 'lucide-react';

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

    const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

    async function onSubmit(values: UpdateUserProfileValues){
        mutation.mutate(
            {
                values,
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                }
            }
        )
    }

    return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className='space-y-1.5'>
                        <Label>Avatar</Label>
                        <AvatarInput 
                            src={croppedAvatar ? URL.createObjectURL(croppedAvatar) : user.avatarUrl || AvatarPlaceholder}
                            onImageCropped={setCroppedAvatar}
                        />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                            <FormField control={form.control} name='displayName' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your Display Name' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )} 
                            />
                            <FormField control={form.control} name='bio' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Tell us a little bit about yourself' className='resize-none' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )} 
                            />

                            <DialogFooter>
                                <LoadingButton type='submit' loading={mutation.isPending}>
                                    Save
                                </LoadingButton>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
    )
}

interface AvatarInputProps {
    src: string | StaticImageData;
    onImageCropped: (blob: Blob | null) => void;
}

function AvatarInput({src, onImageCropped}: AvatarInputProps){
    const [imageToCrop, setImageToCrop] = useState<File>();

    const fileInputRef = useRef<HTMLInputElement>(null);

    function onImageSelected(image: File | undefined) {
        if (!image) return;


    }

    return(
        <>
            <input type="file" accept="image/*" onChange={(e) => onImageSelected(e.target.files?.[0])} ref={fileInputRef} className='hidden sr-only'/>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="group relative block">
                <Image src={src} alt="Avatar preview" width={150} height={150} className="size-32 flex-none rounded-full object-cover"/>
                <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
                    <Camera size={24} />
                </span>
            </button>
        </>
    )
}

export default EditProfileDialog