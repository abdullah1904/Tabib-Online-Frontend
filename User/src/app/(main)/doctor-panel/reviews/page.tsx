import ReviewsTable from "@/components/reviews/ReviewsTable"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | Tabib Online",
};

const ReviewsPage = () => {
  return (
    <ReviewsTable/>
  )
}

export default ReviewsPage