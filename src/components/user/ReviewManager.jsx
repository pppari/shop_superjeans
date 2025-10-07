'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pagination } from '@/components/ui/pagination';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import getToken from '@/hooks/getToken';
import { jwtDecode } from 'jwt-decode';
import { Label } from '../ui/label';
import { Star } from 'lucide-react';

const REVIEWS_PER_PAGE = 5;

export default function UserReviewManager() {
  const token = getToken();
  const userId = jwtDecode(token).id;

  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [editedScore, setEditedScore] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchUserReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/review/user/' + userId);
      setReviews(res.data.data || []);
    } catch (error) {
      toast.error('โหลดรีวิวล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editedMessage || editedScore < 1 || editedScore > 5) {
      toast.error('กรุณาให้คะแนนและกรอกข้อความรีวิว');
      return;
    }

    setSubmitting(true);
    try {
      await axios.put(`/api/review/${editingReview._id}`, {
        message: editedMessage,
        score: Number(editedScore),
      });
      toast.success('อัปเดตรีวิวสำเร็จ');
      setEditingReview(null);
      fetchUserReviews();
    } catch (err) {
      toast.error('แก้ไขรีวิวล้มเหลว');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/review/${id}`, { isDeleted: true });
      toast.success('ลบรีวิวเรียบร้อย');
      setConfirmDeleteId(null);
      fetchUserReviews();
    } catch (error) {
      toast.error('ลบรีวิวล้มเหลว');
    }
  };

  const paginatedReviews = reviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  useEffect(() => {
    fetchUserReviews();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">รีวิวของฉัน</h1>

      {loading ? (
        <p>กำลังโหลด...</p>
      ) : paginatedReviews.length === 0 ? (
        <p className="text-gray-500">คุณยังไม่มีรีวิว</p>
      ) : (
        paginatedReviews.map((review) => (
          <Card key={review._id} className="p-4 space-y-2 border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{review.productId?.name}</p>
                <div className='flex space-x-2 pt-4'>
                     {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-6 ${
                                i <= review.score
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingReview(review);
                        setEditedMessage(review.message);
                        setEditedScore(review.score);
                      }}
                    >
                      แก้ไข
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>แก้ไขรีวิว</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid space-y-2">
                        <Label>ให้คะแนน</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 cursor-pointer ${
                                i <= editedScore
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                              onClick={() => setEditedScore(i)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid space-y-2">
                        <Label>แสดงความคิดเห็น</Label>
                        <Textarea
                          placeholder="พิมพ์รีวิวของคุณที่นี่..."
                          value={editedMessage}
                          onChange={(e) => setEditedMessage(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleEditSubmit}
                        disabled={submitting || !editedMessage}
                        className="w-full"
                      >
                        {submitting ? 'กำลังส่ง...' : 'บันทึก'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setConfirmDeleteId(review._id)}
                    >
                      ลบ
                    </Button>
                  </DialogTrigger>
                  {confirmDeleteId === review._id && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>ยืนยันการลบ</DialogTitle>
                      </DialogHeader>
                      <p>คุณแน่ใจหรือไม่ว่าต้องการลบรีวิวนี้?</p>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          ยกเลิก
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(review._id)}
                        >
                          ลบเลย
                        </Button>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </div>
            <p className="text-sm text-gray-700">{review.message}</p>
          </Card>
        ))
      )}

      {reviews.length > REVIEWS_PER_PAGE && (
        <div className="flex justify-center pt-4">
          <Pagination
            total={Math.ceil(reviews.length / REVIEWS_PER_PAGE)}
            current={page}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
