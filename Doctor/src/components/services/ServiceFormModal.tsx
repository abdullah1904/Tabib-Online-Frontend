import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { ServiceFormData, serviceFormSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { DayOfWeekOptions, DoctorServiceDurationOptions, DoctorServiceTypeOptions } from '@/utils/constants'
import { NumberInput } from '../ui/number-input'
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from '../ui/multi-select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createService } from '@/services/services.service'
import { toast } from 'sonner'
import { Checkbox } from '../ui/checkbox'

type Props = {
  showModal: boolean
  setShowModal: (show: boolean) => void
}

const ServiceFormModal = ({ showModal, setShowModal }: Props) => {
  const queryClient = useQueryClient();
  const serviceForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      type: '',
      duration: '',
      price: undefined,
      time: '',
      availableDays: [],
      location: '',
      allowCustom: false
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      serviceForm.reset();
      handleClose(false);
      toast.success("Service created successfully");
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error(error.message || "Failed to create service");
    }
  });

  const handleClose = (open: boolean) => {
    if (!open) {
      serviceForm.reset();
    }
    setShowModal(open);
  };

  const onSubmit = (data: ServiceFormData) => {
    console.log('Form submitted with data:', data);
    mutate(data);
  };

  // Debug: Log form errors
  console.log('Form errors:', serviceForm.formState.errors);

  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Fill in the details for the new service.
          </DialogDescription>
        </DialogHeader>
        <Form {...serviceForm}>
          <form onSubmit={serviceForm.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div className='col-end-1 md:col-span-2'>
                <FormField
                  control={serviceForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Service title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={serviceForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {DoctorServiceTypeOptions.map((type) => (
                              <SelectItem key={type.value} value={String(type.value)}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={serviceForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {DoctorServiceDurationOptions.map((duration) => (
                              <SelectItem key={duration.value} value={String(duration.value)}>
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={serviceForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <NumberInput placeholder="Service price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={serviceForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type='time' placeholder="Service time" {...field} className='appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={serviceForm.control}
                  name="availableDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <MultiSelect onValuesChange={field.onChange} values={field.value}>
                        <FormControl>
                          <MultiSelectTrigger className="w-full">
                            <MultiSelectValue placeholder="Select days..." />
                          </MultiSelectTrigger>
                        </FormControl>
                        <MultiSelectContent search={false}>
                          <MultiSelectGroup>
                            {DayOfWeekOptions.map((day) => (
                              <MultiSelectItem key={day.value} value={String(day.value)}>
                                {day.label}
                              </MultiSelectItem>
                            ))}
                          </MultiSelectGroup>
                        </MultiSelectContent>
                      </MultiSelect>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={serviceForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder="Service location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={serviceForm.control}
                  name="allowCustom"
                  render={({ field }) => (
                    <FormItem className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        Custom Appointments
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <Button type="button" className='ml-auto' disabled={isPending} onClick={serviceForm.handleSubmit(onSubmit)}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ServiceFormModal