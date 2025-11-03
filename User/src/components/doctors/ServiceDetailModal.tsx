import { AppointmentFormData, appointmentFormSchema } from '@/lib/validation'
import { Service } from '@/types/services'
import { getDoctorServiceDurationText, getDoctorServiceTypeText, getUpcomingDateNumbers } from '@/utils'
import { Button, Checkbox, DatePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, TimeInput } from '@heroui/react'
import { today, getLocalTimeZone, Time, parseDate } from '@internationalized/date'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type Props = {
    showModal: string,
    setShowModal: (value: null) => void
    service: Service | null,
    setService: (type: Service | null) => void
}

const ServiceDetailModal = ({ showModal, setShowModal, service, setService }: Props) => {
    const appointmentForm = useForm<AppointmentFormData>({
        mode: 'onBlur',
        resolver: zodResolver(appointmentFormSchema),
        defaultValues: {
            appointmentDate: undefined,
            appointmentTime: service?.time || undefined,
            additionalNotes: undefined,
            healthSharingConsent: false
        }
    });
    const handleClose = () => {
        setShowModal(null)
        setService(null);
    }
    const onSubmit = (data: AppointmentFormData) => {
        console.log(data)
    }
    return (
        <Modal isOpen={!!showModal} onClose={handleClose} size='lg' placement='center'>
            <form onSubmit={appointmentForm.handleSubmit(onSubmit)}>
                <ModalContent>
                    <ModalHeader className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-primary-dark">
                            {getDoctorServiceTypeText(service?.type ?? 0)} Consultation Details
                        </h2>
                    </ModalHeader>

                    {/* Body */}
                    <ModalBody className="py-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-lg font-medium text-primary-dark mb-1">{service?.title}</h3>
                                <p className="text-primary-dark/70">Price: {(service?.price ?? 0).toFixed(2)} | Duration: {getDoctorServiceDurationText(service?.duration ?? 0)}</p>
                                {service?.location && (
                                    <p className="text-primary-dark/70">Location: {service?.location}</p>
                                )}
                            </div>
                            <DatePicker
                                onChange={(value) => appointmentForm.setValue('appointmentDate', value?.toString() || '')}
                                value={appointmentForm.watch('appointmentDate') ? parseDate(appointmentForm.watch('appointmentDate')) : null}
                                errorMessage={appointmentForm.formState.errors.appointmentDate?.message}
                                isInvalid={!!appointmentForm.formState.errors.appointmentDate}
                                label="Select Date"
                                classNames={{
                                    // Base wrapper
                                    base: "text-primary",

                                    // Label styling
                                    label: "text-primary font-medium mb-2",

                                    // Input wrapper (the border container)
                                    // inputWrapper: "border-primary/30 hover:border-primary/50 focus-within:border-primary bg-transparent",

                                    // Input field (the date segments)
                                    input: "text-primary !text-primary",

                                    // Segment styling (individual date parts like MM, DD, YYYY)
                                    segment: "text-primary !text-primary data-[placeholder=true]:!text-primary/50",

                                    // Selector button (calendar icon button)
                                    selectorButton: "text-primary hover:bg-primary/10",

                                    // Selector icon
                                    selectorIcon: "text-primary",

                                    // Popover content (the dropdown container)
                                    popoverContent: "bg-white shadow-xl border border-gray-200 p-0",
                                }}
                                calendarProps={{
                                    minValue: today(getLocalTimeZone()),
                                    isDateUnavailable(date) {
                                        if (service?.allowCustom) {
                                            return false;
                                        }
                                        const unavailableDays = getUpcomingDateNumbers(service?.availableDays ?? []);
                                        return !unavailableDays.includes(date.day);
                                    },
                                    classNames: {
                                        // Calendar base
                                        base: "bg-white",

                                        // Header (month/year display)
                                        headerWrapper: "bg-white pt-4 pb-2",
                                        header: "text-primary",
                                        title: "text-primary font-semibold",

                                        // Navigation buttons
                                        prevButton: "text-primary hover:bg-primary/10",
                                        nextButton: "text-primary hover:bg-primary/10",

                                        // Grid (the calendar table)
                                        gridWrapper: "bg-white",
                                        gridHeader: "bg-white",
                                        gridHeaderRow: "bg-white",
                                        gridHeaderCell: "text-primary/70 font-medium",

                                        // Calendar body
                                        gridBody: "bg-white",
                                        gridBodyRow: "bg-white",

                                        // Individual date cells
                                        cell: "text-primary",
                                        cellButton: [
                                            "text-primary",
                                            "!text-primary",
                                            "hover:!bg-primary/10",
                                            "data-[hover=true]:!bg-primary/10",
                                            "data-[selected=true]:!bg-primary",
                                            "data-[selected=true]:!text-white",
                                            "data-[today=true]:!bg-primary/20",
                                            "data-[today=true]:!text-primary",
                                            "data-[disabled=true]:!text-gray-300",
                                            "data-[unavailable=true]:!text-red-300",
                                            "data-[unavailable=true]:line-through",
                                        ],

                                        // Month & Year Picker
                                        pickerWrapper: "bg-white",
                                        pickerMonthList: "text-primary",
                                        pickerYearList: "text-primary",
                                        pickerItem: "text-primary hover:bg-primary/10 data-[selected=true]:bg-primary data-[selected=true]:text-white",
                                        pickerHighlight: "bg-primary",
                                    },
                                }}
                                // Optional: Customize the popover placement
                                popoverProps={{
                                    placement: "bottom",
                                    offset: 13,
                                }}
                                // Optional: Customize the selector button
                                selectorButtonProps={{
                                    variant: "light",
                                }}
                            />
                            <TimeInput
                                onChange={(value) => appointmentForm.setValue('appointmentTime', value?.toString() || '')}
                                value={appointmentForm.watch('appointmentTime') ? (() => {
                                    const timeStr = appointmentForm.watch('appointmentTime');
                                    if (timeStr) {
                                        const [hours, minutes] = timeStr.split(':');
                                        return new Time(Number(hours), Number(minutes));
                                    }
                                    return null;
                                })() : null}
                                isInvalid={!!appointmentForm.formState.errors.appointmentTime}
                                errorMessage={appointmentForm.formState.errors.appointmentTime?.message}
                                label="Select Time"
                                isDisabled={service?.allowCustom ? false : true}
                                defaultValue={
                                    service?.time
                                        ? (() => {
                                            const [hours, minutes] = service.time.split(':');
                                            return new Time(Number(hours), Number(minutes));
                                        })()
                                        : undefined
                                }
                                classNames={{
                                    // Base wrapper
                                    base: "text-primary",

                                    // Label styling
                                    label: "text-primary font-medium mb-2",

                                    // Input wrapper (the border container)
                                    // inputWrapper: "border-primary/30 hover:border-primary/50 focus-within:border-primary bg-transparent",

                                    // Inner wrapper (contains the time segments)
                                    innerWrapper: "text-primary",

                                    // Input field (the time container)
                                    input: "text-primary !text-primary",

                                    // Segment styling (individual time parts like HH, MM, SS, AM/PM)
                                    segment: [
                                        "text-primary",
                                        "!text-primary",
                                        "data-[editable=true]:!text-primary",
                                        "data-[placeholder=true]:!text-primary/50",
                                        "data-[type=literal]:!text-primary/70",
                                        "focus:bg-primary/10",
                                        "focus:!text-primary",
                                    ],

                                    // Helper wrapper (contains description/error)
                                    helperWrapper: "text-primary/70",

                                    // Description text
                                    description: "text-primary/70",

                                    // Error message
                                    errorMessage: "text-xs",
                                }}
                            />
                            <Textarea
                                {...appointmentForm.register('additionalNotes')}
                                isInvalid={!!appointmentForm.formState.errors.additionalNotes}
                                errorMessage={appointmentForm.formState.errors.additionalNotes?.message}
                                label="Additional Notes"
                                placeholder="Enter any additional information or requests here..."
                                maxRows={4}
                                minRows={3}
                                classNames={{
                                    base: "w-full",
                                    input: "text-base",
                                    label: "text-sm font-medium",
                                    errorMessage: "text-xs"
                                }}
                            />
                            <Checkbox
                                {...appointmentForm.register('healthSharingConsent')}
                                color='primary'
                                classNames={{
                                    label: 'text-primary',
                                }}
                            >
                                Medical Info Sharing Consent
                            </Checkbox>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' type='submit'>
                            Confirm Appointment
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default ServiceDetailModal