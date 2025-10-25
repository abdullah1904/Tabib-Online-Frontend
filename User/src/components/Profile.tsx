"use client";
import { MedicalInfoFormData, medicalInfoFormSchema, UpdatePersonalProfileFormData, updatePersonalProfileFormSchema } from "@/lib/validation";
import { getMedicalRecord, updateMedicalRecord, updatePersonalProfile } from "@/services/profile.service";
import { showToast } from "@/utils";
import { GenderOptions } from "@/utils/constants";
import { Card, CardHeader, CardBody, Avatar, Tabs, Tab, Input, NumberInput, Select, SelectItem, Button, Spinner, Textarea, Tooltip } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ScanHeart, Shield, User, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PersonalInfoTab = () => {
    const { data: session, status, update } = useSession();
    const updatePersonalProfileForm = useForm<UpdatePersonalProfileFormData>({
        resolver: zodResolver(updatePersonalProfileFormSchema),
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
            updatePersonalProfileForm.reset({
                fullName: session.user.fullName || '',
                age: session.user.age || undefined,
                gender: session.user.gender?.toString() || undefined,
                address: session.user.address || '',
                emergencyContactName: session.user.emergencyContactName || '',
                emergencyPhoneNumber: session.user.emergencyContactNumber || '',
            });
        }
    }, [session?.user, updatePersonalProfileForm]);

    const { mutate, isPending } = useMutation({
        mutationFn: updatePersonalProfile,
        onSuccess: async (data) => {
            updatePersonalProfileForm.reset({
                profilePicture: undefined,
                fullName: data.fullName,
                address: data.address,
                age: data.age,
                gender: data.gender.toString() || undefined,
                emergencyContactName: data.emergencyContactName,
                emergencyPhoneNumber: data.emergencyContactNumber,
            });
            await update({
                imageURL: data.imageURL,
                fullName: data.fullName,
                address: data.address,
                age: data.age,
                gender: data.gender,
                emergencyContactName: data.emergencyContactName,
                emergencyContactNumber: data.emergencyContactNumber,
            });
            showToast("Profile updated successfully!", "success");
        },
        onError: (error) => {
            showToast(error.message || "Failed to update profile", "error");
        }
    });


    const onSubmit = (data: UpdatePersonalProfileFormData) => {
        const formData = new FormData();
        if (data.profilePicture) {
            formData.append('image', data.profilePicture);
        }
        formData.append('fullName', data.fullName);
        formData.append('address', data.address);
        formData.append('age', data.age ? data.age.toString() : '');
        formData.append('gender', data.gender);
        formData.append('emergencyContactName', data.emergencyContactName);
        formData.append('emergencyContactNumber', data.emergencyPhoneNumber);
        mutate(formData);
    }

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2">
                    <Spinner /> <p className="text-gray-600">Loading your information...</p>
                </div>
            </div>
        );
    }
    return (
        <form onSubmit={updatePersonalProfileForm.handleSubmit(onSubmit)} noValidate>
            <div className="space-y-6 mx-auto">
                <div className='grid md:grid-cols-2 gap-4'>
                    <div className="col-span-1 md:col-span-2">
                        <Input
                            type="file"
                            label="Profile Picture"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    updatePersonalProfileForm.setValue("profilePicture", file);
                                    updatePersonalProfileForm.clearErrors("profilePicture");
                                }
                            }}
                            isInvalid={!!updatePersonalProfileForm.formState.errors.profilePicture}
                            errorMessage={updatePersonalProfileForm.formState.errors.profilePicture?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                    </div>
                    <Input
                        {...updatePersonalProfileForm.register("fullName")}
                        type="text"
                        placeholder="John Doe"
                        label="Full Name"
                        isInvalid={!!updatePersonalProfileForm.formState.errors.fullName}
                        errorMessage={updatePersonalProfileForm.formState.errors.fullName?.message}
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
                        value={updatePersonalProfileForm.watch("age")}
                        onValueChange={(e) => updatePersonalProfileForm.setValue("age", e)}
                        isInvalid={!!updatePersonalProfileForm.formState.errors.age}
                        errorMessage={updatePersonalProfileForm.formState.errors.age?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Select
                        {...updatePersonalProfileForm.register('gender')}
                        placeholder="Male/Female"
                        label="Gender"
                        selectedKeys={updatePersonalProfileForm.watch("gender") ? [updatePersonalProfileForm.watch("gender")] : []}
                        isInvalid={!!updatePersonalProfileForm.formState.errors.gender}
                        errorMessage={updatePersonalProfileForm.formState.errors.gender?.message}
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
                        {...updatePersonalProfileForm.register("address")}
                        type="text"
                        placeholder="123 Main St, Any City, USA"
                        label="Address"
                        isInvalid={!!updatePersonalProfileForm.formState.errors.address}
                        errorMessage={updatePersonalProfileForm.formState.errors.address?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Input
                        {...updatePersonalProfileForm.register("emergencyContactName")}
                        type="text"
                        placeholder="Jane Doe"
                        label="Emergency Contact Name"
                        isInvalid={!!updatePersonalProfileForm.formState.errors.emergencyContactName}
                        errorMessage={updatePersonalProfileForm.formState.errors.emergencyContactName?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Input
                        {...updatePersonalProfileForm.register("emergencyPhoneNumber")}
                        type="text"
                        placeholder="+1 (555) 123-4567"
                        label="Emergency Phone Number"
                        isInvalid={!!updatePersonalProfileForm.formState.errors.emergencyPhoneNumber}
                        errorMessage={updatePersonalProfileForm.formState.errors.emergencyPhoneNumber?.message}
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
                    isLoading={isPending}
                    disabled={isPending}
                    className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    )
}

const MedicalInfoTab = () => {
    const { data: medicalRecord, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ['medicalRecord'],
        queryFn: getMedicalRecord,
    });
    const updateMedicalRecordForm = useForm<MedicalInfoFormData>({
        resolver: zodResolver(medicalInfoFormSchema),
        defaultValues: {
            bloodType: '',
            height: undefined,
            weight: undefined,
            knownAllergies: '',
            currentMedications: '',
            pastMedicalHistory: '',
            familyMedicalHistory: '',
        }
    });

    useEffect(() => {
        if (medicalRecord) {
            updateMedicalRecordForm.reset({
                bloodType: medicalRecord.bloodType || '',
                height: medicalRecord.height || undefined,
                weight: medicalRecord.weight || undefined,
                knownAllergies: medicalRecord.allergies || '',
                currentMedications: medicalRecord.currentMedications || '',
                pastMedicalHistory: medicalRecord.pastMedicalHistory || '',
                familyMedicalHistory: medicalRecord.familyMedicalHistory || '',
            });
        }
        console.log(medicalRecord);
    }, [medicalRecord, isSuccess, updateMedicalRecordForm]);

    const { mutate, isPending } = useMutation({
        mutationFn: updateMedicalRecord,
        onSuccess: (data) => {
            updateMedicalRecordForm.reset({
                bloodType: data.bloodType || '',
                height: data.height || undefined,
                weight: data.weight || undefined,
                knownAllergies: data.allergies || '',
                currentMedications: data.currentMedications || '',
                pastMedicalHistory: data.pastMedicalHistory || '',
                familyMedicalHistory: data.familyMedicalHistory || '',
            });
            showToast("Medical record updated successfully!", "success");
        },
        onError: (error) => {
            showToast(error.message || "Failed to update medical record", "error");
        }
    });

    const onSubmit = (data: MedicalInfoFormData) => {
        mutate(data);
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2">
                    <Spinner /> <p className="text-gray-600">Loading your information...</p>
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2 text-red-600">
                    <p className="text-gray-600">Error loading medical record: {error instanceof Error ? error.message : 'Unknown error'}</p>
                </div>
            </div>
        )
    }
    return (
        <form onSubmit={updateMedicalRecordForm.handleSubmit(onSubmit)} noValidate>
            <div className="space-y-6 mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Input
                        {...updateMedicalRecordForm.register("bloodType")}
                        type="text"
                        placeholder="A+"
                        label="Blood Type"
                        isInvalid={!!updateMedicalRecordForm.formState.errors.bloodType}
                        errorMessage={updateMedicalRecordForm.formState.errors.bloodType?.message}
                        className='col-span-1 md:col-span-2'
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <NumberInput
                        name="height"
                        placeholder="170"
                        label="Height (cm)"
                        value={updateMedicalRecordForm.watch("height")}
                        onValueChange={(e) => updateMedicalRecordForm.setValue("height", e)}
                        isInvalid={!!updateMedicalRecordForm.formState.errors.height}
                        errorMessage={updateMedicalRecordForm.formState.errors.height?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <NumberInput
                        name="weight"
                        placeholder="30"
                        label="Weight (kgs)"
                        value={updateMedicalRecordForm.watch("weight")}
                        onValueChange={(e) => updateMedicalRecordForm.setValue("weight", e)}
                        isInvalid={!!updateMedicalRecordForm.formState.errors.weight}
                        errorMessage={updateMedicalRecordForm.formState.errors.weight?.message}
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />

                    <Textarea
                        {...updateMedicalRecordForm.register("knownAllergies")}
                        placeholder="List any known allergies"
                        label="Known Allergies"
                        isInvalid={!!updateMedicalRecordForm.formState.errors.knownAllergies}
                        errorMessage={updateMedicalRecordForm.formState.errors.knownAllergies?.message}
                        minRows={2}
                        maxRows={2}
                        endContent={
                            <Tooltip
                                content={
                                    <div className='text-primary'>
                                        <p>List any medications, foods, or substances that cause allergic reactions.</p>
                                        <p>Include the type of reaction (rash, swelling, difficulty breathing) </p>
                                        <p>to help avoid potentially dangerous interactions.</p>
                                    </div>
                                }
                                showArrow={true}
                                placement='top'
                            >
                                <Info className='text-primary size-4' />
                            </Tooltip>
                        }
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Textarea
                        {...updateMedicalRecordForm.register("currentMedications")}
                        placeholder="List any current medications"
                        label="Current Medications"
                        isInvalid={!!updateMedicalRecordForm.formState.errors.currentMedications}
                        errorMessage={updateMedicalRecordForm.formState.errors.currentMedications?.message}
                        minRows={2}
                        maxRows={2}
                        endContent={
                            <Tooltip
                                content={
                                    <div className='text-primary'>
                                        <p>Include all medications you&apos;re currently taking - prescription drugs, over-the-counter medicines, vitamins, and supplements.</p>
                                        <p>This prevents harmful drug interactions and ensures safe advice.</p>
                                    </div>
                                }
                                showArrow={true}
                                placement='top'
                            >
                                <Info className='text-primary size-4' />
                            </Tooltip>
                        }
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Textarea
                        {...updateMedicalRecordForm.register("familyMedicalHistory")}
                        placeholder="Describe your family medical history"
                        label="Family Medical History"
                        isInvalid={!!updateMedicalRecordForm.formState.errors.familyMedicalHistory}
                        errorMessage={updateMedicalRecordForm.formState.errors.familyMedicalHistory?.message}
                        minRows={2}
                        maxRows={2}
                        endContent={
                            <Tooltip
                                content={
                                    <div className='text-primary'>
                                        <p>Note any significant health conditions that run in your family (heart disease, diabetes, cancer, etc.).</p>
                                        <p>Genetic factors can influence your health risks and help with preventive care guidance.</p>
                                    </div>
                                }
                                showArrow={true}
                                placement='top'
                            >
                                <Info className='text-primary size-4' />
                            </Tooltip>
                        }
                        classNames={{
                            base: "w-full",
                            input: "text-base",
                            label: "text-sm font-medium",
                            errorMessage: "text-xs"
                        }}
                    />
                    <Textarea
                        {...updateMedicalRecordForm.register("pastMedicalHistory")}
                        placeholder="Describe your past medical history"
                        label="Past Medical History"
                        isInvalid={!!updateMedicalRecordForm.formState.errors.pastMedicalHistory}
                        errorMessage={updateMedicalRecordForm.formState.errors.pastMedicalHistory?.message}
                        minRows={2}
                        maxRows={2}
                        endContent={
                            <Tooltip
                                content={
                                    <div className='text-primary'>
                                        <p>Record any previous illnesses, surgeries, or chronic conditions you&apos;ve been diagnosed with.</p>
                                        <p>This helps provide context for your current health and guides appropriate recommendations.</p>
                                    </div>
                                }
                                showArrow={true}
                                placement='top'
                            >
                                <Info className='text-primary size-4' />
                            </Tooltip>
                        }
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
                    isLoading={isPending}
                    disabled={isPending}
                    className="w-full font-medium py-3 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    {updateMedicalRecordForm.formState.isSubmitting ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
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