"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label";
import { PasswordInput } from "./ui/password-input";
import { ChangePasswordFormData, changePasswordFormSchema, UpdateProfileFormData, updateProfileFormSchema } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/auth.service";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AdminPrivilegeOptions } from "@/utils/constants";
import { updateProfile } from "@/services/profile.service";

const UpdateProfileCard = () => {
    const { data: session, update } = useSession();
    const updateProfileForm = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileFormSchema),
        defaultValues: {
            profilePicture: undefined,
            fullName: '',
            email: '',
            phoneNumber: '',
            privilege: undefined,
            recoveryEmail: '',
        }
    });

    useEffect(() => {
        if (session?.user) {
            updateProfileForm.reset({
                profilePicture: undefined,
                fullName: session.user.fullName || '',
                email: session.user.email || '',
                phoneNumber: session.user.phone || '',
                privilege: session.user.privilegeLevel.toString() || undefined,
                recoveryEmail: session.user.recoveryEmail || '',
            });
        }
    }, [session, updateProfileForm]);

    const { mutate, isPending } = useMutation({
        mutationFn: updateProfile,
        onSuccess: async (data) => {
            updateProfileForm.reset({
                profilePicture: undefined,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phone,
                privilege: data.privilegeLevel.toString() || undefined,
                recoveryEmail: data.recoveryEmail,
            });
            await update({
                imageURL: data.imageURL,
                fullName: data.fullName,
                recoveryEmail: data.recoveryEmail,
            });
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        }
    })

    const onUpdateProfileSubmit = (data: UpdateProfileFormData) => {
        const formData = new FormData();
        if (data.profilePicture) {
            formData.append('image', data.profilePicture);
        }
        formData.append('fullName', data.fullName);
        formData.append('recoveryEmail', data.recoveryEmail);
        mutate(formData);
    }
    return (
        <Form {...updateProfileForm}>
            <form onSubmit={updateProfileForm.handleSubmit(onUpdateProfileSubmit)}>
                <Card className="mb-4">
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Profile Details</h2>
                    </CardHeader>
                    <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <FormField
                                control={updateProfileForm.control}
                                name="profilePicture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Picture 
                                            {session?.user?.imageURL && (
                                                <a href={session.user.imageURL} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500">
                                                    (View Current)
                                                </a>
                                            )}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                onChange={e => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(file);
                                                }}
                                                name={field.name}
                                                ref={field.ref}
                                                key={session?.user?.imageURL || 'profile-picture'}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={updateProfileForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="admin@gmail.com" disabled={true} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={updateProfileForm.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Full Name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={updateProfileForm.control}
                                name="privilege"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Privilege</FormLabel>
                                        <Select value={field.value} disabled={true}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a privilege" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {AdminPrivilegeOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={updateProfileForm.control}
                                name="recoveryEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Recovery Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="recovery@gmail.com" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={updateProfileForm.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Phone Number" disabled={true} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button disabled={isPending} type="submit">
                            {isPending ? "Updating..." : "Update Profile"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

const ChangePasswordCard = () => {
    const changePasswordForm = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            changePasswordForm.reset();
            toast.success("Password changed successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to change password");
        }
    });

    const onChangePasswordSubmit = (data: ChangePasswordFormData) => {
        mutate(data);
    }
    return (
        <Form {...changePasswordForm}>
            <form onSubmit={changePasswordForm.handleSubmit(onChangePasswordSubmit)}>
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Password Security</h2>
                    </CardHeader>
                    <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <FormField
                                control={changePasswordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="Current Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={changePasswordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="New Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button disabled={isPending} type="submit">
                            {isPending ? "Changing..." : "Change Password"}
                        </Button>
                    </CardFooter>
                </Card >
            </form>
        </Form>
    )
}

const Profile = () => {
    return (
        <div className="py-2">
            <div className='flex justify-between pb-3'>
                <h2 className='text-2xl'>Profile</h2>
            </div>
            <UpdateProfileCard />
            <ChangePasswordCard />
        </div >
    )
}

export default Profile