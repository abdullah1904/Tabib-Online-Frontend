"use client";
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { ListRestart, PlusCircle } from "lucide-react"
import VerificationApplicationFormModal from "./VerificationApplicationFormModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { listVerificationApplications } from "@/services/verification-application.service";
import { format } from "date-fns";
import { getPMDCApplicationStatusText } from "@/utils";


const VerificationApplicationsTable = () => {
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const {
        data: verificationApplications,
        isLoading,
        isError,
        error,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: ['verificationApplications'],
        queryFn: () => listVerificationApplications(session?.user?.id as string),
        enabled: !!session?.user?.id,
        staleTime: 5 * 60 * 1000
    });
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2">
                    <Spinner />{" "}
                    <p className="text-gray-600">Loading applications...</p>
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center flex gap-2 text-red-600">
                    <p className="text-gray-600">
                        Error loading verification applications:{" "}
                        {error instanceof Error ? error.message : "Unknown error"}
                    </p>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="text-primary">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">PMDC Verification Applications</h2>
                    <div className="flex gap-2">
                        <Button color="primary" onPress={() => refetch()} isDisabled={isRefetching}>
                            <ListRestart />
                        </Button>
                        <Button color="primary" onPress={() => setShowModal(true)}>
                            <PlusCircle />
                        </Button>
                    </div>
                </div>
                <div>

                    <Table>
                        <TableHeader>
                            <TableColumn>Redg No.</TableColumn>
                            <TableColumn>Redg Date</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Results</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {(verificationApplications ?? []).map((application) => (
                                <TableRow
                                    key={application.id}
                                    className="text-primary overflow-scroll custom-scrollbar"
                                >
                                    <TableCell>
                                        {application.PMDCRedgNo}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(application.PMDCRedgDate), "PPP")}
                                    </TableCell>
                                    <TableCell>
                                        {getPMDCApplicationStatusText(application.status)}
                                    </TableCell>
                                    <TableCell>
                                        {application.results ?? "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {setShowModal && (
                <VerificationApplicationFormModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
        </>
    )
}

export default VerificationApplicationsTable