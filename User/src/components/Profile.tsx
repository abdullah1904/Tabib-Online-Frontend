"use client";
import { UpdateProfilePersonalInfoFormData, updateProfilePersonalInfoFormSchema } from "@/lib/validation";
import { GenderOptions } from "@/utils/constants";
import { Card, CardHeader, CardBody, Avatar, Tabs, Tab, Input, NumberInput, Select, SelectItem, Button } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { ScanHeart, Shield, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PersonalInfoTab = () => {
    const { data: session } = useSession();
    console.log(session?.user)
    const updateProfilePersonalInfoForm = useForm<UpdateProfilePersonalInfoFormData>({
        resolver: zodResolver(updateProfilePersonalInfoFormSchema),
        defaultValues: {
            fullName: session?.user?.fullName || "",
            age: session?.user?.age || undefined,
            gender: session?.user?.gender?.toString() || undefined,
            address: session?.user?.address || "",
            emergencyContactName: session?.user?.emergencyContactName || "",
            emergencyPhoneNumber: session?.user?.emergencyContactNumber || "",
        }
    });
    
    useEffect(() => {
        if (session?.user) {
            updateProfilePersonalInfoForm.reset({
                fullName: session.user.fullName || '',
                age: session.user.age || undefined,
                gender: session.user.gender?.toString() || undefined,
                address: session.user.address || '',
                emergencyContactName: session.user.emergencyContactName || '',
                emergencyPhoneNumber: session.user.emergencyContactNumber || '',
            });
        }
    }, [session?.user]);
    
    const onSubmit = (data: UpdateProfilePersonalInfoFormData) => {
        console.log(data);
    }
    return (
        <form onSubmit={updateProfilePersonalInfoForm.handleSubmit(onSubmit)} noValidate>
            <div className="space-y-6 mx-auto">
                <div className='grid md:grid-cols-2 gap-4'>
                    <Input
                        {...updateProfilePersonalInfoForm.register("fullName")}
                        type="text"
                        placeholder="John Doe"
                        label="Full Name"
                        isInvalid={!!updateProfilePersonalInfoForm.formState.errors.fullName}
                        errorMessage={updateProfilePersonalInfoForm.formState.errors.fullName?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <NumberInput
                        name="age"
                        placeholder="30"
                        label="Age"
                        value={updateProfilePersonalInfoForm.watch("age")}
                        onValueChange={(e) => updateProfilePersonalInfoForm.setValue("age", e)}
                        isInvalid={!!updateProfilePersonalInfoForm.formState.errors.age}
                        errorMessage={updateProfilePersonalInfoForm.formState.errors.age?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Select
                        {...updateProfilePersonalInfoForm.register('gender')}
                        placeholder="Male/Female"
                        label="Gender"
                        selectedKeys={updateProfilePersonalInfoForm.watch("gender") ? [updateProfilePersonalInfoForm.watch("gender")] : []}
                        isInvalid={!!updateProfilePersonalInfoForm.formState.errors.gender}
                        errorMessage={updateProfilePersonalInfoForm.formState.errors.gender?.message}
                        classNames={{
                            base: "w-full",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    >
                        {GenderOptions.map((gender) => (
                            <SelectItem key={gender.value}>
                                {gender.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        {...updateProfilePersonalInfoForm.register("address")}
                        type="text"
                        placeholder="123 Main St, Anytown, USA"
                        label="Address"
                        isInvalid={!!updateProfilePersonalInfoForm.formState.errors.address}
                        errorMessage={updateProfilePersonalInfoForm.formState.errors.address?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Input
                        {...updateProfilePersonalInfoForm.register("emergencyContactName")}
                        type="text"
                        placeholder="Jane Doe"
                        label="Emergency Contact Name"
                        isInvalid={!!updateProfilePersonalInfoForm.formState.errors.emergencyContactName}
                        errorMessage={updateProfilePersonalInfoForm.formState.errors.emergencyContactName?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Input
                        {...updateProfilePersonalInfoForm.register("emergencyPhoneNumber")}
                        type="text"
                        placeholder="+1 (555) 123-4567"
                        label="Emergency Phone Number"
                        isInvalid={!!updateProfilePersonalInfoForm.formState.errors.emergencyPhoneNumber}
                        errorMessage={updateProfilePersonalInfoForm.formState.errors.emergencyPhoneNumber?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                </div>
                <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    isLoading={updateProfilePersonalInfoForm.formState.isSubmitting}
                    disabled={updateProfilePersonalInfoForm.formState.isSubmitting}
                    className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    {updateProfilePersonalInfoForm.formState.isSubmitting ? "Processing..." : "Continue"}
                </Button>
            </div>
        </form>
    )
}

const MedicalInfoTab = () => {
    return (
        <div>Personal Info</div>
    )
}

const SecurityTab = () => {
    return (
        <div>Security Info</div>
    )
}

const Profile = () => {
    const { data: session } = useSession();
    return (
        <div className='w-full flex justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
            <Card className="flex-1 max-w-4xl">
                <CardHeader>
                    <div className="text-primary flex items-center justify-center gap-6">
                        <Avatar
                            showFallback
                            size="lg"
                            className="size-20"
                            src={session?.user.imageURL ?? undefined}
                        />
                        <div className="text-left space-y-1">
                            <h2 className="text-2xl font-semibold">{session?.user.fullName}</h2>
                            <p>{session?.user.email}</p>
                            <p className="text-sm">{session?.user.phoneNumber}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <Tabs color="primary" fullWidth={true} defaultSelectedKey={'personalInfo'} destroyInactiveTabPanel={false}>
                        <Tab key="personalInfo" title={
                            <div className="flex items-center space-x-2">
                                <User />
                                <span>Personal Info</span>
                            </div>
                        }>
                            <PersonalInfoTab />
                        </Tab>
                        <Tab key="medicalInfo" title={
                            <div className="flex items-center space-x-2">
                                <ScanHeart />
                                <span>Medical Info</span>
                            </div>
                        }>
                            <MedicalInfoTab />
                        </Tab>
                        <Tab key="security" title={
                            <div className="flex items-center space-x-2">
                                <Shield />
                                <span>Security</span>
                            </div>
                        }>
                            <SecurityTab />
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div >
    )
}

export default Profile