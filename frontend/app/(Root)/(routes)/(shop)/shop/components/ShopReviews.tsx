import {Star, ChevronDown, ChevronUp} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Progress} from "@/components/ui/progress"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"

interface shopReviewsInteterface {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    reviewsData: any[];
    averageRating: number;
    ratingCounts: Record<number, number>;
}

const ShopReviews = ({expanded, setExpanded, reviewsData, averageRating, ratingCounts}: shopReviewsInteterface) => {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-6">Customer Reviews</h1>
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="flex items-center mb-4 md:mb-0">
                            <span className="text-4xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-6 h-6 ${
                                            star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Based on {reviewsData.length} reviews
                        </div>
                    </div>

                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center">
                                <span className="w-8 text-sm">{rating} star</span>
                                <Progress
                                    value={(ratingCounts[rating] || 0) / reviewsData.length * 100}
                                    className="h-2 mx-2 flex-grow"
                                />
                                <span className="w-8 text-sm text-right">
                  {((ratingCounts[rating] || 0) / reviewsData.length * 100).toFixed(0)}%
                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {reviewsData.slice(0, expanded ? undefined : 3).map((review) => (
                    <Card key={review.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start">
                                <Avatar className="w-10 h-10 mr-4">
                                    <AvatarImage src={review.avatar} alt={review.name}/>
                                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold">{review.name}</h3>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                    <div className="flex mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${
                                                    star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{review.text}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {reviewsData.length > 3 && (
                <div className="mt-6 text-center">
                    <Button
                        variant="outline"
                        onClick={() => setExpanded(!expanded)}
                        className="inline-flex items-center"
                    >
                        {expanded ? (
                            <>
                                Show Less <ChevronUp className="ml-2 h-4 w-4"/>
                            </>
                        ) : (
                            <>
                                Show More <ChevronDown className="ml-2 h-4 w-4"/>
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ShopReviews