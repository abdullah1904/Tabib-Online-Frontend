'use client';
import { deleteConsultation, listConsultations } from "@/services/consultation.service";
import { Consultation } from "@/types/consultations";
import { formatTime, getConsultationDurationText, getConsultationTypeText, getDayText, showToast } from "@/utils";
import { Button, Card, CardHeader, Spinner, CardBody, CardFooter } from "@heroui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Pencil, PlusCircle, Trash, XCircle } from "lucide-react";
import { useState } from "react";
import ConsultationFormModal from "./ConsultationFormModal";
import { ConsultationType } from "@/utils/constants";

const ConsultationsTable = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const {
    data: consultations = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["consultations"],
    queryFn: () => listConsultations(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  const deleteMutation = useMutation({
      mutationFn: deleteConsultation,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["consultations"] });
        showToast("Consultation service deleted successfully", "success");
      },
      onError: (error) => {
        showToast(`Failed to delete consultation service: ${error.message}`, "error");
      }
  });
  const handleEdit = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setShowModal(true);
  }
  const handleDelete = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    deleteMutation.mutate(consultation.id);
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]  text-red-500">
        Error loading consultations: {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]  gap-2 text-primary">
        <Spinner /> Loading consultations...
      </div>
    )
  }
  return (
    <>
      <div className="text-primary flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Offered Consultations Services</h2>
        <Button color="primary" onPress={() => setShowModal(true)}>
          <PlusCircle/>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {consultations.map((consultation) => (
          <Card key={consultation.id} className="mb-4 text-primary">
            <CardHeader>
              <h3 className="text-lg font-medium">{consultation.title}</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p className="text-sm"><span className="font-bold">Type:</span> {getConsultationTypeText(consultation.type)}</p>
                <p className="text-sm"><span className="font-bold">Duration:</span> {getConsultationDurationText(consultation.duration)}</p>
                <p className="text-sm"><span className="font-bold">Price:</span> {consultation.price} PKR</p>
                <p className="text-sm"><span className="font-bold">Time:</span> {formatTime(consultation.time)}</p>
                <div className="text-sm flex items-center gap-2">
                  <span className="font-bold">Allow Custom:</span>
                  {consultation.allowCustom ? (
                    <CheckCircle className="text-primary size-4" />
                  ) : (
                    <XCircle className="text-danger size-4" />
                  )}
                </div>
                <p className="text-sm col-span-1 md:col-span-2">
                  <span className="font-bold">Available Days:</span> {consultation.consultationSlots.map(slot => getDayText(slot.dayOfWeek)).join(", ")}
                </p>
                {consultation.type === ConsultationType.IN_PERSON && (
                  <p className="text-sm col-span-1 md:col-span-2">
                    <span className="font-bold">Location:</span> {consultation.location}
                  </p>
                )}
              </div>
            </CardBody>
            <CardFooter className="flex justify-end gap-2">
              <Button color="primary" size="sm" onPress={() => handleEdit(consultation)}>
                <Pencil size={16} />
              </Button>
              <Button color="danger" size="sm" onPress={() => handleDelete(consultation)}>
                {deleteMutation.isPending && selectedConsultation?.id === consultation.id ? (
                  <Spinner size="sm" />
                ) : (
                  <Trash size={16} />
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {showModal && (
        <ConsultationFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedConsultation={selectedConsultation}
          setSelectedConsultation={setSelectedConsultation}
        />
      )}
    </>
  )
}

export default ConsultationsTable