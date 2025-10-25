import { ReviewFormData, reviewFormSchema } from '@/lib/validation'
import { doctorReview } from '@/services/doctors.service'
import { showToast } from '@/utils'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    doctorId: string,
    showModal: string,
    setShowModal: (value: null) => void
}

const ReviewModal = ({ setShowModal, showModal, doctorId }: Props) => {
    const queryClient = useQueryClient();
    const reviewForm = useForm<ReviewFormData>({
        mode: 'onBlur',
        resolver: zodResolver(reviewFormSchema)
    });
    const { mutate, isPending } = useMutation({
        mutationFn: doctorReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctor', doctorId] });
            showToast('Review submitted successfully', 'success');
            handleClose();
        },
        onError: (error) => {
            showToast(error.message ?? 'Something went wrong', 'error')
        }

    });
    const handleClose = () => {
        setShowModal(null)
    }
    const onSubmit = (data: ReviewFormData) => {
        mutate({ doctorId, ...data });
    }
    return (
        <Modal isOpen={!!showModal} onClose={handleClose} size='lg' placement='center'>
            <form onSubmit={reviewForm.handleSubmit(onSubmit)}>
                <ModalContent>
                    <ModalHeader className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-primary-dark">
                            Review Comment
                        </h2>
                    </ModalHeader>

                    <ModalBody className="py-6">
                        <Textarea
                            {...reviewForm.register('comment')}
                            label="Your Comment"
                            placeholder="Write your review here..."
                            errorMessage={reviewForm.formState.errors.comment?.message}
                            isInvalid={!!reviewForm.formState.errors.comment}
                            minRows={4}
                            maxRows={8}
                            classNames={{
                                base: "w-full",
                                input: "text-base",
                                label: "text-sm font-medium",
                                errorMessage: "text-xs"
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' type='submit' isLoading={isPending} isDisabled={isPending}>
                            {isPending ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default ReviewModal