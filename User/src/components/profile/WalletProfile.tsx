"use client";

import { listWalletTopups } from "@/services/wallet.service";
import {
    Alert,
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Link,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import TopUpModal from "./TopupModal";
import { Banknote } from "lucide-react";

type Props = {
    topupStatus: "success" | "cancel" | undefined;
};

const WalletProfile = ({ topupStatus }: Props) => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);

    const {
        data: walletTopups,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["walletTopups"],
        queryFn: listWalletTopups,
    });
    if (isLoading) {
        return (
            <div className="w-full flex flex-col justify-center items-center p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center flex gap-2">
                        <Spinner />{" "}
                        <p className="text-gray-600">Loading your information...</p>
                    </div>
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="w-full flex flex-col justify-center items-center p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center flex gap-2 text-red-600">
                        <p className="text-gray-600">
                            Error loading wallet topups:{" "}
                            {error instanceof Error ? error.message : "Unknown error"}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col justify-center items-center p-2 md:p-10 gap-4 min-h-[91vh] relative bg-foreground">
            {topupStatus === "success" && (
                <Alert
                    color="success"
                    className="w-full max-w-5xl"
                    description="Your wallet top-up was successful! The amount should reflect in your balance shortly."
                />
            )}
            {topupStatus === "cancel" && (
                <Alert
                    color="danger"
                    className="w-full max-w-5xl"
                    description="Your wallet top-up was cancelled. If this was a mistake, please try again."
                />
            )}
            <Card className="w-full max-w-5xl">
                <CardHeader className="flex justify-between items-center text-primary">
                    <div className="flex items-center justify-center gap-6">
                        <Avatar
                            showFallback
                            size="lg"
                            className="size-20"
                            src={session?.user.imageURL ?? undefined}
                        />
                        <div className="text-left space-y-1">
                            <h2 className="text-2xl font-semibold">
                                {session?.user.fullName}
                            </h2>
                            <p>{session?.user.email}</p>
                            <p className="text-sm">{session?.user.phoneNumber}</p>
                        </div>
                    </div>
                    <div>
                        Wallet Balance:{" "}
                        <span className="font-semibold">
                            {walletTopups?.balance ?? 0} PKR
                        </span>
                    </div>
                </CardHeader>
                <CardBody>
                    <Button
                        color="primary"
                        className="mb-2"
                        onPress={() => {
                            setShowModal(true);
                        }}
                    >
                        <Banknote/>
                        Make a Top-up
                    </Button>
                    <Table aria-label="Wallet topups table">
                        <TableHeader>
                            <TableColumn>Amount</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Created At</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody
                            className="text-primary overflow-scroll custom-scrollbar"
                            emptyContent="No wallet top-ups found."
                        >
                            {(walletTopups?.sessions ?? []).map((topup) => (
                                <TableRow
                                    key={topup.id}
                                    className="text-primary overflow-scroll custom-scrollbar"
                                >
                                    <TableCell className="uppercase">
                                        {topup.amount} {topup.currency}
                                    </TableCell>
                                    <TableCell>
                                        {topup.status === "unpaid" && topup.checkoutURL === null
                                            ? "Cancelled"
                                            : topup.status === "paid"
                                                ? "Paid"
                                                : "Unpaid"}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(topup.createdAt).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={topup.checkoutURL ?? "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            isDisabled={
                                                topup.checkoutURL === null || topup.status === "paid"
                                            }
                                            className="underline"
                                        >
                                            {topup.status === "unpaid" && topup.checkoutURL === null
                                                ? "Cancelled"
                                                : topup.status === "paid"
                                                    ? "Paid"
                                                    : "Complete Payment"}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
            {showModal && (
                <TopUpModal showModal={showModal} setShowModal={setShowModal} />
            )}
        </div>
    );
};

export default WalletProfile;
