import { Button, DatePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TimeInput } from '@heroui/react'
import React from 'react'

type Props = {
    consultationType: string | null
    setConsultationType: (type: string | null) => void
}

const ConsultationDetailModel = ({ consultationType, setConsultationType }: Props) => {
    const handleClose = () => {
        setConsultationType(null);
    }
    return (
        <Modal isOpen={!!consultationType} onClose={handleClose} size='lg'>
            <ModalContent>
                <ModalHeader className="border-b pb-3">
                    <h2 className="text-xl font-semibold text-primary-dark">
                        Consultation Details
                    </h2>
                </ModalHeader>

                {/* Body */}
                <ModalBody className="py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DatePicker 
                        label="Select Date" 
                        classNames={{
                            label: "text-primary",
                            base: "text-primary",
                            calendar: "bg-white text-black",
                            calendarContent: "text-black"
                        }}
                        />
                        <TimeInput label="Select Time" />
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

export default ConsultationDetailModel