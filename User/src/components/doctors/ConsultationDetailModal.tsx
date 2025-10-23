import { Button, Checkbox, DatePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TimeInput } from '@heroui/react'
import React from 'react'

type Props = {
    showModal: string,
    setShowModal: (value: null) => void
    consultationType: string | null
    setConsultationType: (type: string | null) => void
}

const ConsultationDetailModal = ({ showModal, setShowModal, consultationType, setConsultationType }: Props) => {
    const handleClose = () => {
        setShowModal(null)
        setConsultationType(null);
    }
    return (
        <Modal isOpen={!!showModal} onClose={handleClose} size='lg' placement='center'>
            <ModalContent>
                <ModalHeader className="border-b pb-3">
                    <h2 className="text-xl font-semibold text-primary-dark">
                        {consultationType} Consultation Details
                    </h2>
                </ModalHeader>

                {/* Body */}
                <ModalBody className="py-6">
                    <div className="grid grid-cols-1 gap-4">
                        <DatePicker
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
                            // Calendar styling via calendarProps
                            calendarProps={{
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
                            label="Select Time"
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
                                errorMessage: "text-red-500",
                            }}
                        />
                        <Checkbox color='primary' classNames={{ label: 'text-primary' }}>Medical Info Sharing Consent</Checkbox>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary'>
                        Confirm Appointment
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConsultationDetailModal