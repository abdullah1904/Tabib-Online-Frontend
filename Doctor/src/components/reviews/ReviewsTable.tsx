"use client";
import { listReviews } from "@/services/reviews.service";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, } from "../ui/table";
import { Avatar, AvatarFallback,AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { EllipsisVertical, Eye, Info, Star } from "lucide-react";
import { getAvatarFallbackText } from "@/utils";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Review } from "@/types/reviews";
import { useState } from "react";
import ReviewDetailModal from "./ReviewDetailModal";


const ReviewsTable = () => {
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const { data: reviewsData, isLoading, isError, error } = useQuery({
        queryFn: listReviews,
        queryKey: ["reviews"],
    });

    const handleView = (review: Review): void => {
        setSelectedReview(review);
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center h-40 text-red-500">
                Error loading reviews: {error.message}
            </div>
        );
    }
    return (
        <div className="py-2">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Reviews</h2>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Ratings</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-center text-gray-500 py-6"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Spinner className="size-6" /> Loading reviews...
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : reviewsData && reviewsData.length > 0 ? (
                        reviewsData.map((review) => (
                            <TableRow key={review.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-wrap">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={review.user.imageURL ?? ""} alt={review.user.fullName} />
                                            <AvatarFallback className="rounded-lg">
                                                {getAvatarFallbackText(review.user.fullName)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {review.user.fullName}
                                        <Tooltip>
                                            <TooltipTrigger className="sm:hidden">
                                                <Info className="size-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Email: {review.user.email}</p>
                                                <p>Phone: {review.user.phoneNumber}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>


                                <TableCell>
                                    <Badge>
                                        <Star/> {review.ratings} / 5
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => handleView(review)}
                                                className="cursor-pointer"
                                            >
                                                <Eye /> View
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-center text-gray-500 py-6"
                            >
                                No reviews found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {selectedReview && (
                <ReviewDetailModal
                    selectedReview={selectedReview}
                    setSelectedReview={setSelectedReview}
                />
            )}
        </div>
    )
}

export default ReviewsTable