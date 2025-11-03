import { Review } from '@/types/reviews';
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getAvatarFallbackText } from '@/utils';
import { Badge } from '../ui/badge';
import { Star } from 'lucide-react';

type Props = {
    selectedReview: Review | null;
    setSelectedReview: (review: Review | null) => void;
}

const ReviewDetailModal = ({ selectedReview, setSelectedReview }: Props) => {
    return (
        <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
            <DialogContent className="max-h-[90vh] overflow-y-auto custom-scrollbar">
                <DialogHeader>
                    <DialogTitle>Review Details</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={selectedReview?.user.imageURL ?? ""} alt={selectedReview?.user.fullName} />
                            <AvatarFallback>
                                {getAvatarFallbackText(selectedReview?.user.fullName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left space-y-1">
                            <h2 className="text-xl font-semibold">{selectedReview?.user.fullName}</h2>
                            <p className="text-muted-foreground">{selectedReview?.user.email}</p>
                            <p className="text-sm text-muted-foreground">{selectedReview?.user.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-3">
                        <Badge className="flex items-center gap-1 w-fit">
                            <Star className="w-4 h-4" /> {selectedReview?.ratings} / 5
                        </Badge>
                        <p>Comment: {selectedReview?.comment}</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => setSelectedReview(null)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewDetailModal