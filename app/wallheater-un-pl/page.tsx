"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { GoogleAdsScript } from '@/components/GoogleAdsTracking';
import {
  LucideShieldCheck,
  LucideTruck,
  LucideCheckCircle,
  LucideFlame,
  LucideZap,
  LucideWind,
  LucideThermometer,
  LucideLock,
  LucidePackage,
  LucideChevronDown,
  LucideHome,
  LucideBatteryCharging,
  LucideAlertCircle,
  LucideSnowflake,
  LucideStar,
  LucideChevronRight,
  LucideMinus,
  LucidePlus
} from 'lucide-react';

// Prefisso Polonia
const PHONE_PREFIX = '+48';
const PHONE_LENGTH = 9;

// Rimuove il prefisso se presente
const cleanPhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+48')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('48') && cleaned.length > 9) {
    cleaned = cleaned.slice(2);
  }
  cleaned = cleaned.replace(/\+/g, '');
  return cleaned.replace(/[^0-9]/g, '');
};

// Validazione numero - 9 cifre per Polonia
const validatePhone = (phone: string): { valid: boolean; error: string } => {
  const cleaned = cleanPhoneNumber(phone);

  if (cleaned.length === 0) {
    return { valid: false, error: '' };
  }
  if (cleaned.length < PHONE_LENGTH) {
    return { valid: false, error: 'Numer jest za krótki (wymagane 9 cyfr).' };
  }
  if (cleaned.length > PHONE_LENGTH) {
    return { valid: false, error: 'Numer jest za długi (wymagane 9 cyfr).' };
  }
  if (!/^[0-9]+$/.test(cleaned)) {
    return { valid: false, error: 'Numer zawiera nieprawidłowe znaki.' };
  }

  return { valid: true, error: '' };
};

// API Config - Uncapped Network
const API_CONFIG = {
  uid: '018e090a-7e4f-7ef9-8bd8-f9f87a0ba3e0',
  key: '77662d88e33991144dc3d1',
  offer: '1739',
  lp: '1759',
  apiUrl: 'https://offers.uncappednetwork.com/forms/api/',
  clickPixelUrl: 'https://offers.uncappednetwork.com/forms/api/ck/',
  fingerprintUrl: 'https://offers.uncappednetwork.com/forms/tmfp/'
};

// Prezzo in PLN
const PRICE = 299;
const OLD_PRICE = 598;

const App = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    address: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const newErrors = {
      name: '',
      phone: '',
      address: ''
    };

    if (touched.phone) {
      const phoneValidation = validatePhone(formData.phone);
      if (!phoneValidation.valid) {
        newErrors.phone = phoneValidation.error;
      }
    }

    setErrors(newErrors);

    const allFieldsFilled =
      formData.name.trim().length > 0 &&
      validatePhone(formData.phone).valid &&
      formData.address.trim().length > 0;

    setIsFormValid(allFieldsFilled);
  }, [formData, touched]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const [submitError, setSubmitError] = useState<string | null>(null);
  const hiddenFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      address: true
    });

    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const transactionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const productPrice = PRICE * quantity;

    const form = e.target as HTMLFormElement;
    const tmfpInput = form.querySelector('input[name="tmfp"]') as HTMLInputElement;
    const fingerprint = tmfpInput?.value || '';

    if (hiddenFormRef.current) {
      const hiddenForm = hiddenFormRef.current;

      (hiddenForm.querySelector('input[name="name"]') as HTMLInputElement).value = formData.name;
      (hiddenForm.querySelector('input[name="tel"]') as HTMLInputElement).value = PHONE_PREFIX + formData.phone;
      (hiddenForm.querySelector('input[name="street-address"]') as HTMLInputElement).value = formData.address;
      (hiddenForm.querySelector('input[name="tmfp"]') as HTMLInputElement).value = fingerprint;

      if (!fingerprint) {
        (hiddenForm.querySelector('input[name="ua"]') as HTMLInputElement).value = navigator.userAgent;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const utmParamNames = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'];
      utmParamNames.forEach(param => {
        const value = urlParams.get(param);
        const input = hiddenForm.querySelector(`input[name="${param}"]`) as HTMLInputElement;
        if (input) {
          input.value = value || '';
        }
      });

      hiddenForm.submit();
    }

    setTimeout(() => {
      router.push(`/podziekowanie-un?name=${encodeURIComponent(formData.name)}&landing=wallheater-un-pl&value=${productPrice}&tid=${transactionId}`);
    }, 1000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('zamow');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const productImages = [
    '/images/condizionatore-wall/1.webp',
    '/images/condizionatore-wall/2.webp',
    '/images/condizionatore-wall/3.webp',
    '/images/condizionatore-wall/4.webp',
    '/images/condizionatore-wall/5.webp',
  ];

  // ============================================
  // DESKTOP E-COMMERCE LAYOUT (Polski)
  // ============================================
  const DesktopEcommerce = () => (
    <div className="hidden md:block bg-white min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-900">Prixily</div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1"><LucideTruck className="w-4 h-4" /> Darmowa wysyłka</span>
              <span className="flex items-center gap-1"><LucideShieldCheck className="w-4 h-4" /> Gwarancja 24 miesiące</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-3 text-sm text-gray-500">
        <span>Strona główna</span> <LucideChevronRight className="w-3 h-3 inline mx-1" />
        <span>Klimatyzacja</span> <LucideChevronRight className="w-3 h-3 inline mx-1" />
        <span className="text-gray-900">Klimatyzator Ścienny Pro 2w1</span>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-12">
          {/* Galeria zdjęć */}
          <div>
            <div className="bg-gray-50 rounded-lg p-8 mb-4">
              <img
                src={productImages[selectedImage]}
                alt="Klimatyzator Ścienny Pro 2w1"
                className="w-full h-[400px] object-contain"
              />
            </div>
            <div className="flex gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg border-2 p-2 transition ${selectedImage === idx ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info produktu */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Klimatyzator Ścienny Pro 2w1
            </h1>
            <p className="text-gray-600 mb-4">Ogrzewanie i chłodzenie bez jednostki zewnętrznej</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <LucideStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.8 (127 opinii)</span>
            </div>

            {/* Cena */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-gray-900">{PRICE} zł</span>
                <span className="text-lg text-gray-400 line-through">{OLD_PRICE} zł</span>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">-50%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">VAT wliczony • Darmowa wysyłka</p>
            </div>

            {/* Cechy */}
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Cechy produktu</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideFlame className="w-4 h-4 text-orange-500" />
                  <span>Ogrzewanie do 30°C</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideSnowflake className="w-4 h-4 text-blue-500" />
                  <span>Chłodzenie do 16°C</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideHome className="w-4 h-4 text-gray-500" />
                  <span>Pokrycie do 60m²</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideZap className="w-4 h-4 text-green-500" />
                  <span>Klasa energetyczna A++</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideWind className="w-4 h-4 text-gray-500" />
                  <span>Głośność 26-45 dB</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideThermometer className="w-4 h-4 text-gray-500" />
                  <span>Bez jednostki zewnętrznej</span>
                </div>
              </div>
            </div>

            {/* Ilość */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ilość</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <LucideMinus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <LucidePlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Form zamówienia desktop */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Dane do wysyłki</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="tmfp" value="" />

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Imię i Nazwisko</label>
                  <input
                    type="text"
                    name="your-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Jan Kowalski"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-4 text-sm text-gray-600 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                      {PHONE_PREFIX}
                    </span>
                    <input
                      type="tel"
                      name="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={PHONE_LENGTH}
                      value={formData.phone}
                      onChange={(e) => {
                        const cleaned = cleanPhoneNumber(e.target.value);
                        if (cleaned.length <= PHONE_LENGTH) {
                          handleInputChange('phone', cleaned);
                        }
                      }}
                      onBlur={() => handleBlur('phone')}
                      className={`flex-1 border p-3 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="501234567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Adres dostawy</label>
                  <input
                    type="text"
                    name="street-address"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="ul. Główna 1, 00-001 Warszawa"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Suma ({quantity} szt.)</span>
                    <span className="font-medium">{(PRICE * quantity)} zł</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Wysyłka</span>
                    <span className="font-medium text-green-600">Darmowa</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Razem</span>
                    <span>{(PRICE * quantity)} zł</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 rounded-lg font-medium transition ${
                      isFormValid && !isSubmitting
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Przetwarzanie...' : 'Zamów - Płatność przy odbiorze'}
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-3">
                    Płatność gotówką lub kartą u kuriera
                  </p>
                </div>
              </form>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1"><LucideShieldCheck className="w-4 h-4" /> Gwarancja 24 miesiące</span>
              <span className="flex items-center gap-1"><LucideTruck className="w-4 h-4" /> Dostawa 24-48h</span>
              <span className="flex items-center gap-1"><LucidePackage className="w-4 h-4" /> Darmowy zwrot</span>
            </div>
          </div>
        </div>
      </div>

      {/* Opis produktu */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Opis produktu</h2>
              <div className="prose prose-gray text-gray-600">
                <p className="mb-4">
                  Klimatyzator Ścienny Pro 2w1 to idealne rozwiązanie dla osób szukających komfortu przez cały rok.
                  Dzięki najnowszej technologii inwerterowej, urządzenie ogrzewa zimą
                  i chłodzi latem z efektywnością energetyczną klasy A++.
                </p>
                <p className="mb-4">
                  Wyróżniającą cechą tego klimatyzatora jest brak jednostki zewnętrznej,
                  co czyni go idealnym dla mieszkań w blokach, gdzie montaż jednostek
                  zewnętrznych nie jest dozwolony.
                </p>
                <p>
                  Z pokryciem do 60m² i minimalną głośnością zaledwie 26dB, jest idealny do
                  sypialni, salonów i biur.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Specyfikacja techniczna</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Moc chłodzenia</span>
                  <span className="font-medium text-gray-900">9000 BTU</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Moc grzania</span>
                  <span className="font-medium text-gray-900">12000 BTU</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Pokrycie</span>
                  <span className="font-medium text-gray-900">do 60m²</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Klasa energetyczna</span>
                  <span className="font-medium text-green-600">A++</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Głośność</span>
                  <span className="font-medium text-gray-900">26-45 dB</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Wymiary</span>
                  <span className="font-medium text-gray-900">80x27x18 cm</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Sterowanie</span>
                  <span className="font-medium text-gray-900">Pilot</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Timer</span>
                  <span className="font-medium text-gray-900">24h programowalny</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Opinie desktop */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Opinie klientów</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { name: "Marek K.", city: "Warszawa", rating: 5, text: "Świetny produkt. Dom ciepły w kilka minut, a rachunki niższe." },
            { name: "Anna M.", city: "Kraków", rating: 5, text: "Cichy i wydajny. Używam w sypialni bez problemu." },
            { name: "Piotr W.", city: "Gdańsk", rating: 4, text: "Dobry stosunek jakości do ceny. Pokrywa mój salon 55m²." }
          ].map((review, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-1 text-yellow-400 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <LucideStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-3">"{review.text}"</p>
              <p className="text-sm font-medium text-gray-900">{review.name}</p>
              <p className="text-xs text-gray-500">{review.city}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2024 Prixily. Wszelkie prawa zastrzeżone.</p>
          <p className="mt-2">Bezpieczna płatność przy odbiorze • Darmowa wysyłka w Polsce</p>
        </div>
      </footer>
    </div>
  );

  // ============================================
  // MOBILE LANDING PAGE (Polski)
  // ============================================
  const MobileLanding = () => (
    <div className="md:hidden font-sans text-gray-900 overflow-x-hidden">
      {/* HERO SECTION */}
      <header className="relative bg-white overflow-hidden pb-6">
        <div className="container mx-auto px-3 py-4">
          <div className="grid gap-6 items-center">
            <div className="order-2">
              <span className="inline-block bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded-full mb-3 uppercase tracking-wide">
                Bestseller sezonu zimowego
              </span>
              <h1 className="text-2xl font-bold leading-tight mb-3">
                Ogrzej swój dom w 2 minuty – <span className="text-orange-600">bez jednostki zewnętrznej.</span>
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Klimatyzator ścienny 2 w 1 <strong>bez zewnętrznego agregatu</strong>. Ogrzewa zimą i chłodzi latem pomieszczenia <strong>do 60m²</strong>. Zamów dziś, zapłać kurierowi przy odbiorze.
              </p>

              <ul className="grid grid-cols-1 gap-2 mb-4">
                {[
                  "Płatność przy odbiorze",
                  "BEZ jednostki zewnętrznej",
                  "Ogrzewanie + Chłodzenie",
                  "Do pomieszczeń 60m²",
                  "Klasa A++ - niskie rachunki"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <LucideCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="text-center w-full">
                  <p className="text-gray-400 text-xs line-through">Cena: {OLD_PRICE} zł</p>
                  <p className="text-3xl font-bold text-gray-900">{PRICE} zł</p>
                  <p className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded inline-block">
                    Oszczędzasz {PRICE} zł
                  </p>
                </div>
                <button
                  onClick={scrollToOrder}
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-6 py-3 rounded-lg shadow-xl transform transition hover:-translate-y-1 flex flex-col items-center justify-center"
                >
                  <span>ZAMÓW ZA POBRANIEM</span>
                  <span className="text-[9px] font-normal opacity-90 mt-1 uppercase tracking-wide">Płacisz tylko kurierowi</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-gray-500">
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideShieldCheck className="w-3 h-3 mr-1" /> Gwarancja 24 miesiące</div>
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideTruck className="w-3 h-3 mr-1" /> Wysyłka 24h</div>
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideHome className="w-3 h-3 mr-1" /> Do 60m²</div>
              </div>
            </div>

            <div className="relative order-1">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl overflow-hidden shadow-xl relative max-w-xs mx-auto">
                <img src="/images/condizionatore-wall/1.webp" alt="Klimatyzator Ścienny Pro 2w1 Bez Jednostki Zewnętrznej" className="w-full h-auto object-contain mix-blend-multiply opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-2 right-2 bg-red-600 text-white font-bold px-2 py-1 rounded-full shadow-md text-xs">
                  -50% OFERTA
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg border-l-4 border-orange-500">
                  <p className="font-bold text-gray-900 text-xs">BEZ zewnętrznego agregatu</p>
                  <p className="text-[10px] text-gray-600">Łatwy montaż. Bez zgody wspólnoty.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* DUAL MODE BADGE */}
      <section className="py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-3">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <LucideFlame className="w-5 h-5" />
              <span className="font-bold text-sm">Zima: Szybkie ogrzewanie do 30°C</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideSnowflake className="w-5 h-5" />
              <span className="font-bold text-sm">Lato: Chłodne powietrze do 16°C</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM -> SOLUTION */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-3 max-w-5xl">
          <div className="grid gap-6 items-center">
            <div className="order-2">
              <img src="/images/condizionatore-wall/2.webp" alt="Zimny dom" className="rounded-xl shadow-lg w-full h-48 object-cover" />
            </div>
            <div className="order-1">
              <h2 className="text-xl font-bold mb-3 text-gray-800">Zimny dom i wysokie rachunki?</h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Centralne ogrzewanie nie wystarcza, a kaloryfery zużywają za dużo prądu? Chciałbyś klimatyzator, ale wspólnota nie pozwala na jednostkę zewnętrzną?
              </p>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                  <LucideZap className="text-orange-600 w-5 h-5"/> Rozwiązanie: Natychmiastowe ciepło bez jednostki zewnętrznej
                </h3>
                <p className="text-xs text-gray-700">
                  Klimatyzator Ścienny Pro 2w1 ogrzewa pomieszczenia <strong>do 60m²</strong> w 2 minuty. <strong>Bez zewnętrznego agregatu</strong> = bez zgody wspólnoty!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-3">
            <div className="grid grid-cols-2 gap-2 max-w-4xl mx-auto">
                {[
                    { icon: LucideFlame, label: "Ogrzewanie", sub: "Do 30°C" },
                    { icon: LucideSnowflake, label: "Chłodzenie", sub: "Do 16°C" },
                    { icon: LucideThermometer, label: "Bez jednostki zewn.", sub: "Bez zgody" },
                    { icon: LucideHome, label: "Do 60m²", sub: "Duże pokrycie" }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl shadow-sm text-center">
                        <item.icon className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                        <h3 className="font-bold text-gray-900 text-xs">{item.label}</h3>
                        <p className="text-[10px] text-gray-500">{item.sub}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* INVERTER TECHNOLOGY */}
      <section className="py-10 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-3 max-w-5xl">
          <div className="grid gap-6 items-center">
            <div className="order-2">
              <span className="inline-block bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded-full mb-3 uppercase tracking-wide">
                Technologia Inwerterowa
              </span>
              <h2 className="text-xl font-bold mb-3 text-gray-900">
                Wydajność, która <span className="text-orange-600">obniża rachunki</span>
              </h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Dzięki technologii inwerterowej sprężarka automatycznie dostosowuje prędkość, aby utrzymać żądaną temperaturę <strong>bez marnotrawstwa</strong>. To oznacza:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideBatteryCharging className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Rachunki niższe nawet o 40%</h4>
                    <p className="text-xs text-gray-600">Inwerter zużywa tylko tyle energii, ile potrzeba</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideThermometer className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Stała temperatura</h4>
                    <p className="text-xs text-gray-600">Jednolity komfort 24 godziny na dobę</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideWind className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Ekstremalnie cichy</h4>
                    <p className="text-xs text-gray-600">Tylko 26dB - idealny na noc</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1">
              <div className="bg-white rounded-2xl p-4 shadow-xl border border-orange-100">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center mb-3">
                    <LucideZap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">Porównanie zużycia</h3>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-700">Tradycyjny klimatyzator</span>
                      <span className="text-xs font-bold text-red-600">100% zużycia</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full w-full"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-700">Pro 2w1 Inwerter</span>
                      <span className="text-xs font-bold text-green-600">~60% zużycia</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-cyan-500 h-full rounded-full w-[60%]"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-700">Tryb ECO aktywny</span>
                      <span className="text-xs font-bold text-blue-600">~40% zużycia</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full w-[40%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-800 text-center font-medium">
                    <LucideCheckCircle className="w-4 h-4 inline mr-1" />
                    Oszczędność do 1200 zł/rok na rachunkach!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL MODE DETAILS */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-3 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold mb-3">Dwa tryby, jedno urządzenie</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Nie musisz już kupować klimatyzatora na lato i grzejnika na zimę. Pro 2w1 robi wszystko.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Tryb Grzania - PIERWSZY */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <LucideFlame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Tryb Ogrzewania</h3>
                  <p className="text-sm text-orange-600">Idealny na zimę</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  Grzeje do 30°C
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  Szybkie ogrzewanie w 2 min
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  Nie wysusza powietrza
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  Programowalny termostat
                </li>
              </ul>
            </div>

            {/* Tryb Chłodzenia */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <LucideSnowflake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Tryb Chłodzenia</h3>
                  <p className="text-sm text-blue-600">Idealny na lato</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  Chłodzi do 16°C
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  Wbudowane osuszanie
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  Regulowany przepływ powietrza
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  Tryb nocny Sleep
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMFORT FEATURES */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-3">
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-3">Komfort użytkowania</h2>
                <div className="flex flex-wrap justify-center gap-1">
                    <span className="px-2 py-1 bg-white border rounded-full text-xs text-gray-600">Sypialnia</span>
                    <span className="px-2 py-1 bg-white border rounded-full text-xs text-gray-600">Biuro</span>
                    <span className="px-2 py-1 bg-white border rounded-full text-xs text-gray-600">Salon</span>
                    <span className="px-2 py-1 bg-white border rounded-full text-xs text-gray-600">do 60m²</span>
                </div>
            </div>

            <div className="grid gap-4 max-w-5xl mx-auto">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="overflow-hidden rounded-lg mb-3 bg-gray-50">
                         <img src="/images/condizionatore-wall/3.webp" alt="Pilot" className="w-full h-auto object-contain" />
                    </div>
                    <h3 className="text-base font-bold mb-2">Pełna kontrola z kanapy</h3>
                    <p className="text-xs text-gray-600">Pilotem zmienisz tryb, temperaturę i prędkość wentylatora. Intuicyjny wyświetlacz LED na urządzeniu.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="overflow-hidden rounded-lg mb-3 bg-gray-50">
                        <img src="/images/condizionatore-wall/4.webp" alt="Montaż ścienny" className="w-full h-auto object-contain" />
                    </div>
                    <h3 className="text-base font-bold mb-2">Prosty montaż</h3>
                    <p className="text-xs text-gray-600">Smukła konstrukcja ścienna, nie zajmuje miejsca na podłodze. Zestaw montażowy w zestawie.</p>
                </div>
            </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-3 max-w-4xl text-center">
            <h2 className="text-xl font-bold mb-6">Bezpieczeństwo jest priorytetem</h2>
            <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <LucideShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold mb-1 text-sm">Auto-wyłączenie</h3>
                    <p className="text-xs text-gray-600">Wyłącza się w przypadku przegrzania</p>
                </div>
                <div className="p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <LucideThermometer className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold mb-1 text-sm">Ochrona przed zamarzaniem</h3>
                    <p className="text-xs text-gray-600">Włącza się automatycznie poniżej 5°C</p>
                </div>
                <div className="p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <LucideLock className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold mb-1 text-sm">Blokada rodzicielska</h3>
                    <p className="text-xs text-gray-600">Panel można zablokować</p>
                </div>
            </div>
            <p className="text-gray-500 italic text-xs bg-gray-50 inline-block px-3 py-2 rounded-full">Certyfikat CE - Bezpieczny dla całej rodziny</p>
        </div>
      </section>

      {/* DESIGN */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto px-3 max-w-5xl">
            <div className="grid gap-6 items-center">
                <div>
                    <span className="text-blue-400 font-bold tracking-wider uppercase text-[10px] mb-2 block">Nowoczesny design</span>
                    <h2 className="text-xl font-bold mb-3">Elegancki i dyskretny. <br />Pasuje do każdego wnętrza.</h2>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        Czyste linie i minimalistyczny design. Nie tylko klimatyzuje, ale też dekoruje Twój pokój.
                    </p>
                    <p className="bg-gray-800 inline-block px-3 py-2 rounded text-xs border-l-2 border-blue-500">
                        <span className="font-bold text-blue-400">Wymiary:</span> Tylko 80x27x18 cm - super kompaktowy
                    </p>
                </div>
                <div>
                    <img src="/images/condizionatore-wall/5.webp" alt="Elegancki design" className="rounded-xl shadow-2xl border border-gray-700 w-full" />
                </div>
            </div>
        </div>
      </section>

      {/* SPECS & COMPARISON */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-3 max-w-4xl">
            <div className="grid gap-6 mb-10 items-center">
                 <div className="order-2">
                    <img src="/images/condizionatore-wall/6.webp" alt="Widok z boku" className="rounded-lg shadow w-full h-48 object-cover" />
                </div>
                <div className="space-y-2 text-xs order-1">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Specyfikacja techniczna</h3>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Moc chłodzenia:</span>
                        <span className="font-semibold text-gray-900">9000 BTU</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Moc grzania:</span>
                        <span className="font-semibold text-gray-900">12000 BTU</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Pokrycie:</span>
                        <span className="font-semibold text-orange-600">do 60m²</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Klasa energetyczna:</span>
                        <span className="font-semibold text-green-600">A++</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Głośność:</span>
                        <span className="font-semibold text-gray-900">26-45 dB</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Sterowanie:</span>
                        <span className="font-semibold text-gray-900">Pilot + Wyświetlacz</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Timer:</span>
                        <span className="font-semibold text-gray-900">Programowalny 24h</span>
                    </div>

                    <div className="bg-blue-50 p-3 rounded mt-4 border border-blue-100">
                        <p className="font-bold mb-2 text-blue-900 text-sm">W zestawie:</p>
                        <ul className="list-disc pl-4 text-gray-700 space-y-1 text-xs">
                            <li>Klimatyzator ścienny</li>
                            <li>Pilot z bateriami</li>
                            <li>Zestaw montażowy</li>
                            <li>Instrukcja po polsku</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-bold mb-4 text-center">Dlaczego wybrać Pro 2w1?</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg -mx-3">
                <table className="w-full bg-white text-xs min-w-[500px]">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-2 text-left font-medium">Cecha</th>
                            <th className="py-3 px-2 text-center bg-blue-600 font-bold">Pro 2w1</th>
                            <th className="py-3 px-2 text-center text-gray-400">Zwykły klim.</th>
                            <th className="py-3 px-2 text-center text-gray-400">Grzejnik</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr>
                            <td className="py-3 px-2 font-semibold text-gray-700">Chłodzenie</td>
                            <td className="py-3 px-2 text-center bg-blue-50 font-bold text-blue-700">✓ Tak</td>
                            <td className="py-3 px-2 text-center text-gray-600">✓ Tak</td>
                            <td className="py-3 px-2 text-center text-red-500">✗ Nie</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2 font-semibold text-gray-700">Grzanie</td>
                            <td className="py-3 px-2 text-center bg-blue-50 font-bold text-blue-700">✓ Tak</td>
                            <td className="py-3 px-2 text-center text-red-500">✗ Nie</td>
                            <td className="py-3 px-2 text-center text-gray-600">✓ Tak</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2 font-semibold text-gray-700">Wydajność</td>
                            <td className="py-3 px-2 text-center bg-blue-50 font-bold text-blue-700">A++</td>
                            <td className="py-3 px-2 text-center text-gray-600">A</td>
                            <td className="py-3 px-2 text-center text-gray-500">Niska</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2 font-semibold text-gray-700">Pokrycie</td>
                            <td className="py-3 px-2 text-center bg-orange-50 font-bold text-orange-700">60m²</td>
                            <td className="py-3 px-2 text-center text-gray-600">25m²</td>
                            <td className="py-3 px-2 text-center text-gray-500">15m²</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-3 max-w-6xl">
            <h2 className="text-xl font-bold mb-6 text-center">Co mówią klienci?</h2>
            <div className="grid gap-3">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★★</div>
                    <p className="text-gray-700 mb-3 italic text-xs">&quot;W tę mroźną zimę to było zbawienie! Dom ciepły w 2 minuty. I bez jednostki zewnętrznej = zero problemów ze wspólnotą!&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Marek K., Warszawa</div>
                    <span className="text-[10px] text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Zweryfikowany</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★★</div>
                    <p className="text-gray-700 mb-3 italic text-xs">&quot;Super cichy! Używam w sypialni do ogrzewania w nocy. Tryb Sleep jest fantastyczny.&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Anna M., Kraków</div>
                    <span className="text-[10px] text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Zweryfikowany</span>
                </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★☆</div>
                    <p className="text-gray-700 mb-3 italic text-xs">&quot;Pokrywa mój salon 55m² bez problemu. Bez zewnętrznego agregatu, idealny do mojego mieszkania!&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Piotr W., Gdańsk</div>
                    <span className="text-[10px] text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Zweryfikowany</span>
                </div>
            </div>
        </div>
      </section>

      {/* CHECKOUT */}
      <section id="zamow" className="py-10 bg-blue-50/50">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">

            <div className="bg-gray-900 text-white p-3 text-center">
                <h3 className="font-bold text-sm">WYPEŁNIJ FORMULARZ, ABY ZAMÓWIĆ</h3>
                <p className="text-[10px] text-gray-400">Bezpieczna płatność przy odbiorze paczki</p>
            </div>

            <div className="grid">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <div className="flex gap-3 mb-4">
                        <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm flex-shrink-0">
                            <img src="/images/condizionatore-wall/7.webp" alt="Produkt" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Klimatyzator Ścienny Pro 2w1</h4>
                            <p className="text-xs text-gray-500">Grzanie + Chłodzenie • do 60m² • Bez jedn. zewn.</p>
                            <div className="text-[10px] text-green-600 font-semibold mt-1 flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                Dostępny
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-xs mb-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Cena promocyjna</span>
                            <span className="font-bold">{PRICE} zł</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span>Wysyłka (Pobranie)</span>
                            <span className="font-bold">0 zł</span>
                        </div>
                    </div>

                    <div className="border-t pt-3 flex justify-between items-center">
                        <span className="font-bold text-sm">Razem:</span>
                        <span className="text-2xl font-bold text-blue-600">{PRICE} zł</span>
                    </div>

                    <div className="mt-4 bg-yellow-50 border border-yellow-100 p-2 rounded text-[10px] text-yellow-800 flex gap-2">
                        <LucideShieldCheck className="w-4 h-4 flex-shrink-0" />
                        Płacisz kurierowi gotówką lub kartą. Bez ryzyka.
                    </div>
                </div>

                <div className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input type="hidden" name="tmfp" value="" />

                        <div>
                            <label className="text-[10px] font-bold text-gray-700 uppercase">Imię i Nazwisko</label>
                            <input
                              type="text"
                              name="your-name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="w-full border border-gray-300 p-2.5 rounded text-sm focus:outline-none focus:border-blue-500 transition"
                              placeholder="np. Jan Kowalski"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-700 uppercase">Telefon (najlepiej komórkowy)</label>
                            <div className="relative flex">
                              <span className="inline-flex items-center px-3 text-sm text-gray-700 bg-gray-100 border border-r-0 border-gray-300 rounded-l font-medium">
                                {PHONE_PREFIX}
                              </span>
                              <input
                                type="tel"
                                name="tel"
                                autoComplete="tel"
                                inputMode="numeric"
                                maxLength={PHONE_LENGTH}
                                value={formData.phone}
                                onChange={(e) => {
                                  const cleaned = cleanPhoneNumber(e.target.value);
                                  if (cleaned.length <= PHONE_LENGTH) {
                                    handleInputChange('phone', cleaned);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if ([8, 9, 27, 13, 46].includes(e.keyCode) ||
                                      (e.keyCode >= 35 && e.keyCode <= 40) ||
                                      ((e.ctrlKey || e.metaKey) && [65, 67, 86, 88].includes(e.keyCode))) {
                                    return;
                                  }
                                  if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                onBlur={() => handleBlur('phone')}
                                className={`flex-1 border p-2.5 rounded-r text-sm focus:outline-none transition ${
                                  errors.phone ? 'border-red-500 bg-red-50' : touched.phone && !errors.phone && formData.phone ? 'border-green-500 bg-green-50' : 'border-gray-300 focus:border-blue-500'
                                }`}
                                placeholder="501234567"
                              />
                              {touched.phone && !errors.phone && formData.phone && (
                                <LucideCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                              )}
                              <span className={`absolute right-8 top-1/2 -translate-y-1/2 text-[10px] ${formData.phone.length === PHONE_LENGTH ? 'text-green-500' : 'text-gray-400'}`}>
                                {formData.phone.length}/{PHONE_LENGTH}
                              </span>
                            </div>
                            {errors.phone && (
                              <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                                <LucideAlertCircle className="w-3 h-3" /> {errors.phone}
                              </p>
                            )}
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-700 uppercase">Adres dostawy</label>
                            <input
                              type="text"
                              name="street-address"
                              autoComplete="street-address"
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              className="w-full border border-gray-300 p-2.5 rounded text-sm focus:outline-none focus:border-blue-500 transition"
                              placeholder="np. ul. Główna 1, 00-001 Warszawa"
                            />
                        </div>

                        <div className="mt-3 p-2.5 bg-green-50 border border-green-200 rounded flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full border-4 border-green-600 bg-white"></div>
                                <span className="font-bold text-xs text-gray-800">Płatność przy odbiorze</span>
                            </div>
                            <LucideCheckCircle className="w-4 h-4 text-green-600" />
                        </div>

                        <button
                          type="submit"
                          disabled={!isFormValid || isSubmitting}
                          className={`w-full font-bold text-sm p-3 rounded shadow-lg mt-3 transition flex items-center justify-center gap-2 ${
                            isFormValid && !isSubmitting
                              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transform hover:scale-[1.02]'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Przetwarzanie...
                            </>
                          ) : (
                            <>
                              {isFormValid ? 'ZAMÓW I ZAPŁAĆ PRZY ODBIORZE!' : 'Wypełnij wszystkie pola poprawnie'}
                              {isFormValid && <LucideTruck className="w-4 h-4" />}
                            </>
                          )}
                        </button>

                        {!isFormValid && Object.values(touched).some(t => t) && (
                          <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-2">
                            <p className="text-[10px] text-blue-800 font-medium flex items-center gap-1">
                              <LucideAlertCircle className="w-3 h-3" />
                              Wypełnij wszystkie wymagane pola, aby odblokować przycisk zamówienia.
                            </p>
                          </div>
                        )}

                        {submitError && (
                          <div className="bg-red-50 border border-red-200 rounded p-2 mt-2">
                            <p className="text-[10px] text-red-800 font-medium flex items-center gap-1">
                              <LucideAlertCircle className="w-3 h-3" />
                              {submitError}
                            </p>
                          </div>
                        )}

                        <p className="text-[9px] text-center text-gray-400 mt-2">
                            Klikając przycisk potwierdzasz zamówienie z obowiązkiem płatności przy odbiorze.
                        </p>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 bg-white mb-20">
        <div className="container mx-auto px-3 max-w-2xl">
          <h2 className="text-lg font-bold mb-4 text-center">Często zadawane pytania</h2>
          <div className="space-y-2">
            {[
              { q: "Czy mogę zapłacić kartą u kuriera?", a: "Tak, większość kurierów ma terminal płatniczy. Możesz też zapłacić gotówką." },
              { q: "Ile kosztuje wysyłka?", a: "W aktualnej ofercie wysyłka za pobraniem jest całkowicie darmowa." },
              { q: "Do ilu metrów kwadratowych jest odpowiedni?", a: "Klimatyzator pokrywa pomieszczenia do 60m². Dzięki mocy 9000/12000 BTU ogrzewa lub chłodzi je bardzo szybko." },
              { q: "Czy potrzebuję technika do montażu?", a: "Zestaw montażowy jest w zestawie, a montaż jest prosty. Jeśli wolisz, możesz też wezwać technika." },
              { q: "Kiedy otrzymam paczkę?", a: "Zamówienia złożone do 14:00 są wysyłane tego samego dnia. Paczka dociera w 24-48h." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-3 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition text-xs"
                >
                  {faq.q}
                  <LucideChevronDown className={`w-4 h-4 flex-shrink-0 ml-2 transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="p-3 text-xs text-gray-600 bg-white border-t border-gray-100">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] safe-area-pb">
        <div className="flex justify-center items-center gap-3 mb-1.5 text-[9px] text-gray-500 uppercase font-semibold tracking-wider">
            <span className="flex items-center text-green-600"><LucideCheckCircle className="w-3 h-3 mr-1" /> Przy odbiorze</span>
            <span className="flex items-center text-orange-600"><LucideFlame className="w-3 h-3 mr-1" /> Grzanie</span>
            <span className="flex items-center"><LucideSnowflake className="w-3 h-3 mr-1" /> Chłodzenie</span>
        </div>

        <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 line-through">{OLD_PRICE} zł</span>
                <span className="text-xl font-bold text-gray-900 leading-none">{PRICE} zł</span>
            </div>
            <button
                onClick={scrollToOrder}
                className="flex-1 bg-blue-600 text-white py-2.5 px-3 rounded font-bold hover:bg-blue-700 transition shadow-lg text-xs flex items-center justify-center"
            >
                ZAMÓW <LucideTruck className="w-3 h-3 ml-1" />
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      <GoogleAdsScript conversionId="AW-17763272302" />

      {/* Click Pixel - Uncapped Network */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${API_CONFIG.clickPixelUrl}?o=${API_CONFIG.offer}&uid=${API_CONFIG.uid}&lp=${API_CONFIG.lp}`}
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Desktop E-commerce Layout */}
      <DesktopEcommerce />

      {/* Mobile Landing Page Layout */}
      <MobileLanding />

      {/* Fingerprint Script - Uncapped Network */}
      <Script
        src={API_CONFIG.fingerprintUrl}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }} title="hidden"></iframe>

      {/* Hidden Form - Uncapped Network API */}
      <form
        ref={hiddenFormRef}
        action={API_CONFIG.apiUrl}
        method="POST"
        target="hidden_iframe"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="uid" value={API_CONFIG.uid} />
        <input type="hidden" name="key" value={API_CONFIG.key} />
        <input type="hidden" name="offer" value={API_CONFIG.offer} />
        <input type="hidden" name="lp" value={API_CONFIG.lp} />
        <input type="hidden" name="name" value="" />
        <input type="hidden" name="tel" value="" />
        <input type="hidden" name="street-address" value="" />
        <input type="hidden" name="tmfp" value="" />
        <input type="hidden" name="ua" value="" />
        <input type="hidden" name="utm_source" value="" />
        <input type="hidden" name="utm_medium" value="" />
        <input type="hidden" name="utm_campaign" value="" />
        <input type="hidden" name="utm_term" value="" />
        <input type="hidden" name="utm_content" value="" />
        <input type="hidden" name="subid" value="" />
        <input type="hidden" name="subid2" value="" />
        <input type="hidden" name="subid3" value="" />
        <input type="hidden" name="subid4" value="" />
        <input type="hidden" name="pubid" value="" />
      </form>
    </div>
  );
};

export default App;
