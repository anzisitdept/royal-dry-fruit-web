'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { X, CheckCircle, Truck, MapPin, Banknote, CreditCard, Landmark, Smartphone, Wallet, Upload, Copy } from 'lucide-react';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { saveOrderToFirestore } from '@/lib/firestoreServices';
import { loadLocationData, LocationDataSet } from '@/lib/locationData';
import SearchableSelect from '@/components/checkout/SearchableSelect';

const PAYMENT_NETWORKS = [
  {
    id: 'jazzcash',
    name: 'JazzCash',
    kind: 'Wallet / Mobile Account',
    account: '0301 2345678',
    title: 'Royal Dry Fruits (RDF)',
    number: '0301 2345678',
    note: 'Transfer the exact amount to this JazzCash wallet and upload the transaction receipt to confirm your order.',
    icon: <Wallet className="w-4 h-4" />
  },
  {
    id: 'easypaisa',
    name: 'EasyPaisa',
    kind: 'Wallet / Mobile Account',
    account: '0345 9876543',
    title: 'Royal Dry Fruits (RDF)',
    number: '0345 9876543',
    note: 'Transfer the exact amount to this EasyPaisa wallet and upload the transaction receipt to confirm your order.',
    icon: <Smartphone className="w-4 h-4" />
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    kind: 'Bank Account / IBFT',
    account: 'Meezan Bank · PK36 MEZN 0006 1234 5678901',
    title: 'Royal Dry Fruits (Pvt) Ltd',
    bankName: 'Meezan Bank Limited',
    number: '0123 4567 8901',
    iban: 'PK36 MEZN 0006 1234 5678 9012',
    branch: 'Main Branch, Karachi',
    note: 'Online / IBFT — please add your full name as the transaction reference.',
    icon: <Landmark className="w-4 h-4" />
  },
  {
    id: 'card',
    name: 'Credit / Debit Card',
    kind: 'Secure Card Payment',
    account: 'Automated payment link',
    title: 'Secure Payment',
    number: '—',
    note: 'We will send a secure payment link on WhatsApp / email after you place the order.',
    icon: <CreditCard className="w-4 h-4" />
  }
];

const NETWORK_KIND_KEYS: Record<string, string> = {
  'Wallet / Mobile Account': 'checkout.walletKind',
  'Bank Account / IBFT': 'checkout.bankKind',
  'Secure Card Payment': 'checkout.cardKind',
};

function DetailRow({ label, value, copied, onCopy }: { label: string; value: string; copied: boolean; onCopy: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-xs font-extrabold text-gray-900 break-words">{value}</p>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold text-wine hover:underline"
      >
        <Copy className="w-3.5 h-3.5" />
        {copied ? t('checkout.copied') : t('checkout.copy')}
      </button>
    </div>
  );
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

async function uploadReceipt(file: File): Promise<string> {
  const extension = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `receipts/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extension}`;
  const fileRef = storageRef(storage!, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}

export default function CheckoutModal() {
  const { t } = useLanguage();
  const {
    cart,
    subtotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    amountNeededForFreeShipping
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [locationData, setLocationData] = useState<LocationDataSet | null>(null);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [location, setLocation] = useState({
    provinceId: '',
    districtId: '',
    tehsilId: ''
  });
  const [locationNames, setLocationNames] = useState({
    province: '',
    district: '',
    tehsil: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [paymentType, setPaymentType] = useState<'cod' | 'online'>('cod');
  const [paymentNetwork, setPaymentNetwork] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');

  useEffect(() => {
    if (isCheckoutOpen && !locationData) {
      setLoadingLocations(true);
      loadLocationData()
        .then(setLocationData)
        .catch(() => setLocationData(null))
        .finally(() => setLoadingLocations(false));
    }
  }, [isCheckoutOpen, locationData]);

  const provinces = useMemo(
    () =>
      (locationData?.provinces ?? []).map(p => ({
        value: p.id,
        label: p.name.en
      })),
    [locationData]
  );

  const districts = useMemo(() => {
    const list = locationData?.districts ?? [];
    const filtered = location.provinceId
      ? list.filter(d => d.parent.id === location.provinceId)
      : [];
    return filtered.map(d => ({
      value: d.id,
      label: d.name.en
    }));
  }, [locationData, location.provinceId]);

  const tehsils = useMemo(() => {
    const list = locationData?.tehsils ?? [];
    const filtered = location.districtId
      ? list.filter(t => t.parent.id === location.districtId)
      : [];
    return filtered.map(t => ({
      value: t.id,
      label: t.name.en
    }));
  }, [locationData, location.districtId]);

  // Auto-select a single available option
  useEffect(() => {
    if (districts.length === 1) {
      setLocation(l => ({
        ...l,
        districtId: districts[0].value,
        tehsilId: ''
      }));
      setLocationNames(n => ({ ...n, district: districts[0].label, tehsil: '' }));
    }
  }, [districts]);

  useEffect(() => {
    if (tehsils.length === 1) {
      setLocation(l => ({ ...l, tehsilId: tehsils[0].value }));
      setLocationNames(n => ({ ...n, tehsil: tehsils[0].label }));
    }
  }, [tehsils]);

  if (!isCheckoutOpen) return null;

  const deliveryFee = subtotal >= 3000 ? 0 : 200;
  const grandTotal = subtotal + deliveryFee;
  const selectedNetwork = paymentType === 'online'
    ? PAYMENT_NETWORKS.find(n => n.id === paymentNetwork)
    : undefined;

  const handleCopy = (key: string, value: string) => {
    if (!value || value === '—') return;
    navigator.clipboard?.writeText(value)
      .then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(''), 1500);
      })
      .catch(() => {});
  };

  const handleProvinceChange = (value: string, label: string) => {
    setLocation({ provinceId: value, districtId: '', tehsilId: '' });
    setLocationNames({ province: label, district: '', tehsil: '' });
  };

  const handleDistrictChange = (value: string, label: string) => {
    setLocation(l => ({ ...l, districtId: value, tehsilId: '' }));
    setLocationNames(n => ({ ...n, district: label, tehsil: '' }));
  };

  const handleTehsilChange = (value: string, label: string) => {
    setLocation(l => ({ ...l, tehsilId: value }));
    setLocationNames(n => ({ ...n, tehsil: label }));
  };

  const fullLocation = [locationNames.province, locationNames.district, locationNames.tehsil]
    .filter(Boolean)
    .join(', ');

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setReceiptFile(file);
    setReceiptPreview('');
    if (file && file.type.startsWith('image/')) {
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  const validateShipping = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert(t('checkout.alertFillShipping'));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert(t('checkout.alertInvalidEmail'));
      return false;
    }
    if (!location.provinceId || !location.districtId || !location.tehsilId) {
      alert(t('checkout.alertSelectLocation'));
      return false;
    }
    return true;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateShipping()) return;
    setCheckoutStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentType === 'online' && !paymentNetwork) {
      alert(t('checkout.alertSelectNetwork'));
      return;
    }
    if (paymentType === 'online' && !receiptFile) {
      alert(t('checkout.alertUploadReceipt'));
      return;
    }

    setIsSaving(true);

    const networkName = paymentType === 'online'
      ? PAYMENT_NETWORKS.find(n => n.id === paymentNetwork)?.name || 'Online Payment'
      : '';

    let receiptUrl = '';
    if (paymentType === 'online' && receiptFile) {
      try {
        receiptUrl = await uploadReceipt(receiptFile);
      } catch (uploadErr) {
        console.error('Receipt upload failed, using data URL fallback:', uploadErr);
        receiptUrl = await fileToDataURL(receiptFile);
      }
    }

    const orderPayload = {
      customerName: formData.fullName,
      customerEmail: formData.email.trim(),
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      city: fullLocation,
      province: {
        id: location.provinceId,
        name: locationNames.province
      },
      district: {
        id: location.districtId,
        name: locationNames.district
      },
      tehsil: {
        id: location.tehsilId,
        name: locationNames.tehsil
      },
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        selectedWeight: item.selectedWeight,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      shippingFee: deliveryFee,
      totalAmount: grandTotal,
      paymentMethod: paymentType === 'cod'
        ? 'Cash on Delivery (COD)'
        : `Online Payment (${networkName})`,
      paymentType,
      paymentNetwork: networkName || undefined,
      receiptUrl: receiptUrl || undefined,
      advancePaid: paymentType === 'online' ? grandTotal : 0,
      payableAtDelivery: paymentType === 'cod' ? grandTotal : 0,
      orderStatus: 'Pending' as const
    };

    // Save to Firestore in real-time for Admin Panel
    const result = await saveOrderToFirestore(orderPayload);
    const placedOrderId = result.orderId || '';

    // Trigger order confirmation email in the background
    try {
      fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: placedOrderId,
          customerName: formData.fullName,
          customerEmail: formData.email.trim(),
          customerPhone: formData.phone,
          shippingAddress: formData.address,
          city: fullLocation,
          items: orderPayload.items,
          subtotal,
          shippingFee: deliveryFee,
          totalAmount: grandTotal,
          paymentMethod: orderPayload.paymentMethod,
        }),
      }).catch(err => console.error("Email notification error:", err));
    } catch (err) {
      console.error("Failed to dispatch order email:", err);
    }

    setOrderId(placedOrderId);
    setIsSaving(false);
    setIsSubmitted(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
    setCheckoutStep(1);
    setPaymentType('cod');
    setPaymentNetwork('');
    setReceiptFile(null);
    setReceiptPreview('');
  };

  const summaryTotals = (
    <div>
      <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b pb-2 mb-3">
        {t('checkout.summaryItems', { count: cart.reduce((a, c) => a + c.quantity, 0) })}
      </h3>

      <div className="max-h-48 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-200">
        {cart.map(item => (
          <div key={item.cartId} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
            <div>
              <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
              <p className="text-[10px] text-gray-500">{item.selectedWeight} × {item.quantity}</p>
            </div>
            <span className="font-bold text-gray-900">Rs. {item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 pt-3 mt-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">{t('checkout.subtotalLabel')}</span>
          <span className="font-semibold">Rs. {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{t('checkout.shippingFeeLabel')}</span>
          <span className="font-semibold">
            {deliveryFee === 0 ? <span className="text-green-600 font-bold">{t('checkout.free')}</span> : `Rs. ${deliveryFee}`}
          </span>
        </div>
        <div className="flex justify-between text-sm font-extrabold border-t pt-2 text-wine">
          <span>{t('checkout.totalAmountLabel')}</span>
          <span>Rs. {grandTotal}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 md:p-4 overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 md:my-8 max-h-[95vh] md:max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="bg-wine text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Truck className="w-6 h-6" />
            <div>
              <h2 className="font-bold text-lg leading-tight uppercase tracking-wider">
                {isSubmitted ? t('checkout.orderConfirmedHeader') : t('checkout.title')}
              </h2>
              <p className="text-xs text-red-200">Official Store - Royal Dry Fruits</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isSubmitted ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">{t('checkout.thankYou', { name: formData.fullName })}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {t('checkout.yourOrderNumber')} <span className="font-bold text-wine">{orderId}</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {t('checkout.confirmationEmail', { email: formData.email })} {t('checkout.confirmationPhone', { phone: formData.phone })}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('checkout.customer')}</span>
                <span className="font-bold text-gray-800">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('checkout.emailAddressLabel')}</span>
                <span className="font-semibold text-gray-800">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('checkout.contactNumberLabel')}</span>
                <span className="font-semibold text-gray-800">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('checkout.shippingAddressLabel')}</span>
                <span className="font-semibold text-gray-800">{formData.address}, {fullLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('checkout.paymentMethodLabel')}</span>
                <span className="font-semibold text-gray-800">
                  {paymentType === 'online'
                    ? t('checkout.onlineSummary', { network: PAYMENT_NETWORKS.find(n => n.id === paymentNetwork)?.name || t('checkout.onlineFallback') })
                    : t('checkout.codTitle')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{paymentType === 'online' ? t('checkout.advancePaidLabel') : t('checkout.totalAmountCodLabel')}</span>
                <span className="font-extrabold text-wine text-sm">Rs. {grandTotal}</span>
              </div>
              {paymentType === 'online' && (receiptPreview || receiptFile) && (
                <div className="pt-1">
                  <span className="block text-gray-500 mb-1">{t('checkout.receiptLabel')}</span>
                  {receiptPreview ? (
                    <Image src={receiptPreview} alt={t('checkout.receiptLabel')} width={80} height={80} unoptimized className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                  ) : (
                    <span className="text-xs font-semibold text-green-700">✓ {t('checkout.receiptUploaded')}</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/923473811510?text=Hi%20Royal%20Dry%20Fruits,%20I%20placed%20order%20${orderId}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition"
              >
                <span>{t('checkout.trackOnWhatsApp')}</span>
              </a>
              <button
                onClick={handleClose}
                className="bg-wine text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-wine-deep transition"
              >
                {t('checkout.continueShopping')}
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={checkoutStep === 1 ? handleShippingSubmit : handlePaymentSubmit}
            className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-[80vh] md:max-h-none overflow-y-auto checkout-modal-body"
          >
            {/* Step Indicator */}
            <div className="md:col-span-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-1">
              <span className={`flex items-center gap-1.5 ${checkoutStep === 1 ? 'text-wine' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${checkoutStep === 1 ? 'border-wine bg-wine text-ivory' : 'border-gray-300'}`}>1</span>
                {t('checkout.stepShipping')}
              </span>
              <span className="text-gray-300">—</span>
              <span className={`flex items-center gap-1.5 ${checkoutStep === 2 ? 'text-wine' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${checkoutStep === 2 ? 'border-wine bg-wine text-ivory' : 'border-gray-300'}`}>2</span>
                {t('checkout.stepPayment')}
              </span>
            </div>

            {checkoutStep === 1 ? (
              <>
                {/* Left: Customer Info Form */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b pb-2">
                    {t('checkout.shippingInfo')}
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t('checkout.fullName')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('checkout.namePlaceholder')}
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t('checkout.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yourname@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">
                      {t('checkout.emailNote')}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t('checkout.mobileWhatsapp')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
                    />
                  </div>

                  {/* Location heading */}
                  <div className="pt-1">
                    <div className="flex items-center gap-1.5 border-b pb-2">
                      <MapPin size={14} className="text-wine" />
                      <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                        {t('checkout.locationHeading')}
                      </h4>
                    </div>
                  </div>

                  <SearchableSelect
                    label={t('checkout.province')}
                    placeholder={loadingLocations ? t('checkout.loadingProvinces') : t('checkout.selectProvince')}
                    options={provinces}
                    value={location.provinceId}
                    onChange={handleProvinceChange}
                    disabled={loadingLocations}
                    required
                  />

                  <SearchableSelect
                    label={t('checkout.district')}
                    placeholder={location.provinceId ? t('checkout.selectDistrict') : t('checkout.selectProvinceFirst')}
                    options={districts}
                    value={location.districtId}
                    onChange={handleDistrictChange}
                    disabled={!location.provinceId}
                    required
                  />

                  <SearchableSelect
                    label={t('checkout.tehsil')}
                    placeholder={location.districtId ? t('checkout.selectTehsil') : t('checkout.selectDistrictFirst')}
                    options={tehsils}
                    value={location.tehsilId}
                    onChange={handleTehsilChange}
                    disabled={!location.districtId}
                    required
                  />

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t('checkout.deliveryAddress')}
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder={t('checkout.addressPlaceholder')}
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t('checkout.specialInstructions')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('checkout.notesPlaceholder')}
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine outline-none"
                    />
                  </div>
                </div>

                {/* Right: Order Summary — Step 1 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between">
                  <div>
                    {summaryTotals}

                    <div className="mt-4 p-3 bg-wine/5 border border-wine/20 rounded-lg text-[11px] text-gray-700">
                      {t('checkout.step1Note', { cod: t('checkout.cod'), online: t('checkout.online') })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-lg transition-all"
                  >
                    {t('checkout.proceedToPayment')} →
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Left: Payment Method — Step 2 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-wine" />
                      {t('checkout.selectPaymentMethod')}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="text-[11px] font-bold text-wine hover:underline"
                    >
                      ← {t('checkout.backToShipping')}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPaymentType('cod')}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                      paymentType === 'cod' ? 'border-wine bg-wine/5' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${paymentType === 'cod' ? 'bg-wine text-ivory' : 'bg-gray-100 text-gray-500'}`}>
                      <Banknote className="w-4 h-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-bold text-gray-900">{t('checkout.codTitle')}</span>
                      <span className="block text-[10px] text-gray-500 mt-0.5">{t('checkout.codCardDesc')}</span>
                    </span>
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentType === 'cod' ? 'border-wine' : 'border-gray-300'}`}>
                      {paymentType === 'cod' && <span className="w-2 h-2 rounded-full bg-wine" />}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType('online');
                      setReceiptFile(null);
                      setReceiptPreview('');
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                      paymentType === 'online' ? 'border-wine bg-wine/5' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${paymentType === 'online' ? 'bg-wine text-ivory' : 'bg-gray-100 text-gray-500'}`}>
                      <CreditCard className="w-4 h-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-bold text-gray-900">{t('checkout.onlineCardTitle')}</span>
                      <span className="block text-[10px] text-gray-500 mt-0.5">{t('checkout.onlineCardDesc')}</span>
                    </span>
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentType === 'online' ? 'border-wine' : 'border-gray-300'}`}>
                      {paymentType === 'online' && <span className="w-2 h-2 rounded-full bg-wine" />}
                    </span>
                  </button>

                  {paymentType === 'cod' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-[11px] text-green-800 flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        {t('checkout.codInfoBox', { amount: grandTotal })}
                      </span>
                    </div>
                  )}

                  {paymentType === 'online' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-3">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                        <Wallet className="w-3.5 h-3.5 text-wine" />
                        {t('checkout.chooseNetwork')}
                      </span>

                      <div className="space-y-2">
                        {PAYMENT_NETWORKS.map((network) => (
                          <button
                            key={network.id}
                            type="button"
                            onClick={() => setPaymentNetwork(network.id)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-lg border-2 transition-all text-left ${
                              paymentNetwork === network.id ? 'border-wine bg-wine/5' : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${paymentNetwork === network.id ? 'bg-wine text-ivory' : 'bg-gray-100 text-gray-500'}`}>
                              {network.icon}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block text-[11px] font-bold text-gray-900">{network.name}</span>
                              <span className="block text-[10px] text-gray-500 truncate">{t(NETWORK_KIND_KEYS[network.kind] || 'checkout.onlineFallback')}</span>
                            </span>
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentNetwork === network.id ? 'border-wine' : 'border-gray-300'}`}>
                              {paymentNetwork === network.id && <span className="w-2 h-2 rounded-full bg-wine" />}
                            </span>
                          </button>
                        ))}
                      </div>

                      {selectedNetwork && (
                        <div className="bg-wine/5 border border-wine/20 rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold text-gray-800">
                              {t('checkout.transferTo')} <span className="text-wine">Rs. {grandTotal}</span>
                            </p>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                              {t(NETWORK_KIND_KEYS[selectedNetwork.kind] || 'checkout.onlineFallback')}
                            </span>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-2.5 space-y-1 text-xs">
                            <div className="flex justify-between gap-2">
                              <span className="text-gray-500 flex-shrink-0">{t('checkout.accountTitle')}</span>
                              <span className="font-bold text-gray-900 text-right">{selectedNetwork.title}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                              <span className="text-gray-500 flex-shrink-0">{t('checkout.accountNo')}</span>
                              <span className="font-bold text-gray-900 text-right">{selectedNetwork.number}</span>
                            </div>
                            {selectedNetwork.iban && (
                              <div className="flex justify-between gap-2">
                                <span className="text-gray-500 flex-shrink-0">{t('checkout.iban')}</span>
                                <span className="font-bold text-gray-900 text-right">{selectedNetwork.iban}</span>
                              </div>
                            )}
                            {selectedNetwork.bankName && (
                              <div className="flex justify-between gap-2">
                                <span className="text-gray-500 flex-shrink-0">{t('checkout.bankLabel')}</span>
                                <span className="font-bold text-gray-900 text-right">{selectedNetwork.bankName}</span>
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setAccountModalOpen(true)}
                            className="w-full flex items-center justify-center gap-1.5 bg-wine hover:bg-wine-deep text-white text-[11px] font-bold uppercase tracking-wide py-2 rounded-lg transition-colors"
                          >
                            <Landmark className="w-4 h-4" />
                            {t('checkout.viewAccountDetails')}
                          </button>
                          <p className="text-[10px] text-gray-600">{selectedNetwork.note}</p>
                        </div>
                      )}

                      <div>
                        <p className="text-[11px] font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-wine" />
                          {t('checkout.uploadReceipt')}
                        </p>
                        {receiptPreview ? (
                          <div className="flex items-center gap-3">
                            <Image src={receiptPreview} alt={t('checkout.receiptLabel')} width={64} height={64} unoptimized className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                            <div className="space-y-1.5">
                              <p className="text-[11px] font-semibold text-gray-700 truncate max-w-[180px]">{receiptFile?.name}</p>
                              <label className="cursor-pointer inline-block">
                                <input
                                  type="file"
                                  accept="image/*,application/pdf"
                                  className="hidden"
                                  onChange={handleReceiptChange}
                                />
                                <span className="text-[10px] font-bold text-wine uppercase tracking-wide">{t('checkout.changeReceipt')}</span>
                              </label>
                            </div>
                          </div>
                        ) : (
                          <label className="w-full flex flex-col items-center justify-center gap-1.5 p-4 rounded-lg border-2 border-dashed border-gray-300 bg-white cursor-pointer hover:border-wine hover:bg-wine/5 transition-colors text-center">
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              onChange={handleReceiptChange}
                            />
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-[11px] font-semibold text-gray-600">
                              {t('checkout.receiptHint')}
                            </span>
                            <span className="text-[10px] text-gray-400">{t('checkout.receiptFormats')}</span>
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Order Summary — Step 2 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between">
                  <div>
                    {summaryTotals}

                    <div className={`mt-4 p-3 rounded-lg border text-[11px] ${paymentType === 'online' ? 'bg-wine/5 border-wine/20 text-gray-700' : 'bg-green-50 border-green-200 text-green-800'}`}>
                      {paymentType === 'online' ? (
                        <>
                          <p className="font-bold">
                            {t('checkout.onlineSummary', { network: PAYMENT_NETWORKS.find(n => n.id === paymentNetwork)?.name || t('checkout.selectNetworkFallback') })}
                          </p>
                          <p className="mt-1">
                            {t('checkout.advancePaid', { amount: grandTotal })}
                            {receiptFile ? ` · ${t('checkout.receiptAttached')} ✓` : ` · ${t('checkout.receiptRequired')}`}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold">{t('checkout.codTitle')}</p>
                          <p className="mt-1">{t('checkout.codNote', { amount: grandTotal })}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSaving ? t('checkout.processingOrder') : t('checkout.confirmOrder')}
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {accountModalOpen && selectedNetwork && (
          <div
            className="absolute inset-0 z-30 bg-black/50 flex items-center justify-center p-3 overflow-y-auto"
            onClick={() => setAccountModalOpen(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden my-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-wine text-white px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                    {selectedNetwork.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide">{selectedNetwork.name}</h3>
                    <p className="text-[10px] text-red-200">{t(NETWORK_KIND_KEYS[selectedNetwork.kind] || 'checkout.onlineFallback')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAccountModalOpen(false)}
                  aria-label={t('checkout.closeAccountDetails')}
                  className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-center text-xs text-gray-600">
                  {t('checkout.accountModalIntro', { amount: grandTotal })}
                </p>

                <div className="space-y-2">
                  <DetailRow
                    label={t('checkout.detailNetwork')}
                    value={selectedNetwork.name}
                    copied={copiedKey === 'network'}
                    onCopy={() => handleCopy('network', selectedNetwork.name)}
                  />
                  <DetailRow
                    label={t('checkout.accountTitle')}
                    value={selectedNetwork.title}
                    copied={copiedKey === 'title'}
                    onCopy={() => handleCopy('title', selectedNetwork.title)}
                  />
                  <DetailRow
                    label={t('checkout.accountNo')}
                    value={selectedNetwork.number}
                    copied={copiedKey === 'number'}
                    onCopy={() => handleCopy('number', selectedNetwork.number)}
                  />
                  {selectedNetwork.bankName && (
                    <DetailRow
                      label={t('checkout.detailBank')}
                      value={selectedNetwork.bankName}
                      copied={copiedKey === 'bank'}
                      onCopy={() => handleCopy('bank', selectedNetwork.bankName)}
                    />
                  )}
                  {selectedNetwork.iban && (
                    <DetailRow
                      label={t('checkout.iban')}
                      value={selectedNetwork.iban}
                      copied={copiedKey === 'iban'}
                      onCopy={() => handleCopy('iban', selectedNetwork.iban)}
                    />
                  )}
                  {selectedNetwork.branch && (
                    <DetailRow
                      label={t('checkout.detailBranch')}
                      value={selectedNetwork.branch}
                      copied={copiedKey === 'branch'}
                      onCopy={() => handleCopy('branch', selectedNetwork.branch)}
                    />
                  )}
                </div>

                <div className="bg-wine/5 border border-wine/20 rounded-lg p-3 text-[10px] text-gray-600 leading-relaxed">
                  {selectedNetwork.note}
                </div>

                <button
                  type="button"
                  onClick={() => setAccountModalOpen(false)}
                  className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-colors"
                >
                  {t('checkout.done')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
