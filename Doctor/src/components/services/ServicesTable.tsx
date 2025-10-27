"use client";
import { PlusCircle, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteService, listServices } from "@/services/services.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import ServiceFormModal from "./ServiceFormModal";

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {servicesData?.map(service => (
                        <Card key={service.id} >
                            <CardHeader>
                                <CardTitle>
                                    {service.title}
                                </CardTitle>
                                <CardDescription>
                                    {service.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2">
                                <p>Price: {service.price} PKR</p>
                                <p>Duration: {service.duration} minutes</p>
                                <p>Type: {service.type}</p>
                                <p>Location: {service.location ? service.location : "N/A"}</p>
                                <Separator />
                            </CardContent>
                            <CardFooter>
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