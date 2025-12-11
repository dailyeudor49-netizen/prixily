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
  LucideSun,
  LucideStar,
  LucideChevronRight,
  LucideMinus,
  LucidePlus
} from 'lucide-react';

// Prefisso Italia
const PHONE_PREFIX = '+39';

// Rimuove il prefisso se presente (per autocompilazione)
const cleanPhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Rimuovi +39 o 39 all'inizio
  if (cleaned.startsWith('+39')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('39') && cleaned.length > 10) {
    cleaned = cleaned.slice(2);
  }
  // Rimuovi eventuali + rimasti
  cleaned = cleaned.replace(/\+/g, '');
  // Solo cifre
  return cleaned.replace(/[^0-9]/g, '');
};

// Validazione numero - 10 cifre per Italia
const validatePhone = (phone: string): { valid: boolean; error: string } => {
  const cleaned = cleanPhoneNumber(phone);

  if (cleaned.length === 0) {
    return { valid: false, error: '' };
  }
  if (cleaned.length < 10) {
    return { valid: false, error: 'Il numero è troppo corto (richieste 10 cifre).' };
  }
  if (cleaned.length > 10) {
    return { valid: false, error: 'Il numero è troppo lungo (richieste 10 cifre).' };
  }
  if (!/^[0-9]+$/.test(cleaned)) {
    return { valid: false, error: 'Il numero contiene caratteri non validi.' };
  }

  return { valid: true, error: '' };
};

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
    const productPrice = 199.99 * quantity;

    const form = e.target as HTMLFormElement;
    const tmfpInput = form.querySelector('input[name="tmfp"]') as HTMLInputElement;
    const fingerprint = tmfpInput?.value || '';

    if (hiddenFormRef.current) {
      const hiddenForm = hiddenFormRef.current;

      (hiddenForm.querySelector('input[name="name"]') as HTMLInputElement).value = formData.name;
      // Invia numero completo con prefisso
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
      router.push(`/grazie?name=${encodeURIComponent(formData.name)}&landing=wallheater-it&value=${productPrice}&tid=${transactionId}`);
    }, 1000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('ordina');
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
  // DESKTOP E-COMMERCE LAYOUT
  // ============================================
  const DesktopEcommerce = () => (
    <div className="hidden md:block bg-white min-h-screen">
      {/* Header semplice */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-900">Prixily</div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1"><LucideTruck className="w-4 h-4" /> Spedizione gratuita</span>
              <span className="flex items-center gap-1"><LucideShieldCheck className="w-4 h-4" /> Garanzia 24 mesi</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-3 text-sm text-gray-500">
        <span>Home</span> <LucideChevronRight className="w-3 h-3 inline mx-1" />
        <span>Climatizzazione</span> <LucideChevronRight className="w-3 h-3 inline mx-1" />
        <span className="text-gray-900">Climatizzatore a Parete Pro 2in1</span>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-12">
          {/* Galleria immagini */}
          <div>
            <div className="bg-gray-50 rounded-lg p-8 mb-4">
              <img
                src={productImages[selectedImage]}
                alt="Climatizzatore a Parete Pro 2in1"
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

          {/* Info prodotto */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Climatizzatore a Parete Pro 2in1
            </h1>
            <p className="text-gray-600 mb-4">Riscaldamento e raffrescamento senza unità esterna</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <LucideStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.8 (127 recensioni)</span>
            </div>

            {/* Prezzo */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-gray-900">€199,99</span>
                <span className="text-lg text-gray-400 line-through">€399,98</span>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">-50%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">IVA inclusa • Spedizione gratuita</p>
            </div>

            {/* Caratteristiche principali */}
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Caratteristiche</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideFlame className="w-4 h-4 text-orange-500" />
                  <span>Riscaldamento fino a 30°C</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideSnowflake className="w-4 h-4 text-blue-500" />
                  <span>Raffrescamento fino a 16°C</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideHome className="w-4 h-4 text-gray-500" />
                  <span>Copertura fino a 60m²</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideZap className="w-4 h-4 text-green-500" />
                  <span>Classe energetica A++</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideWind className="w-4 h-4 text-gray-500" />
                  <span>Rumorosità 26-45 dB</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LucideThermometer className="w-4 h-4 text-gray-500" />
                  <span>Senza unità esterna</span>
                </div>
              </div>
            </div>

            {/* Quantità */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantità</label>
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

            {/* Form ordine desktop */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Dati per la spedizione</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="uid" value="01980829-601f-7dba-9f7a-150da3869743" />
                <input type="hidden" name="offer" value="999" />
                <input type="hidden" name="lp" value="999" />
                <input type="hidden" name="tmfp" value="" />

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Nome e Cognome</label>
                  <input
                    type="text"
                    name="your-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Telefono</label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-4 text-sm text-gray-600 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                      {PHONE_PREFIX}
                    </span>
                    <input
                      type="tel"
                      name="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => {
                        const cleaned = cleanPhoneNumber(e.target.value);
                        if (cleaned.length <= 10) {
                          handleInputChange('phone', cleaned);
                        }
                      }}
                      onBlur={() => handleBlur('phone')}
                      className={`flex-1 border p-3 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="3401234567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Indirizzo di spedizione</label>
                  <input
                    type="text"
                    name="street-address"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Via Roma 1, 00100 Roma"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotale ({quantity} pz)</span>
                    <span className="font-medium">€{(199.99 * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Spedizione</span>
                    <span className="font-medium text-green-600">Gratuita</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Totale</span>
                    <span>€{(199.99 * quantity).toFixed(2)}</span>
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
                    {isSubmitting ? 'Elaborazione...' : 'Ordina - Pagamento alla consegna'}
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-3">
                    Pagamento in contanti o carta al corriere
                  </p>
                </div>
              </form>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1"><LucideShieldCheck className="w-4 h-4" /> Garanzia 24 mesi</span>
              <span className="flex items-center gap-1"><LucideTruck className="w-4 h-4" /> Consegna 24-48h</span>
              <span className="flex items-center gap-1"><LucidePackage className="w-4 h-4" /> Reso gratuito</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs descrizione */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-12">
            {/* Descrizione */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrizione prodotto</h2>
              <div className="prose prose-gray text-gray-600">
                <p className="mb-4">
                  Il Climatizzatore a Parete Pro 2in1 è la soluzione ideale per chi cerca comfort tutto l'anno.
                  Grazie alla tecnologia inverter di ultima generazione, questo dispositivo riscalda d'inverno
                  e rinfresca d'estate con un'efficienza energetica in classe A++.
                </p>
                <p className="mb-4">
                  La caratteristica distintiva di questo climatizzatore è l'assenza di unità esterna,
                  che lo rende perfetto per appartamenti in condominio dove l'installazione di motori
                  esterni non è consentita.
                </p>
                <p>
                  Con una copertura fino a 60m² e una rumorosità minima di soli 26dB, è ideale per
                  camere da letto, soggiorni e uffici.
                </p>
              </div>
            </div>

            {/* Specifiche */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifiche tecniche</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Potenza raffreddamento</span>
                  <span className="font-medium text-gray-900">9000 BTU</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Potenza riscaldamento</span>
                  <span className="font-medium text-gray-900">12000 BTU</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Copertura</span>
                  <span className="font-medium text-gray-900">fino a 60m²</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Classe energetica</span>
                  <span className="font-medium text-green-600">A++</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Rumorosità</span>
                  <span className="font-medium text-gray-900">26-45 dB</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Dimensioni</span>
                  <span className="font-medium text-gray-900">80x27x18 cm</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-500">Controllo</span>
                  <span className="font-medium text-gray-900">Telecomando</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Timer</span>
                  <span className="font-medium text-gray-900">24h programmabile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recensioni desktop */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recensioni clienti</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { name: "Marco R.", city: "Milano", rating: 5, text: "Ottimo prodotto. Casa calda in pochi minuti e bollette contenute." },
            { name: "Giulia M.", city: "Roma", rating: 5, text: "Silenzioso e potente. Lo uso in camera da letto senza problemi." },
            { name: "Antonio P.", city: "Napoli", rating: 4, text: "Buon rapporto qualità/prezzo. Copre il mio soggiorno di 55m²." }
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

      {/* Footer semplice */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2024 Prixily. Tutti i diritti riservati.</p>
          <p className="mt-2">Pagamento sicuro alla consegna • Spedizione gratuita in Italia</p>
        </div>
      </footer>
    </div>
  );

  // ============================================
  // MOBILE LANDING PAGE (originale)
  // ============================================
  const MobileLanding = () => (
    <div className="md:hidden font-sans text-gray-900 overflow-x-hidden">
      {/* HERO SECTION */}
      <header className="relative bg-white overflow-hidden pb-6">
        <div className="container mx-auto px-3 py-4">
          <div className="grid gap-6 items-center">
            <div className="order-2">
              <span className="inline-block bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded-full mb-3 uppercase tracking-wide">
                Bestseller stagione invernale
              </span>
              <h1 className="text-2xl font-bold leading-tight mb-3">
                Riscalda casa tua in 2 minuti – <span className="text-orange-600">senza unità esterna.</span>
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Climatizzatore a parete 2 in 1 <strong>senza motore esterno</strong>. Riscalda d'inverno e rinfresca d'estate ambienti <strong>fino a 60m²</strong>. Ordina oggi, paghi al corriere alla consegna.
              </p>

              <ul className="grid grid-cols-1 gap-2 mb-4">
                {[
                  "Pagamento alla consegna",
                  "SENZA unità esterna",
                  "Riscaldamento + Raffrescamento",
                  "Per ambienti fino a 60m²",
                  "Classe A++ - bollette basse"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <LucideCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="text-center w-full">
                  <p className="text-gray-400 text-xs line-through">Prezzo: 399,98 €</p>
                  <p className="text-3xl font-bold text-gray-900">199,99 €</p>
                  <p className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded inline-block">
                    Risparmi 199,99 €
                  </p>
                </div>
                <button
                  onClick={scrollToOrder}
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-6 py-3 rounded-lg shadow-xl transform transition hover:-translate-y-1 flex flex-col items-center justify-center"
                >
                  <span>ORDINA IN CONTRASSEGNO</span>
                  <span className="text-[9px] font-normal opacity-90 mt-1 uppercase tracking-wide">Paghi solo al corriere</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-gray-500">
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideShieldCheck className="w-3 h-3 mr-1" /> Garanzia 24 mesi</div>
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideTruck className="w-3 h-3 mr-1" /> Spedizione 24h</div>
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideHome className="w-3 h-3 mr-1" /> Fino a 60m²</div>
              </div>
            </div>

            <div className="relative order-1">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl overflow-hidden shadow-xl relative max-w-xs mx-auto">
                <img src="/images/condizionatore-wall/1.webp" alt="Climatizzatore a Parete Pro 2in1 Senza Unità Esterna" className="w-full h-auto object-contain mix-blend-multiply opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-2 right-2 bg-red-600 text-white font-bold px-2 py-1 rounded-full shadow-md text-xs">
                  -50% OFFERTA
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg border-l-4 border-orange-500">
                  <p className="font-bold text-gray-900 text-xs">SENZA motore esterno</p>
                  <p className="text-[10px] text-gray-600">Installazione facile. Nessun permesso condominiale.</p>
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
              <span className="font-bold text-sm">Inverno: Riscaldamento rapido fino a 30°C</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideSnowflake className="w-5 h-5" />
              <span className="font-bold text-sm">Estate: Aria fresca fino a 16°C</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM -> SOLUTION */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-3 max-w-5xl">
          <div className="grid gap-6 items-center">
            <div className="order-2">
              <img src="/images/condizionatore-wall/2.webp" alt="Casa fredda d'inverno" className="rounded-xl shadow-lg w-full aspect-square object-cover" />
            </div>
            <div className="order-1">
              <h2 className="text-xl font-bold mb-3 text-gray-800">Casa fredda e bollette alle stelle?</h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Il riscaldamento centralizzato non basta e i termosifoni consumano troppo? Vorresti un condizionatore ma il condominio non permette l'unità esterna?
              </p>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                  <LucideZap className="text-orange-600 w-5 h-5"/> Soluzione: Caldo immediato senza unità esterna
                </h3>
                <p className="text-xs text-gray-700">
                  Il Climatizzatore a Parete Pro 2in1 riscalda ambienti <strong>fino a 60m²</strong> in 2 minuti. <strong>Nessun motore esterno</strong> = nessun permesso condominiale richiesto!
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
                    { icon: LucideFlame, label: "Riscaldamento", sub: "Fino a 30°C" },
                    { icon: LucideSnowflake, label: "Raffrescamento", sub: "Fino a 16°C" },
                    { icon: LucideThermometer, label: "Senza unità esterna", sub: "Zero permessi" },
                    { icon: LucideHome, label: "Fino a 60m²", sub: "Ampia copertura" }
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
                Tecnologia Inverter
              </span>
              <h2 className="text-xl font-bold mb-3 text-gray-900">
                Efficienza che <span className="text-orange-600">taglia le bollette</span>
              </h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Grazie alla tecnologia inverter, il compressore regola automaticamente la velocità per mantenere la temperatura desiderata <strong>senza sprechi</strong>. Questo significa:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideBatteryCharging className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Bollette ridotte fino al 40%</h4>
                    <p className="text-xs text-gray-600">L'inverter consuma solo l'energia necessaria</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideThermometer className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Temperatura sempre costante</h4>
                    <p className="text-xs text-gray-600">Comfort uniforme 24 ore su 24</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideWind className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Silenziosità estrema</h4>
                    <p className="text-xs text-gray-600">Solo 26dB - perfetto per la notte</p>
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
                  <h3 className="font-bold text-lg text-gray-900">Confronto consumi</h3>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-700">Climatizzatore tradizionale</span>
                      <span className="text-xs font-bold text-red-600">100% consumo</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full w-full"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-700">Pro 2in1 Inverter</span>
                      <span className="text-xs font-bold text-green-600">~60% consumo</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-cyan-500 h-full rounded-full w-[60%]"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-700">Modalità ECO attiva</span>
                      <span className="text-xs font-bold text-blue-600">~40% consumo</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full w-[40%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-800 text-center font-medium">
                    <LucideCheckCircle className="w-4 h-4 inline mr-1" />
                    Risparmio fino a 300€/anno sulla bolletta!
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
            <h2 className="text-xl font-bold mb-3">Due modalità, un solo dispositivo</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Non dovrai più comprare un condizionatore per l'estate e un termoconvettore per l'inverno. Il Pro 2in1 fa tutto.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Modalità Caldo - PRIMA */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <LucideFlame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Modalità Riscaldamento</h3>
                  <p className="text-sm text-orange-600">Perfetta per l'inverno</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  Riscalda fino a 30°C
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  Riscaldamento rapido in 2 min
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  Non brucia ossigeno
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  Termostato programmabile
                </li>
              </ul>
            </div>

            {/* Modalità Freddo */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <LucideSnowflake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Modalità Raffrescamento</h3>
                  <p className="text-sm text-blue-600">Perfetta per l'estate</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  Raffredda fino a 16°C
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  Deumidificazione integrata
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  Flusso d'aria orientabile
                </li>
                <li className="flex items-center gap-2">
                  <LucideCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  Modalità Sleep notturna
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
                <h2 className="text-xl font-bold mb-3">Comfort di utilizzo</h2>
                <div className="flex flex-wrap justify-center gap-1">
                    <span className="px-2 py-1 bg-white border rounded-full text-xs text-gray-600">Camera da letto</span>
                    <span className="px-2 py-1 bg-white border rounded-full text-xs text-gray-600">Ufficio</span>
                    <span className="px-2 py-1 bg-white border rounded-full text-xs text-gray-600">Soggiorno</span>
                    <span className="px-2 py-1 bg-white border rounded-full text-xs text-gray-600">fino a 60m²</span>
                </div>
            </div>

            <div className="grid gap-4 max-w-5xl mx-auto">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="overflow-hidden rounded-lg mb-3 bg-gray-50">
                         <img src="/images/condizionatore-wall/3.webp" alt="Telecomando" className="w-full h-auto object-contain" />
                    </div>
                    <h3 className="text-base font-bold mb-2">Controllo totale dal divano</h3>
                    <p className="text-xs text-gray-600">Con il telecomando cambi modalità, temperatura e velocità ventola. Display LED intuitivo sul dispositivo.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="overflow-hidden rounded-lg mb-3 bg-gray-50">
                        <img src="/images/condizionatore-wall/4.webp" alt="Installazione a parete" className="w-full h-auto object-contain" />
                    </div>
                    <h3 className="text-base font-bold mb-2">Installazione semplice</h3>
                    <p className="text-xs text-gray-600">Design sottile a parete, non occupa spazio a terra. Kit di montaggio incluso nella confezione.</p>
                </div>
            </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-3 max-w-4xl text-center">
            <h2 className="text-xl font-bold mb-6">La sicurezza è prioritaria</h2>
            <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <LucideShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold mb-1 text-sm">Auto-spegnimento</h3>
                    <p className="text-xs text-gray-600">Si spegne in caso di surriscaldamento</p>
                </div>
                <div className="p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <LucideThermometer className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold mb-1 text-sm">Protezione antigelo</h3>
                    <p className="text-xs text-gray-600">Si attiva automaticamente sotto i 5°C</p>
                </div>
                <div className="p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <LucideLock className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold mb-1 text-sm">Blocco bambini</h3>
                    <p className="text-xs text-gray-600">Pannello bloccabile</p>
                </div>
            </div>
            <p className="text-gray-500 italic text-xs bg-gray-50 inline-block px-3 py-2 rounded-full">Certificato CE - Sicuro per tutta la famiglia</p>
        </div>
      </section>

      {/* DESIGN */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto px-3 max-w-5xl">
            <div className="grid gap-6 items-center">
                <div>
                    <span className="text-blue-400 font-bold tracking-wider uppercase text-[10px] mb-2 block">Design moderno</span>
                    <h2 className="text-xl font-bold mb-3">Elegante e discreto. <br />Si integra con ogni arredamento.</h2>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        Linee pulite e design minimalista. Non solo climatizza, ma arreda la tua stanza con stile.
                    </p>
                    <p className="bg-gray-800 inline-block px-3 py-2 rounded text-xs border-l-2 border-blue-500">
                        <span className="font-bold text-blue-400">Dimensioni:</span> Solo 80x27x18 cm - super compatto
                    </p>
                </div>
                <div>
                    <img src="/images/condizionatore-wall/5.webp" alt="Design elegante" className="rounded-xl shadow-2xl border border-gray-700 w-full" />
                </div>
            </div>
        </div>
      </section>

      {/* SPECS & COMPARISON */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-3 max-w-4xl">
            <div className="grid gap-6 mb-10 items-center">
                 <div className="order-2">
                    <img src="/images/condizionatore-wall/6.webp" alt="Vista laterale" className="rounded-lg shadow w-full aspect-square object-cover" />
                </div>
                <div className="space-y-2 text-xs order-1">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Specifiche tecniche</h3>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Potenza raffreddamento:</span>
                        <span className="font-semibold text-gray-900">9000 BTU</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Potenza riscaldamento:</span>
                        <span className="font-semibold text-gray-900">12000 BTU</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Copertura:</span>
                        <span className="font-semibold text-orange-600">fino a 60m²</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Classe energetica:</span>
                        <span className="font-semibold text-green-600">A++</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Rumorosità:</span>
                        <span className="font-semibold text-gray-900">26-45 dB</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Controllo:</span>
                        <span className="font-semibold text-gray-900">Telecomando + Display</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Timer:</span>
                        <span className="font-semibold text-gray-900">Programmabile 24h</span>
                    </div>

                    <div className="bg-blue-50 p-3 rounded mt-4 border border-blue-100">
                        <p className="font-bold mb-2 text-blue-900 text-sm">Nella confezione:</p>
                        <ul className="list-disc pl-4 text-gray-700 space-y-1 text-xs">
                            <li>Unità climatizzatore a parete</li>
                            <li>Telecomando con batterie</li>
                            <li>Kit montaggio a parete</li>
                            <li>Manuale in italiano</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-bold mb-4 text-center">Perché scegliere il Pro 2in1?</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg -mx-3">
                <table className="w-full bg-white text-xs min-w-[500px]">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-2 text-left font-medium">Caratteristica</th>
                            <th className="py-3 px-2 text-center bg-blue-600 font-bold">Pro 2in1</th>
                            <th className="py-3 px-2 text-center text-gray-400">Condiz. base</th>
                            <th className="py-3 px-2 text-center text-gray-400">Termoconvettore</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr>
                            <td className="py-3 px-2 font-semibold text-gray-700">Raffreddamento</td>
                            <td className="py-3 px-2 text-center bg-blue-50 font-bold text-blue-700">✓ Sì</td>
                            <td className="py-3 px-2 text-center text-gray-600">✓ Sì</td>
                            <td className="py-3 px-2 text-center text-red-500">✗ No</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2 font-semibold text-gray-700">Riscaldamento</td>
                            <td className="py-3 px-2 text-center bg-blue-50 font-bold text-blue-700">✓ Sì</td>
                            <td className="py-3 px-2 text-center text-red-500">✗ No</td>
                            <td className="py-3 px-2 text-center text-gray-600">✓ Sì</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2 font-semibold text-gray-700">Efficienza</td>
                            <td className="py-3 px-2 text-center bg-blue-50 font-bold text-blue-700">A++</td>
                            <td className="py-3 px-2 text-center text-gray-600">A</td>
                            <td className="py-3 px-2 text-center text-gray-500">Bassa</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-2 font-semibold text-gray-700">Copertura</td>
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
            <h2 className="text-xl font-bold mb-6 text-center">Cosa dicono i clienti?</h2>
            <div className="grid gap-3">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★★</div>
                    <p className="text-gray-700 mb-3 italic text-xs">&quot;Con questo inverno gelido è stato una salvezza! Casa calda in 2 minuti. E niente unità esterna = zero problemi con il condominio!&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Marco R., Milano</div>
                    <span className="text-[10px] text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Verificato</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★★</div>
                    <p className="text-gray-700 mb-3 italic text-xs">&quot;Silenziosissimo! Lo uso in camera da letto per riscaldarla di notte. La modalità Sleep è fantastica.&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Giulia M., Roma</div>
                    <span className="text-[10px] text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Verificato</span>
                </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★☆</div>
                    <p className="text-gray-700 mb-3 italic text-xs">&quot;Copre il mio soggiorno di 55m² senza problemi. Senza motore esterno, perfetto per il mio appartamento!&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Antonio P., Napoli</div>
                    <span className="text-[10px] text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Verificato</span>
                </div>
            </div>
        </div>
      </section>

      {/* CHECKOUT */}
      <section id="ordina" className="py-10 bg-blue-50/50">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">

            <div className="bg-gray-900 text-white p-3 text-center">
                <h3 className="font-bold text-sm">COMPILA IL MODULO PER ORDINARE</h3>
                <p className="text-[10px] text-gray-400">Pagamento sicuro alla consegna del pacco</p>
            </div>

            <div className="grid">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <div className="flex gap-3 mb-4">
                        <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm flex-shrink-0">
                            <img src="/images/condizionatore-wall/7.webp" alt="Prodotto" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Climatizzatore a Parete Pro 2in1</h4>
                            <p className="text-xs text-gray-500">Caldo + Freddo • fino a 60m² • Senza unità esterna</p>
                            <div className="text-[10px] text-green-600 font-semibold mt-1 flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                Disponibile
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-xs mb-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Prezzo in offerta</span>
                            <span className="font-bold">199,99 €</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span>Spedizione (Contrassegno)</span>
                            <span className="font-bold">0 €</span>
                        </div>
                    </div>

                    <div className="border-t pt-3 flex justify-between items-center">
                        <span className="font-bold text-sm">Totale:</span>
                        <span className="text-2xl font-bold text-blue-600">199,99 €</span>
                    </div>

                    <div className="mt-4 bg-yellow-50 border border-yellow-100 p-2 rounded text-[10px] text-yellow-800 flex gap-2">
                        <LucideShieldCheck className="w-4 h-4 flex-shrink-0" />
                        Paghi al corriere in contanti o con carta. Nessun rischio.
                    </div>
                </div>

                <div className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input type="hidden" name="uid" value="01980829-601f-7dba-9f7a-150da3869743" />
                        <input type="hidden" name="offer" value="999" />
                        <input type="hidden" name="lp" value="999" />
                        <input type="hidden" name="tmfp" value="" />

                        <div>
                            <label className="text-[10px] font-bold text-gray-700 uppercase">Nome e Cognome</label>
                            <input
                              type="text"
                              name="your-name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="w-full border border-gray-300 p-2.5 rounded text-sm focus:outline-none focus:border-blue-500 transition"
                              placeholder="es. Mario Rossi"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-700 uppercase">Telefono (preferibilmente cellulare)</label>
                            <div className="relative flex">
                              <span className="inline-flex items-center px-3 text-sm text-gray-700 bg-gray-100 border border-r-0 border-gray-300 rounded-l font-medium">
                                {PHONE_PREFIX}
                              </span>
                              <input
                                type="tel"
                                name="tel"
                                autoComplete="tel"
                                inputMode="numeric"
                                maxLength={10}
                                value={formData.phone}
                                onChange={(e) => {
                                  const cleaned = cleanPhoneNumber(e.target.value);
                                  if (cleaned.length <= 10) {
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
                                placeholder="3401234567"
                              />
                              {touched.phone && !errors.phone && formData.phone && (
                                <LucideCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                              )}
                              <span className={`absolute right-8 top-1/2 -translate-y-1/2 text-[10px] ${formData.phone.length === 10 ? 'text-green-500' : 'text-gray-400'}`}>
                                {formData.phone.length}/10
                              </span>
                            </div>
                            {errors.phone && (
                              <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                                <LucideAlertCircle className="w-3 h-3" /> {errors.phone}
                              </p>
                            )}
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-700 uppercase">Indirizzo di spedizione</label>
                            <input
                              type="text"
                              name="street-address"
                              autoComplete="street-address"
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              className="w-full border border-gray-300 p-2.5 rounded text-sm focus:outline-none focus:border-blue-500 transition"
                              placeholder="es. Via Roma 1, 00100 Roma"
                            />
                        </div>

                        <div className="mt-3 p-2.5 bg-green-50 border border-green-200 rounded flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full border-4 border-green-600 bg-white"></div>
                                <span className="font-bold text-xs text-gray-800">Pagamento alla consegna</span>
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
                              Elaborazione...
                            </>
                          ) : (
                            <>
                              {isFormValid ? 'ACQUISTA E PAGA ALLA CONSEGNA!' : 'Compila tutti i campi correttamente'}
                              {isFormValid && <LucideTruck className="w-4 h-4" />}
                            </>
                          )}
                        </button>

                        {!isFormValid && Object.values(touched).some(t => t) && (
                          <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-2">
                            <p className="text-[10px] text-blue-800 font-medium flex items-center gap-1">
                              <LucideAlertCircle className="w-3 h-3" />
                              Compila tutti i campi obbligatori per sbloccare il pulsante ordine.
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
                            Cliccando il pulsante confermi l'ordine con obbligo di pagamento alla consegna.
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
          <h2 className="text-lg font-bold mb-4 text-center">Domande frequenti</h2>
          <div className="space-y-2">
            {[
              { q: "Posso pagare con carta al corriere?", a: "Sì, la maggior parte dei corrieri ha il POS. Puoi pagare anche in contanti." },
              { q: "Quanto costa la spedizione?", a: "Nell'offerta attuale la spedizione in contrassegno è completamente gratuita." },
              { q: "Per quanti metri quadri è adatto?", a: "Il climatizzatore copre ambienti fino a 60m². Con la sua potenza di 9000/12000 BTU li riscalda o raffredda molto rapidamente." },
              { q: "Serve un tecnico per l'installazione?", a: "Il kit di montaggio è incluso e l'installazione è semplice. Se preferisci, puoi comunque chiamare un tecnico." },
              { q: "Quando riceverò il pacco?", a: "Gli ordini entro le 14:00 vengono spediti lo stesso giorno. Il pacco arriva in 24-48h." }
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
            <span className="flex items-center text-green-600"><LucideCheckCircle className="w-3 h-3 mr-1" /> Alla consegna</span>
            <span className="flex items-center text-orange-600"><LucideFlame className="w-3 h-3 mr-1" /> Caldo</span>
            <span className="flex items-center"><LucideSnowflake className="w-3 h-3 mr-1" /> Freddo</span>
        </div>

        <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 line-through">399,98 €</span>
                <span className="text-xl font-bold text-gray-900 leading-none">199,99 €</span>
            </div>
            <button
                onClick={scrollToOrder}
                className="flex-1 bg-blue-600 text-white py-2.5 px-3 rounded font-bold hover:bg-blue-700 transition shadow-lg text-xs flex items-center justify-center"
            >
                ORDINA <LucideTruck className="w-3 h-3 ml-1" />
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      <GoogleAdsScript conversionId="AW-17763272302" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=999&uid=01980829-601f-7dba-9f7a-150da3869743&lp=999"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Desktop E-commerce Layout */}
      <DesktopEcommerce />

      {/* Mobile Landing Page Layout */}
      <MobileLanding />

      <Script
        src="https://offers.supertrendaffiliateprogram.com/forms/tmfp/"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }} title="hidden"></iframe>

      <form
        ref={hiddenFormRef}
        action="https://offers.supertrendaffiliateprogram.com/forms/api/"
        method="POST"
        target="hidden_iframe"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="uid" value="01980829-601f-7dba-9f7a-150da3869743" />
        <input type="hidden" name="key" value="a34a13ddd29b9e3832fe73" />
        <input type="hidden" name="offer" value="999" />
        <input type="hidden" name="lp" value="999" />
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
