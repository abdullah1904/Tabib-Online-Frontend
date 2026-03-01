import { ConsultationFormData, consultationFormSchema } from '@/lib/validation';
import { Consultation } from '@/types/consultations';
import { ConsultationDurationOptions, ConsultationType, ConsultationTypeOptions, DayOfWeekOptions } from '@/utils/constants';
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NumberInput, Select, SelectItem, TimeInput } from '@heroui/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Time } from '@internationalized/date'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConsultation, updateConsultation } from '@/services/consultation.service';
import { showToast } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';


type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    selectedConsultation: Consultation | null;
    setSelectedConsultation: (consultation: Consultation | null) => void;
}

const ConsultationFormModal = ({ selectedConsultation, setSelectedConsultation, setShowModal, showModal }: Props) => {
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: createConsultation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['consultations'] });
            showToast("Consultation service created successfully", "success");
            handleClose();
        },
        onError: (error) => {
            showToast(`Failed to create consultation service: ${error.message}`, "error");
        }
    });
    const updateMutation = useMutation({
        mutationFn: updateConsultation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['consultations'] });
            showToast("Consultation service updated successfully", "success");
            handleClose();
        },
        onError: (error) => {
            showToast(`Failed to update consultation service: ${error.message}`, "error");
        }
    });
    const consultationForm = useForm<ConsultationFormData>({
        defaultValues: {
            title: selectedConsultation?.title || "",
            type: selectedConsultation?.type.toString() || undefined,
            duration: selectedConsultation?.duration.toString() || undefined,
            price: selectedConsultation?.price || undefined,
            // Time is 1970-01-01T14:30:00.000Z for selected.time, we only care about the time part as HH:MM
            time: selectedConsultation?.time ? selectedConsultation.time.split('T')[1].substring(0, 5) : "",
            location: selectedConsultation?.location || "",
            allowCustom: selectedConsultation?.allowCustom || false,
            availableDays: selectedConsultation?.consultationSlots.map(slot => slot.dayOfWeek.toString()) || []
        },
        resolver: zodResolver(consultationFormSchema)
    });
    const handleSubmit = (data: ConsultationFormData) => {
        if (selectedConsultation) {
            updateMutation.mutate({ consultationId: selectedConsultation.id, data });
        } else {
            createMutation.mutate(data);
        }
    }
    const handleClose = () => {
        setSelectedConsultation(null);
        setShowModal(false);
    }
    return (
        <Modal isOpen={showModal} onOpenChange={handleClose} size="2xl" placement='center'>
            <form onSubmit={consultationForm.handleSubmit(handleSubmit)}>
                <ModalContent>
                    <ModalHeader>
                        <h2 className="text-xl font-semibold text-primary">
                            {selectedConsultation ? "Edit Consultation Service" : "Add New Consultation Service"}
                        </h2>
                    </ModalHeader>
                    <ModalBody className='grid gap-4'>
                        <Input
                            {...consultationForm.register("title")}
                            type="text"
                            placeholder="Consultation Title"
                            label="Title"
                            isInvalid={!!consultationForm.formState.errors.title}
                            errorMessage={consultationForm.formState.errors.title?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <Select
                            {...consultationForm.register('type')}
                            placeholder="Consultation Type"
                            label="Type"
                            selectedKeys={consultationForm.watch("type") ? [consultationForm.watch("type")] : []}
                            isInvalid={!!consultationForm.formState.errors.type}
                            errorMessage={consultationForm.formState.errors.type?.message}
                            classNames={{
                                base: "w-full",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        >
                            {ConsultationTypeOptions.map((type) => (
                                <SelectItem key={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            {...consultationForm.register('duration')}
                            placeholder="Consultation Duration"
                            label="Duration"
                            selectedKeys={consultationForm.watch("duration") ? [consultationForm.watch("duration")] : []}
                            isInvalid={!!consultationForm.formState.errors.duration}
                            errorMessage={consultationForm.formState.errors.duration?.message}
                            classNames={{
                                base: "w-full",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        >
                            {ConsultationDurationOptions.map((type) => (
                                <SelectItem key={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <NumberInput
                            name="price"
                            placeholder="30"
                            label="Price"
                            value={consultationForm.watch("price")}
                            onValueChange={(e) => consultationForm.setValue("price", e)}
                            isInvalid={!!consultationForm.formState.errors.price}
                            errorMessage={consultationForm.formState.errors.price?.message}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                        <TimeInput
                            onChange={(value) => consultationForm.setValue('time', value ? `${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}` : '')}
                            value={(() => {
                                const timeStr = consultationForm.watch('time');
                                if (timeStr && typeof timeStr === 'string') {
                                    const [hours, minutes] = timeStr.split(':');
                                    const h = Number(hours);
                                    const m = Number(minutes);
                                    if (!isNaN(h) && !isNaN(m)) {
                                        return new Time(h, m);
                                    }
                                }
                                return null;
                            })()}
                            isInvalid={!!consultationForm.formState.errors.time}
                            errorMessage={consultationForm.formState.errors.time?.message}
                            label="Time"
                            classNames={{
                                base: "text-primary",
                                label: "text-primary font-medium mb-2",
                                innerWrapper: "text-primary",
                                input: "text-primary !text-primary",
                                segment: [
                                    "text-primary",
                                    "!text-primary",
                                    "data-[editable=true]:!text-primary",
                                    "data-[placeholder=true]:!text-primary/50",
                                    "data-[type=literal]:!text-primary/70",
                                    "focus:bg-primary/10",
                                    "focus:!text-primary",
                                ],
                                helperWrapper: "text-primary/70",
                                description: "text-primary/70",
                                errorMessage: "text-xs",
                            }}
                        />
                        <Select
                            placeholder="Available Days"
                            label="Available Days"
                            selectionMode="multiple"
                            selectedKeys={new Set(consultationForm.watch("availableDays") || [])}
                            onSelectionChange={(keys) => consultationForm.setValue("availableDays", Array.from(keys) as string[], { shouldValidate: true })}
                            isInvalid={!!consultationForm.formState.errors.availableDays}
                            errorMessage={consultationForm.formState.errors.availableDays?.message}
                            classNames={{
                                base: "w-full",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        >
                            {DayOfWeekOptions.map((type) => (
                                <SelectItem key={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Checkbox
                            {...consultationForm.register('allowCustom')}
                            color='primary'
                            classNames={{
                                label: 'text-primary',
                            }}
                        >
                            Allow Custom Consultations
                        </Checkbox>
                        {consultationForm.watch("type") === ConsultationType.IN_PERSON.toString() && (
                            <Input
                                {...consultationForm.register("location")}
                                type="text"
                                placeholder="Consultation Location"
                                label="Location"
                                isInvalid={!!consultationForm.formState.errors.location}
                                errorMessage={consultationForm.formState.errors.location?.message}
                                classNames={{
                                    base: "w-full",
                                    input: "text-base",
                                    label: "text-sm font-medium",
                                    errorMessage: "text-xs"
                                }}
                            />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={handleClose}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                            {createMutation.isPending || updateMutation.isPending ? "Saving..." : selectedConsultation ? "Update" : "Create"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default ConsultationFormModal