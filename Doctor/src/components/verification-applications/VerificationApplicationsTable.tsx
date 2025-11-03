"use client";
import { createVerificationApplication, listVerificationApplications } from "@/services/verification-application.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Spinner } from "../ui/spinner";
import { getApplicationStatusText } from "@/utils";
import { formatDate } from "date-fns";
import { useSession } from "next-auth/react";


const VerificationApplicationsTable = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data: applicationsData, isLoading, isError, error } = useQuery({
    queryFn: listVerificationApplications,
    queryKey: ["verification-applications"],
  });

  const { mutate: createApplicationMutate, isPending: isCreating } = useMutation({
    mutationFn: createVerificationApplication,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["verification-applications"] });
      toast.success("Verification application created successfully");
    },
    onError(error) {
      toast.error(error.message || "Failed to create verification application");
    }
  });
  const handleNewApplicationClick = () => {
    createApplicationMutate();
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        Error loading verification applications: {error.message}
      </div>
    );
  }
  return (
    <div className="py-2">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Verification Applications</h2>
        <Button size='sm' onClick={handleNewApplicationClick} disabled={isCreating || !!session?.user.pmdcVerifiedAt}>
          <PlusCircle /> Create New Application
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Application Status</TableHead>
            <TableHead>Results</TableHead>
            <TableHead>Reviewed At</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 py-6"
              >
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-6" /> Loading applications...
                </div>
              </TableCell>
            </TableRow>
          ) : applicationsData && applicationsData.length > 0 ? (
            applicationsData.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{getApplicationStatusText(application.status)}</TableCell>
                <TableCell>{application.results || "N/A"}</TableCell>
                <TableCell>{application.reviewedAt ? formatDate(application.reviewedAt, "PPpp") : "Not reviewed"}</TableCell>
                <TableCell>{formatDate(application.createdAt, "PPpp")}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 py-6"
              >
                No applications found.
              </TableCell>
            </TableRow>
          )}

        </TableBody>
      </Table>
    </div>
  )
}

export default VerificationApplicationsTable