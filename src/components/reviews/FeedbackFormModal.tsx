'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageSquareHeart, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { saveFeedbackToFirestore } from '@/lib/firestoreServices';

interface FeedbackFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackFormModal({ isOpen, onClose }: FeedbackFormModalProps) {
  if (!isOpen) return null;
  return createPortal(<FeedbackFormContent onClose={onClose} />, document.body);
}

function FeedbackFormContent({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [author, setAuthor] = useState(user?.displayName || '');
  const [contact, setContact] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    const result = await saveFeedbackToFirestore({
      author: author.trim() || 'Anonymous',
      contact: contact.trim(),
      message: message.trim()
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
              <MessageSquareHeart className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-sm uppercase tracking-wider">
              {t('reviews.feedbackFormHeading')}
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
            <p className="text-sm text-gray-700 leading-relaxed">{t('reviews.feedbackFormSuccess')}</p>
            <button
              onClick={handleClose}
              className="bg-wine hover:bg-wine-deep text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg transition-colors"
            >
              {t('reviews.modalClose')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4">
            <p className="text-[11px] text-gray-500 bg-sand/60 border border-sand px-3 py-2 rounded-lg flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-wine flex-shrink-0 mt-0.5" />
              <span>{t('reviews.feedbackFormIntro')}</span>
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('reviews.feedbackFormName')} *
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
                {t('reviews.feedbackFormContact')}
              </label>
              <input
                type="text"
                maxLength={80}
                value={contact}
                onChange={e => setContact(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t('reviews.feedbackFormMessage')} *
              </label>
              <textarea
                required
                rows={5}
                maxLength={1000}
                placeholder={t('reviews.feedbackFormMessagePlaceholder')}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none resize-none"
              />
              <p className="text-right text-[10px] text-gray-400 mt-1">{message.length}/1000</p>
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
                {submitting ? t('reviews.processing') : t('reviews.feedbackFormSubmit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}