'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import PageHeader from '@/components/layout/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactUsPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <TopBar />
      <Header />

      <PageHeader titleKey="pages.contact.title" subtitleKey="pages.contact.subtitle" />

      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Form */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <h2 className="text-xl font-bold font-serif text-gray-900 uppercase">
              {t('contactPage.formTitle')}
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-200 space-y-3">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">{t('contactPage.successTitle')}</h3>
                <p className="text-xs text-gray-600">
                  {t('contactPage.successBody')}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-wine text-white text-xs font-bold px-6 py-2.5 rounded-lg"
                >
                  {t('contactPage.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t('contactPage.labelName')}</label>
                  <input
                    type="text"
                    required
                    placeholder={t('contactPage.placeholderName')}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">{t('contactPage.labelPhone')}</label>
                    <input
                      type="tel"
                      required
                      placeholder={t('contactPage.placeholderPhone')}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">{t('contactPage.labelEmail')}</label>
                    <input
                      type="email"
                      placeholder={t('contactPage.placeholderEmail')}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t('contactPage.labelSubject')}</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none bg-white"
                  >
                    <option value="General Inquiry">{t('contactPage.subjectGeneral')}</option>
                    <option value="Delivery Tracking">{t('contactPage.subjectTracking')}</option>
                    <option value="Wholesale / Bulk">{t('contactPage.subjectWholesale')}</option>
                    <option value="Feedback">{t('contactPage.subjectFeedback')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t('contactPage.labelMessage')}</label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t('contactPage.placeholderMessage')}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-md transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('contactPage.submitMessage')}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details */}
          <div className="space-y-6">
            <div className="bg-sand p-8 rounded-3xl border border-red-100 space-y-6">
              <h3 className="text-xl font-bold font-serif text-wine uppercase">
                {t('contactPage.helplineTitle')}
              </h3>

              <div className="space-y-4 text-xs text-gray-800">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl text-wine shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase">{t('contactPage.supportHelpline')}</h4>
                    <p className="font-bold text-sm text-wine mt-0.5">0347-3811510</p>
                    <p className="text-gray-500 text-[11px]">{t('contactPage.availableMonSat')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl text-green-600 shadow-xs">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase">{t('contactPage.whatsappSupport')}</h4>
                    <a
                      href="https://wa.me/923473811510"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-sm text-green-700 underline mt-0.5 block hover:text-green-800"
                    >
                      {t('contactPage.clickToChat')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl text-wine shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase">{t('contactPage.emailSupport')}</h4>
                    <p className="font-semibold text-gray-800">hello@royaldryfruits.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl text-wine shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase">{t('contactPage.headOffice')}</h4>
                    <p className="font-medium text-gray-700 leading-relaxed">
                      {t('contactPage.headOfficeText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pakistan Coverage Banner */}
            <div className="bg-gray-900 text-white p-6 rounded-3xl text-center space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-wider text-yellow-400">{t('contactPage.coverageTitle')}</h4>
              <p className="text-xs text-gray-300">
                {t('contactPage.coverageText')}
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
