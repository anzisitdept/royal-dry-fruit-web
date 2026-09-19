import React from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import PageHeader from '@/components/layout/PageHeader';

export default function CancellationPolicyPage() {
  return (
    <>
      <TopBar />
      <Header />

      <PageHeader titleKey="pages.cancellation" />

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
          <p>
            At Royal Dry Fruits (RDF), we understand that plans can change. This Cancellation Policy explains how you may cancel an order, and what to expect regarding cancelled orders placed with us.
          </p>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">1. Cancellation Within 24 Hours</h2>
            <p>
              You may cancel any order free of charge within <strong>24 hours</strong> of placing it, as long as the parcel has not yet been dispatched. To cancel, contact our customer support team by phone or WhatsApp at <strong>0347-3811510</strong> — or email us at <strong>hello@royaldryfruits.com</strong> — with your order number.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">2. Cash on Delivery (COD) Cancellations</h2>
            <p>
              For Cash on Delivery orders, you may cancel your order <strong>any time before your parcel is dispatched</strong> without any charges. Once the parcel has been handed over to the courier, the order can no longer be cancelled and you will be expected to receive it.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">3. Orders Already Dispatched</h2>
            <p>
              Orders that have already been dispatched to the courier network cannot be cancelled. If you no longer wish to accept the parcel, we kindly ask you to refuse it at delivery. Once the parcel is returned to us and verified, we will process any applicable refund or store credit.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">4. Repeated Cancellations</h2>
            <p>
              Repeated cancellations or refusal of COD parcels may result in restrictions on placing future orders from the same name, number, or address, as outlined in our Terms &amp; Conditions.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">5. Refunds for Cancelled Orders</h2>
            <p>
              If you had made any advance payment and your order is cancelled and approved for refund, the amount will be returned via <strong>Bank Transfer, JazzCash, or Easypaisa</strong> within <strong>3 to 5 working days</strong>. You will receive a confirmation once the refund has been initiated.
            </p>
          </div>

          <p className="pt-2 text-gray-500">
            For any questions about cancellation or to cancel an order, WhatsApp us at <strong>0347-3811510</strong> or email <strong>hello@royaldryfruits.com</strong>.
          </p>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}