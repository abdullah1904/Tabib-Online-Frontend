"use client";
import { listReviews } from "@/services/review.service";
import { Review } from "@/types/review";
import {
  Spinner,
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Star } from "lucide-react";
import { useState } from "react";
import ReviewInfoModal from "./ReviewInfoModal";

const ReviewsTable = () => {
  const [selected, setSelected] = useState<Review | null>(null);
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => listReviews(),
    staleTime: 5 * 60 * 1000,
  });
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]  text-red-500">
        Error loading reviews: {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]  gap-2 text-primary">
        <Spinner /> Loading reviews...
      </div>
    );
  }
  return (
    <>
      <div className="text-primary">
        <h2 className="text-2xl font-semibold mb-4">Patient Reviews</h2>
      </div>
      <Table>
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn className="hidden md:table-cell">Ratings</TableColumn>
          <TableColumn className="hidden md:table-cell">Created At</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar src={review.user.imageURL} alt={review.user.fullName} />
                <div>
                  {review.user.fullName}
                  <p className="text-muted text-sm">{review.user.email}</p>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Chip color="primary" startContent={<Star className="size-3" />}>
                  <span>{review.rating} / 5</span>
                </Chip>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(review.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <EllipsisVertical className="text-primary cursor-pointer" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="view" onClick={() => setSelected(review)}>View Details</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selected && <ReviewInfoModal selected={selected} setSelected={setSelected} />}
    </>
  );
};

export default ReviewsTable;
