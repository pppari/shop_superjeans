import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Star } from "lucide-react";
import axios from "../lib/axios";


export default function ReviewForm({ productId, productColorId, userId, orderId, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await axios.post("/api/review", {
        productId,
        userId,
        orderId,
        productColorId,
        score: rating,
        message: comment,
      });
      onSuccess?.();
    } catch (err) {
      console.error("Review submit failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid space-y-2">
        <Label>ให้คะแนน</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-6 h-6 cursor-pointer ${
                i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(i)}
            />
          ))}
        </div>
      </div>
      <div className="grid space-y-2">
        <Label>แสดงความคิดเห็น</Label>
        <Textarea
          placeholder="พิมพ์รีวิวของคุณที่นี่..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit} disabled={submitting || !comment}>
        {submitting ? "กำลังส่ง..." : "ส่งรีวิว"}
      </Button>
    </div>
  );
}
