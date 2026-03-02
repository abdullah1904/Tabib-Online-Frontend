// import { verificationApplicationFormData } from '@/lib/validation';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react'
// import { useForm } from 'react-hook-form';

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const VerificationApplicationFormModal = ({ setShowModal, showModal }: Props) => {
    // const verificationApplicationForm = useForm<verificationApplicationFormData>({
    //     defaultValues: {

    //     }
    // });
    const handleClose = () => {
        setShowModal(false);
    };
    return (
        <Modal isOpen={showModal} onOpenChange={handleClose} size="2xl" placement='center'>
            <form>
                <ModalContent>
                    <ModalHeader>
                        <h2 className="text-xl font-semibold text-primary">
                            New PMDC Verification Application
                        </h2>
                    </ModalHeader>
                    <ModalBody className='grid gap-4'>
                        {/* <Input
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
                        /> */}
                    </ModalBody>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default VerificationApplicationFormModal