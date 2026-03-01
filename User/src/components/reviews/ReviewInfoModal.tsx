import { Review } from '@/types/review'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button, Avatar } from '@heroui/react';
import { MessageSquare, Star } from 'lucide-react';
import React from 'react'

type Props = {
    selected: Review | null,
    setSelected: (review: Review | null) => void;
}

const ReviewInfoModal = ({ selected, setSelected }: Props) => {
    const handleClose = () => {
        setSelected(null);
    }
    return (
        <Modal isOpen={!!selected} onClose={handleClose} size='lg' placement='center'>
            <ModalContent>
                <ModalHeader className='text-primary'>Review Details</ModalHeader>
                <ModalBody>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <Avatar src={selected?.user.imageURL} alt={selected?.user.fullName} />
                                <div>
                                    <p>{selected?.user.fullName}</p>
                                    <p className='text-sm'>
                                        <span>Email: </span>
                                        {selected?.user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='text-lg font-bold text-primary flex gap-1 items-center'>
                                <Star className='size-4' />
                                Rating:
                            </p>
                            <p>{selected?.rating} / 5</p>
                        </div>
                        <div>
                            <p className='text-lg font-bold text-primary flex gap-1 items-center'>
                                <MessageSquare className='size-4' />
                                Comment:
                                </p>
                            <p>{selected?.comment}</p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={handleClose} color="primary">
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}

export default ReviewInfoModal