"use client"
import { getAvatarFallbackText, getDoctorPrefixText } from "@/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { useSession } from "next-auth/react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import { ChangePasswordFormData, changePasswordFormSchema, UpdatePersonalProfileFormData, updatePersonalProfileFormSchema, UpdateProfessionalProfileFormData, updateProfessionalProfileFormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { DoctorPrefixOptions, GenderOptions, MedicalDegreeOptions, PostGraduateDegreeOptions, SpecializationOptions } from "@/utils/constants"
import { NumberInput } from "./ui/number-input"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { updatePersonalProfile, updateProfessionalProfile } from "@/services/profile.service"
import { Popover } from "@radix-ui/react-popover"
import { PopoverContent, PopoverTrigger } from "./ui/popover"
import { Check, ChevronDown } from "lucide-react"
import { Command, CommandEmpty, CommandList, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { cn } from "@/lib/utils"
import { changePassword } from "@/services/auth.service"
import { PasswordInput } from "./ui/password-input"

const PersonalInfoTab = () => {
    const { data: session, update } = useSession();
    const updatePersonalProfileForm = useForm<UpdatePersonalProfileFormData>({
        resolver: zodResolver(updatePersonalProfileFormSchema),
        defaultValues: {
            profilePicture: undefined,
            fullName: '',
            address: '',
            age: undefined,
            gender: undefined,
        }
    });

    useEffect(() => {
        if (session?.user) {
            updatePersonalProfileForm.reset({
                profilePicture: undefined,
                fullName: session.user.fullName || '',
                address: session.user.address || '',
                age: session.user.age || undefined,
                gender: session.user.gender.toString() || undefined,
            });
        }
    }, [session, updatePersonalProfileForm]);

    const { mutate, isPending } = useMutation({
        mutationFn: updatePersonalProfile,
        onSuccess: async (data) => {
            updatePersonalProfileForm.reset({
                profilePicture: undefined,
                fullName: data.fullName,
                address: data.address,
                age: data.age,
                gender: data.gender.toString() || undefined,
            });
            await update({
                imageURL: data.imageURL,
                fullName: data.fullName,
                address: data.address,
                age: data.age,
                gender: data.gender,
            });
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        }
    });


    const onUpdatePersonalProfileSubmit = (data: UpdatePersonalProfileFormData) => {
        const formData = new FormData();
        if (data.profilePicture) {
            formData.append('image', data.profilePicture);
        }
        formData.append('fullName', data.fullName);
        formData.append('address', data.address);
        formData.append('age', data.age ? data.age.toString() : '');
        formData.append('gender', data.gender);
        mutate(formData);
    }
    return (
        <Form {...updatePersonalProfileForm}>
            <form onSubmit={updatePersonalProfileForm.handleSubmit(onUpdatePersonalProfileSubmit)}>
                <Card className="mb-4">
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Personal Details</h2>
                    </CardHeader>
                    <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <FormField
                                control={updatePersonalProfileForm.control}
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
                                control={updatePersonalProfileForm.control}
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
                                control={updatePersonalProfileForm.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age</FormLabel>
                                        <FormControl>
                                            <NumberInput {...field} placeholder="Age" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={updatePersonalProfileForm.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {GenderOptions.map((option) => (
                                                    <SelectItem key={option.value} value={String(option.value)}>
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
                                control={updatePersonalProfileForm.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Address" />
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


const ProfessionalInfoTab = () => {
    const { data: session, update } = useSession();
    const updateProfessionalProfileForm = useForm<UpdateProfessionalProfileFormData>({
        resolver: zodResolver(updateProfessionalProfileFormSchema),
        defaultValues: {
            doctorPrefix: undefined,
            medicalDegree: undefined,
            postGraduateDegree: undefined,
            specialization: undefined,
            yearsOfExperience: undefined,
        }
    });

    useEffect(() => {
        if (session?.user) {
            updateProfessionalProfileForm.reset({
                doctorPrefix: session.user.doctorPrefix.toString() || undefined,
                medicalDegree: session.user.medicalDegree.toString() || undefined,
                postGraduateDegree: session.user.postGraduateDegree.toString() || undefined,
                specialization: session.user.specialization.toString() || undefined,
                yearsOfExperience: session.user.yearsOfExperience || undefined,
            });
        }
    }, [session, updateProfessionalProfileForm]);

    const { mutate, isPending } = useMutation({
        mutationFn: updateProfessionalProfile,
        onSuccess: async (data) => {
            updateProfessionalProfileForm.reset({
                doctorPrefix: undefined,
                medicalDegree: undefined,
                postGraduateDegree: undefined,
                specialization: undefined,
                yearsOfExperience: undefined,
            });
            await update({
                medicalDegree: data.medicalDegree,
                postGraduateDegree: data.postGraduateDegree,
                specialization: data.specialization,
                yearsOfExperience: data.yearsOfExperience,
                doctorPrefix: data.doctorPrefix,
            });
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        }
    });

    const onUpdateProfessionalProfileSubmit = (data: UpdateProfessionalProfileFormData) => {
        mutate(data);
    }
    return (
        <Form {...updateProfessionalProfileForm}>
            <form onSubmit={updateProfessionalProfileForm.handleSubmit(onUpdateProfessionalProfileSubmit)}>
                <Card className="mb-4">
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Professional Details</h2>
                    </CardHeader>
                    <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <FormField
                                control={updateProfessionalProfileForm.control}
                                name="medicalDegree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Medical Degree</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={`${field.value ? "text-foreground" : "text-muted-foreground"} font-normal w-full justify-between`}
                                                    >
                                                        {field.value
                                                            ? MedicalDegreeOptions.find((degree) => String(degree.value) === field.value)?.label
                                                            : "Select Medical Degree..."}
                                                        <ChevronDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search Medical Degree..." />
                                                        <CommandList>
                                                            <CommandEmpty>No medical degree found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {MedicalDegreeOptions.map((degree) => (
                                                                    <CommandItem
                                                                        key={degree.value}
                                                                        value={String(degree.value)}
                                                                        onSelect={(currentValue) => {
                                                                            field.onChange(currentValue);
                                                                        }}
                                                                    >
                                                                        {degree.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === String(degree.value) ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={updateProfessionalProfileForm.control}
                                name="postGraduateDegree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postgraduate Degree</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={`${field.value ? "text-foreground" : "text-muted-foreground"} font-normal w-full justify-between`}
                                                    >
                                                        {field.value
                                                            ? PostGraduateDegreeOptions.find((framework) => String(framework.value) === field.value)?.label
                                                            : "Select Postgraduate Degree..."}
                                                        <ChevronDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search Postgraduate Degree..." />
                                                        <CommandList>
                                                            <CommandEmpty>No postgraduate degree found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {PostGraduateDegreeOptions.map((degree) => (
                                                                    <CommandItem
                                                                        key={degree.value}
                                                                        value={String(degree.value)}
                                                                        onSelect={(currentValue) => {
                                                                            field.onChange(currentValue);
                                                                        }}
                                                                    >
                                                                        {degree.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === String(degree.value) ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={updateProfessionalProfileForm.control}
                                name="yearsOfExperience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Years of Experience</FormLabel>
                                        <FormControl>
                                            <NumberInput placeholder="5" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={updateProfessionalProfileForm.control}
                                name="doctorPrefix"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Doctor Prefix</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={`${field.value ? "text-foreground" : "text-muted-foreground"} font-normal w-full justify-between`}
                                                    >
                                                        {field.value
                                                            ? DoctorPrefixOptions.find((framework) => String(framework.value) === field.value)?.label
                                                            : "Select Prefix..."}
                                                        <ChevronDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search Prefix..." />
                                                        <CommandList>
                                                            <CommandEmpty>No Prefix found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {DoctorPrefixOptions.map((prefix) => (
                                                                    <CommandItem
                                                                        key={prefix.value}
                                                                        value={String(prefix.value)}
                                                                        onSelect={(currentValue) => {
                                                                            field.onChange(currentValue);
                                                                        }}
                                                                    >
                                                                        {prefix.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === String(prefix.value) ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <FormField
                                control={updateProfessionalProfileForm.control}
                                name="specialization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Specialization</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={`${field.value ? "text-foreground" : "text-muted-foreground"} font-normal w-full justify-between`}
                                                    >
                                                        {field.value
                                                            ? SpecializationOptions.find((framework) => String(framework.value) === field.value)?.label
                                                            : "Select Specialization..."}
                                                        <ChevronDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search Specialization..." />
                                                        <CommandList>
                                                            <CommandEmpty>No specialization found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {SpecializationOptions.map((specialization) => (
                                                                    <CommandItem
                                                                        key={specialization.value}
                                                                        value={String(specialization.value)}
                                                                        onSelect={(currentValue) => {
                                                                            field.onChange(currentValue);
                                                                        }}
                                                                    >
                                                                        {specialization.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === String(specialization.value) ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
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


const SecurityTab = () => {
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
                        <h2 className="text-xl font-semibold">Security</h2>
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
    const { data: session } = useSession();
    return (
        <div className="py-2">
            <div className="flex justify-between pb-3">
                <h2 className="text-2xl">Profile</h2>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={session?.user?.imageURL ?? undefined} alt={session?.user?.fullName} />
                            <AvatarFallback>
                                {getAvatarFallbackText(session?.user?.fullName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left space-y-1">
                            <div className="flex gap-2">
                                <h2 className="text-2xl font-semibold">{getDoctorPrefixText(session?.user.doctorPrefix ?? 0)} {session?.user?.fullName}</h2>
                                {/* <Badge variant={doctorData.status === AccountStatus.BANNED ? 'destructive' : 'default'}>
                                    {getAccountStatusText(doctorData.status)}
                                </Badge> */}
                            </div>
                            <p className="text-muted-foreground">{session?.user?.email}</p>
                            <p className="text-sm text-muted-foreground">{session?.user?.phoneNumber}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="personal" className="w-full">
                        <TabsList className="w-full mx-auto">
                            <TabsTrigger value="personal">Personal Info</TabsTrigger>
                            <TabsTrigger value="profession">Professional Info</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                        </TabsList>
                        <TabsContent value="personal">
                            <PersonalInfoTab />
                        </TabsContent>
                        <TabsContent value="profession">
                            <ProfessionalInfoTab />
                        </TabsContent>
                        <TabsContent value="security">
                            <SecurityTab />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

export default Profile