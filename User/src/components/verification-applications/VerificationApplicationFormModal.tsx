import { verificationApplicationFormData, verificationApplicationFormSchema } from '@/lib/validation';
import { createVerificationApplication } from '@/services/verification-application.service';
import { showToast } from '@/utils';
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import FileUpload from '../FileUpload';

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const VerificationApplicationFormModal = ({ setShowModal, showModal }: Props) => {
    const { data: session, status } = useSession();
    const queryClient = useQueryClient();
    const verificationApplicationForm = useForm<verificationApplicationFormData>({
        resolver: zodResolver(verificationApplicationFormSchema),
        defaultValues: {
            image: undefined,
            pmdcRedgDate: undefined,
            pmdcRedgNo: '',
        }
    });
    const { mutate, isPending } = useMutation({
        mutationFn: createVerificationApplication,
        onSuccess: () => {
            showToast("Verification application created successfully", "success");
            queryClient.invalidateQueries({ queryKey: ['verificationApplications'] });
            handleClose();
        },
        onError: (error) => {
            showToast(`Failed to create verification application: ${error.message}`, "error");
        }
    });
    const handleClose = () => {
        verificationApplicationForm.reset();
        setShowModal(false);
    };
    const onSubmit = (data: verificationApplicationFormData) => {
        if (status === 'loading' || !session?.user.id) return;
        mutate({
            data,
            doctorId: session.user.id
        });
    }
    return (
        <Modal isOpen={showModal} onOpenChange={handleClose} size="2xl" placement='center'>
            <form onSubmit={verificationApplicationForm.handleSubmit(onSubmit)}>
                <ModalContent>
                    <ModalHeader>
                        <h2 className="text-xl font-semibold text-primary">
                            New PMDC Verification Application
                        </h2>
                    </ModalHeader>
                    <ModalBody className='grid gap-4'>
                        <Input
                            {...verificationApplicationForm.register("pmdcRedgNo")}
                            type="text"
                            placeholder="PMDC Registration Number"
                            label="PMDC Registration Number"
                            isInvalid={!!verificationApplicationForm.formState.errors.pmdcRedgNo}
                            errorMessage={verificationApplicationForm.formState.errors.pmdcRedgNo?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <DateInput
                            onChange={(value) => verificationApplicationForm.setValue('pmdcRedgDate', value ? value.toString() : '', { shouldDirty: true })}
                            value={verificationApplicationForm.watch('pmdcRedgDate') ? parseDate(verificationApplicationForm.watch('pmdcRedgDate')) : null}
                            errorMessage={verificationApplicationForm.formState.errors.pmdcRedgDate?.message}
                            isInvalid={!!verificationApplicationForm.formState.errors.pmdcRedgDate}
                            label="PMDC Registration Date"
                            maxValue={today(getLocalTimeZone())}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <FileUpload
                                name="image"
                                control={verificationApplicationForm.control}
                                rules={{ required: "PMDC License image is required" }}
                                label="Upload PMDC License Image"
                                errorMessage={verificationApplicationForm.formState.errors.image?.message}
                            />
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={handleClose}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" isDisabled={isPending}>
                            {isPending ? "Creating..." : "Create"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default VerificationApplicationFormModal