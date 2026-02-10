import { TopUpFormData, topUpFormSchema } from '@/lib/validation';
import { createWalletTopup } from '@/services/wallet.service';
import { showToast } from '@/utils';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const TopUpModal = ({ setShowModal, showModal }: Props) => {

    const { mutate, isPending } = useMutation({
        mutationFn: createWalletTopup,
        onSuccess: (data:unknown) => {
            if (typeof data === 'object' && data !== null && 'checkoutURL' in data) {
                const checkoutUrl = (data as { checkoutURL: string }).checkoutURL;
                window.location.href = checkoutUrl;
            }
        },
        onError: (error) => {
            showToast(error.message ?? 'Something went wrong', 'error')
        }

    });

    const topUpForm = useForm<TopUpFormData>({
        mode: 'onBlur',
        resolver: zodResolver(topUpFormSchema)
    });

    const handleClose = () => {
        setShowModal(false);
    }
    const onSubmit = (data: TopUpFormData) => {
        mutate(data);
    }
    return (
        <Modal isOpen={!!showModal} onClose={handleClose} size='lg' placement='center'>
            <form onSubmit={topUpForm.handleSubmit(onSubmit)}>
                <ModalContent>
                    <ModalHeader className="border-b pb-3">
                        <h2 className="text-xl font-semibold text-primary-dark">
                            Make a Wallet Top-up
                        </h2>
                    </ModalHeader>
                    <ModalBody>
                        <Slider
                            value={topUpForm.watch('amount')}
                            onChange={(value) => topUpForm.setValue('amount', value as number)}
                            className="max-w-md"
                            defaultValue={500}
                            label="Amount"
                            maxValue={5000}
                            minValue={500}
                            step={500}
                            showSteps={true}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' type='submit' isLoading={isPending} isDisabled={isPending}>
                            {isPending ? 'Loading...' : 'Confirm Top-up'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default TopUpModal