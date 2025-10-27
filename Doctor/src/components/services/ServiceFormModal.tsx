import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'

type Props = {
  showModal: boolean
  setShowModal: (show: boolean) => void
}

const ServiceFormModal = ({ showModal, setShowModal }: Props) => {
  const handleClose = (open: boolean) => {
    setShowModal(open)
  }

  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogContent className='h-[98vh] w-[98%]'>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Fill in the details for the new service.
          </DialogDescription>
        </DialogHeader>
        {/* Add your form or content here */}
      </DialogContent>
    </Dialog>
  )
}

export default ServiceFormModal
