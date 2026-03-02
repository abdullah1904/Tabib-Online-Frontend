import { Appointment } from '@/types/appointments'
import { getConsultationDurationText, getConsultationTypeText } from '@/utils';
import { AppointmentStatus, ConsultationType, UserRole } from '@/utils/constants';
import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/react';
import React from 'react'
import { format } from "date-fns";
import {formatInTimeZone} from "date-fns-tz";

type Props = {
    selected: Appointment;
    setSelected: (appointment: Appointment | null) => void;
    userRole: UserRole
}

const AppointmentInfoModal = ({ selected, setSelected, userRole }: Props) => {
    const handleClose = () => {
        setSelected(null);
    }
    return (
        <Modal isOpen={!!selected} onClose={handleClose} size='lg' placement='center'>
            <ModalContent>
                <ModalBody>
                    <div>
                        <h2 className='text-2xl font-semibold mb-4'>Appointment Details</h2>
                        <p><strong>{userRole === UserRole.DOCTOR ? "Patient" : "Doctor"}:</strong> {userRole === UserRole.DOCTOR ? selected?.user.fullName : selected?.doctor.fullName}</p>
                        <p><strong>Appointment Date:</strong> {format(new Date(selected.appointmentDate), "MMM dd, yyyy")}</p>
                        <p><strong>Appointment Time:</strong> {formatInTimeZone(selected.appointmentTime, 'UTC', 'hh:mm a')}</p>
                        <p><strong>Status:</strong> {selected ? (selected.status === AppointmentStatus.PENDING ? "Pending" : selected.status === AppointmentStatus.CONFIRMED ? "Confirmed" : selected.status === AppointmentStatus.CANCELLED ? "Cancelled" : "Completed") : ''}</p>
                        <p><strong>Additional Notes:</strong> {selected?.additionalNotes || 'None'}</p>
                    </div>
                    <div>
                        <h2 className='text-2xl font-semibold mb-4'>Consultation Details</h2>
                        <p><strong>Title:</strong> {selected?.consultation.title}</p>
                        <p><strong>Type:</strong> {getConsultationTypeText(selected?.consultation.type)}</p>
                        <p><strong>Price:</strong> {selected?.consultation.price}</p>
                        <p><strong>Duration:</strong> {getConsultationDurationText(selected?.consultation.duration)}</p>
                        {selected.consultation.type === ConsultationType.IN_PERSON && (
                            <p><strong>Location:</strong> {selected?.consultation.location}</p>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AppointmentInfoModal