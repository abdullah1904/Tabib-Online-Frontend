"use client";
import { Info, PlusCircle, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteService, listServices } from "@/services/services.service";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import ServiceFormModal from "./ServiceFormModal";
import { formatTime, getDayText, getDoctorServiceDurationText, getDoctorServiceTypeText } from "@/utils";
import { DoctorServiceType } from "@/utils/constants";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

const ServicesTable = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const { data: servicesData, isLoading, isError, error } = useQuery({
        queryFn: listServices,
        queryKey: ["services"],
    });

    const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: deleteService,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            toast.success("Service deleted successfully");
        },
        onError(error) {
            toast.error(error.message || "Failed to delete service");
        },
        onSettled() {
            setSelectedServiceId(null);
        },
    });

    const handleModalOpen = () => {
        setShowModal(true);
    }

    const handleDelete = (serviceId: number): void => {
        setSelectedServiceId(serviceId);
        deleteMutate(serviceId);
    };
    if (isError) {
        return (
            <div className="flex items-center justify-center h-40 text-red-500">
                Error loading services: {error.message}
            </div>
        );
    }
    return (
        <div className="py-2">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Offered Services</h2>
                <Button size='sm' onClick={handleModalOpen}>
                    <PlusCircle /> Add New Service
                </Button>
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center h-40">
                    <p>Loading services...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch my-4">
                    {servicesData?.map(service => (
                        <Card key={service.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>
                                    {service.title} {service.allowCustom && "(Custom Appointments Allowed)"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2">
                                <span className="flex gap-2">
                                    <p>
                                        Type: {getDoctorServiceTypeText(service.type)}
                                    </p>
                                    {service.type === DoctorServiceType.IN_PERSON && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="size-4"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {service.location}
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </span>
                                <p>Duration: {getDoctorServiceDurationText(service.duration)}</p>
                                <p>Price: {service.price} PKR</p>
                                <p>Time: {formatTime(service.time)}</p>
                                <Separator className="w-full col-span-2" />
                                <p className="col-span-2">Availability Days: {service.availableDays.map((day) => getDayText(day)).join(", ")}</p>

                            </CardContent>
                            <CardFooter className="mt-auto">
                                <Button variant="destructive" size="sm" disabled={isDeleting && selectedServiceId === service.id} onClick={() => handleDelete(service.id)}>
                                    <Trash /> Delete Service
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
            {showModal && (
                <ServiceFormModal showModal={showModal} setShowModal={setShowModal} />
            )}
        </div>
    )
}

export default ServicesTable