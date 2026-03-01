"use client";
import { Button } from "@heroui/react"
import { PlusCircle } from "lucide-react"
import VerificationApplicationFormModal from "./VerificationApplicationFormModal";
import { useState } from "react";


const VerificationApplicationsTable = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="text-primary flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">PMDC Verification Applications</h2>
                <Button color="primary" onPress={() => setShowModal(true)}>
                    <PlusCircle />
                </Button>
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