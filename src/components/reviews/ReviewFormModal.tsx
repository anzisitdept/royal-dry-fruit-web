'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, MessageSquareHeart, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { saveReviewToFirestore } from '@/lib/firestoreServices';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewFormModal({ isOpen, onClose }: ReviewFormModalProps) {
  if (!isOpen) return null;
  return createPortal(<ReviewFormContent onClose={onClose} />, document.body);
}

function ReviewFormContent({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [author, setAuthor] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [hoverStars, setHoverStars] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    const result = await saveReviewToFirestore({
      productId: 'store',
      author: author.trim() || 'Anonymous',
      rating,
      title: title.trim(),
      body: body.trim(),
      isVerified: false,
      status: 'pending'
    });
    setSubmitting(false);
    if (result.success) setSuccess(true);
  };

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 overflow-y-auto font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl my-8 animate-slideUp">
        {/* Header */}
        <div className="bg-wine text-white px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-sm uppercase tracking-wider">
              {t('reviews.reviewFormHeading')}
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label={t('reviews.modalClose')}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          /* Success state */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <CheckCircle className="w-9 h-9" />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{t('reviews.reviewFormSuccess')}</p>
            <button
              onClick={handleClose}
              className="bg-wine hover:bg-wine-deep text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg transition-colors"
            >
              {t('reviews.modalClose')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4">
            <p className="text-[11px] text-gray-500 bg-sand/60 border border-sand px-3 py-2 rounded-lg">
              {t('reviews.reviewFormIntro')}
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('reviews.reviewFormName')} *
              </label>
              <input
                type="text"
                required
                maxLength={60}
                placeholder={t('reviews.authorAnonymous')}
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('reviews.reviewFormEmail')}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
              />
            </div>

            {/* Star rating */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {t('reviews.reviewFormRating')} *
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverStars(star)}
                    onMouseLeave={() => setHoverStars(0)}
                    className="p-1 transition-transform hover:scale-110"
                    aria-label={`${star} star`}
                  >
                    <Star
                      size={26}
                      className={`transition-colors ${
                        star <= (hoverStars || rating)
                          ? 'fill-wine text-wine'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('reviews.reviewFormTitle')}
              </label>
              <input
                type="text"
                maxLength={80}
                placeholder={t('reviews.reviewFormTitlePlaceholder')}
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('reviews.reviewFormBody')} *
              </label>
              <textarea
                required
                rows={4}
                maxLength={600}
                placeholder={t('reviews.reviewFormBodyPlaceholder')}
                value={body}
                onChange={e => setBody(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none resize-none"
              />
              <p className="text-right text-[10px] text-gray-400 mt-1">{body.length}/600</p>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={handleClose}
                disabled={submitting}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {t('reviews.modalCancel')}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-wine hover:bg-wine-deep text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <MessageSquareHeart className="w-4 h-4" />
                {submitting ? t('reviews.processing') : t('reviews.reviewFormSubmit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}