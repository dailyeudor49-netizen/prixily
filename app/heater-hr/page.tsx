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
  LucideAlertCircle
} from 'lucide-react';

// Prefisso Croazia
const PHONE_PREFIX = '+385';

// Rimuove il prefisso se presente (per autocompilazione)
const cleanPhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Rimuovi +385 o 385 all'inizio
  if (cleaned.startsWith('+385')) {
    cleaned = cleaned.slice(4);
  } else if (cleaned.startsWith('385') && cleaned.length > 9) {
    cleaned = cleaned.slice(3);
  }
  // Rimuovi eventuali + rimasti
  cleaned = cleaned.replace(/\+/g, '');
  // Solo cifre
  return cleaned.replace(/[^0-9]/g, '');
};

// Validazione numero - esattamente 9 cifre
const validatePhone = (phone: string): { valid: boolean; error: string } => {
  const cleaned = cleanPhoneNumber(phone);

  if (cleaned.length === 0) {
    return { valid: false, error: '' };
  }
  if (cleaned.length < 9) {
    return { valid: false, error: 'Broj je prekratak (potrebno 9 znamenki).' };
  }
  if (cleaned.length > 9) {
    return { valid: false, error: 'Broj je predug (potrebno 9 znamenki).' };
  }
  if (!/^[0-9]+$/.test(cleaned)) {
    return { valid: false, error: 'Broj sadrži nevažeće znakove.' };
  }

  return { valid: true, error: '' };
};

const App = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    const productPrice = 69.99;

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
      router.push(`/hvala?name=${encodeURIComponent(formData.name)}&landing=heater-hr&value=${productPrice}&tid=${transactionId}`);
    }, 1000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('naruci');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">

      <GoogleAdsScript conversionId="AW-17763272302" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=532&uid=01980829-601f-7dba-9f7a-150da3869743&lp=532"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* HERO SECTION */}
      <header className="relative bg-white overflow-hidden pb-6 md:pb-10">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block bg-orange-100 text-orange-800 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4 uppercase tracking-wide">
                Bestseler zimske sezone
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
                Trenutna toplina tamo gdje vam treba – <span className="text-orange-600">bez rizika.</span>
              </h1>
              <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6">
                PTC keramički grijač 2000W s ECO načinom rada. Idealan za prostorije <strong>do 50m²</strong>. Naručite danas, platite kuriru pri preuzimanju.
              </p>

              <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 mb-4 sm:mb-8">
                {[
                  "Plaćanje pri preuzimanju",
                  "Brzo PTC zagrijavanje",
                  "ECO način - niski računi",
                  "Za prostorije do 50m²",
                  "Tihi rad + 12h timer"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm sm:text-base">
                    <LucideCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="text-center sm:text-left w-full sm:w-auto">
                  <p className="text-gray-400 text-xs sm:text-sm line-through">Cijena: 139,98 €</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900">69,99 €</p>
                  <p className="text-green-600 text-xs sm:text-sm font-semibold bg-green-50 px-2 py-1 rounded inline-block">
                    Uštedite 69,99 €
                  </p>
                </div>
                <button
                  onClick={scrollToOrder}
                  className="w-full sm:w-auto text-center bg-orange-600 hover:bg-orange-700 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-xl transform transition hover:-translate-y-1 flex flex-col items-center justify-center"
                >
                  <span>NARUČI POUZEĆEM</span>
                  <span className="text-[9px] sm:text-[10px] font-normal opacity-90 mt-1 uppercase tracking-wide">Plaćate samo kuriru</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Jamstvo 24 mjeseca</div>
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideTruck className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Isporuka 24h</div>
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded"><LucideHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Do 50m²</div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl relative max-w-xs sm:max-w-sm mx-auto lg:max-w-none">
                <img src="/images/1.png" alt="Ceramic Tower Heater Pro 2000" className="w-full h-auto object-contain mix-blend-multiply opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-red-600 text-white font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-md text-xs sm:text-sm">
                  -50% AKCIJA
                </div>
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 bg-white/95 backdrop-blur rounded-lg p-3 sm:p-4 shadow-lg border-l-4 border-orange-500">
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">100% Plaćanje pri preuzimanju</p>
                  <p className="text-[10px] sm:text-xs text-gray-600">Bez rizika. Plaćate tek kad vidite paket.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* AREA COVERAGE BADGE */}
      <section className="py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-center">
            <div className="flex items-center gap-2">
              <LucideHome className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-bold text-sm sm:text-lg">Idealan za prostorije do 50m²</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2 text-xs sm:text-sm opacity-90">
              <span>Dnevni boravak • Spavaća soba • Ured • Kupaonica • Garaža</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM -> SOLUTION */}
      <section className="py-8 sm:py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
            <div className="order-2 md:order-1">
              <img src="/images/2.png" alt="Hladan dnevni boravak" className="rounded-xl shadow-lg w-full h-48 sm:h-80 object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">Hladne večeri i visoki računi?</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                Centralno grijanje nije dovoljno, a grijanje cijele kuće košta bogatstvo? Nemojte se smrzavati u vlastitoj fotelji.
              </p>
              <div className="bg-orange-50 p-4 sm:p-6 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 flex items-center gap-2">
                  <LucideZap className="text-orange-600 w-5 h-5"/> Rješenje: Toplina za 2 minute
                </h3>
                <p className="text-xs sm:text-sm text-gray-700">
                  Ceramic Tower Heater Pro 2000 zagrije prostoriju <strong>do 50m²</strong> u nekoliko minuta. Plaćate samo udobnost koju trebate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto">
                {[
                    { icon: LucideFlame, label: "PTC keramika", sub: "Brza toplina" },
                    { icon: LucideWind, label: "Oscilacija", sub: "Ravnomjerni protok" },
                    { icon: LucideThermometer, label: "Termostat", sub: "Konstantna temperatura" },
                    { icon: LucideHome, label: "Do 50m²", sub: "Veliki domet" }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm text-center">
                        <item.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-orange-600" />
                        <h3 className="font-bold text-gray-900 text-xs sm:text-base">{item.label}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500">{item.sub}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CERAMIC HEAT RETENTION */}
      <section className="py-10 sm:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                PTC keramička tehnologija
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">
                Toplina koja traje <span className="text-orange-600">i nakon isključivanja</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                Zahvaljujući PTC keramičkom grijaćem tijelu, grijač <strong>akumulira toplinu</strong> i otpušta je još nekoliko minuta nakon isključivanja. To znači:
              </p>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideBatteryCharging className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Niži računi za struju</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Keramika otpušta toplinu bez potrošnje energije - uštedite do 30% energije</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideFlame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Duže zadržavanje topline</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Prostorija ostaje topla još 15-20 minuta nakon isključivanja grijača</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <LucideShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Sigurno za zdravlje</h4>
                    <p className="text-xs sm:text-sm text-gray-600">PTC keramika ne spaljuje kisik i ne isušuje zrak u prostoriji</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-orange-100">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center mb-3">
                    <LucideFlame className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-gray-900">Učinak akumulacije topline</h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Aktivno grijanje</span>
                      <span className="text-xs font-bold text-orange-600">100% snage</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full w-full"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">5 min nakon isključivanja</span>
                      <span className="text-xs font-bold text-amber-600">~70% topline</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full w-[70%]"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">15 min nakon isključivanja</span>
                      <span className="text-xs font-bold text-yellow-600">~40% topline</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full w-[40%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs sm:text-sm text-green-800 text-center font-medium">
                    <LucideCheckCircle className="w-4 h-4 inline mr-1" />
                    Besplatna toplina nakon isključivanja = prave uštede!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMART ECO */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          <div className="bg-slate-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Inteligentni ECO način rada</h2>
                <p className="text-blue-100 text-sm sm:text-base mb-4 sm:mb-6">
                  Grijač ima ugrađeni termostat. Postavite 22°C i uređaj automatski regulira snagu za održavanje temperature uz minimalnu potrošnju.
                </p>
                <div className="bg-white/10 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20">
                    <p className="font-bold text-green-400 mb-1 text-sm sm:text-base">Ušteda do 40%</p>
                    <p className="text-xs sm:text-sm">Grijač ne radi stalno punom snagom. Nakon zagrijavanja prostorije do 50m² prelazi u način održavanja.</p>
                </div>
              </div>
              <div className="flex justify-center">
                 <div className="bg-white text-gray-900 p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm">
                    <div className="flex justify-between items-center border-b pb-3 sm:pb-4 mb-3 sm:mb-4">
                        <span className="font-bold text-sm sm:text-lg">Potrošnja energije</span>
                        <span className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Auto način</span>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                                <span>Start (hladna soba)</span>
                                <span className="font-bold text-red-500">2000W</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full w-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                                <span>Održavanje</span>
                                <span className="font-bold text-green-500">~600-1000W</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full w-[40%]"></div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </section>

      {/* COMFORT FEATURES */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Udobnost korištenja</h2>
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    <span className="px-2 sm:px-4 py-1 bg-white border rounded-full text-xs sm:text-sm text-gray-600">Spavaća soba</span>
                    <span className="px-2 sm:px-4 py-1 bg-white border rounded-full text-xs sm:text-sm text-gray-600">Ured</span>
                    <span className="px-2 sm:px-4 py-1 bg-white border rounded-full text-xs sm:text-sm text-gray-600">Dnevni boravak</span>
                    <span className="px-2 sm:px-4 py-1 bg-white border rounded-full text-xs sm:text-sm text-gray-600">do 50m²</span>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="overflow-hidden rounded-lg mb-3 sm:mb-4 bg-gray-50">
                         <img src="/images/3.png" alt="Daljinski upravljač" className="w-full h-auto object-contain" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold mb-2">Potpuna kontrola s kauča</h3>
                    <p className="text-xs sm:text-base text-gray-600">Daljinskim upravljačem mijenjate temperaturu, uključujete oscilaciju ili postavljate timer. Pregledan LED zaslon.</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="overflow-hidden rounded-lg mb-3 sm:mb-4 bg-gray-50">
                        <img src="/images/4.png" alt="Oscilacija" className="w-full h-auto object-contain" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold mb-2">Široka oscilacija</h3>
                    <p className="text-xs sm:text-base text-gray-600">Ravnomjerno distribuira toplinu po cijeloj prostoriji do 50m², eliminira hladne kutove.</p>
                </div>
            </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">Sigurnost je prioritet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
                <div className="p-3 sm:p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <LucideShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Auto-isključivanje</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Isključuje se pri prevrtanju</p>
                </div>
                <div className="p-3 sm:p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <LucideThermometer className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Zaštita od pregrijavanja</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Senzor isključuje napajanje</p>
                </div>
                <div className="p-3 sm:p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <LucideLock className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Cool-Touch</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Sigurno kućište</p>
                </div>
            </div>
            <p className="text-gray-500 italic text-xs sm:text-sm bg-gray-50 inline-block px-3 sm:px-4 py-2 rounded-full">Sigurno za djecu i kućne ljubimce</p>
        </div>
      </section>

      {/* AMBIENCE */}
      <section className="py-10 sm:py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
                <div>
                    <span className="text-orange-400 font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Premium atmosfera</span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Više od grijača. <br />Stvorite ugodnu atmosferu.</h2>
                    <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        Realistični 3D efekt plamena pretvara vašu sobu u ugodnu oazu.
                    </p>
                    <p className="bg-gray-800 inline-block px-3 sm:px-4 py-2 sm:py-3 rounded text-xs sm:text-sm border-l-2 border-orange-500">
                        <span className="font-bold text-orange-400">Važno:</span> Svjetlosni efekt radi neovisno o grijanju.
                    </p>
                </div>
                <div>
                    <img src="/images/5.png" alt="Efekt kamina" className="rounded-xl shadow-2xl border border-gray-700 w-full" />
                </div>
            </div>
        </div>
      </section>

      {/* SPECS & COMPARISON */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-10 mb-10 sm:mb-20 items-center">
                 <div className="order-2 md:order-1">
                    <img src="/images/6.png" alt="Bočni pogled" className="rounded-lg shadow w-full h-48 sm:h-80 object-cover" />
                </div>
                <div className="space-y-2 sm:space-y-4 text-xs sm:text-sm order-1 md:order-2">
                    <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Tehnički parametri</h3>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Snaga grijanja:</span>
                        <span className="font-semibold text-gray-900">1000W / 2000W</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Grijaće tijelo:</span>
                        <span className="font-semibold text-gray-900">PTC keramika</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Površina:</span>
                        <span className="font-semibold text-orange-600">do 50m²</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Visina:</span>
                        <span className="font-semibold text-gray-900">cca 62 cm</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Timer:</span>
                        <span className="font-semibold text-gray-900">1h - 12h</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Upravljanje:</span>
                        <span className="font-semibold text-gray-900">Daljinski + Panel</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Potrošnja:</span>
                        <span className="font-semibold text-green-600">Max 2000W (ECO ~600W)</span>
                    </div>

                    <div className="bg-orange-50 p-3 sm:p-4 rounded mt-4 sm:mt-6 border border-orange-100">
                        <p className="font-bold mb-2 text-orange-900 text-sm">U pakiranju:</p>
                        <ul className="list-disc pl-4 sm:pl-5 text-gray-700 space-y-1 text-xs sm:text-sm">
                            <li>Ceramic Tower Heater Pro 2000</li>
                            <li>Daljinski upravljač</li>
                            <li>Upute za uporabu HR</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8 text-center">Zašto Tower Pro?</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg -mx-3 sm:mx-0">
                <table className="w-full bg-white text-xs sm:text-sm md:text-base min-w-[500px]">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-medium">Značajka</th>
                            <th className="py-3 sm:py-4 px-2 sm:px-4 text-center bg-orange-600 font-bold">Tower Pro</th>
                            <th className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-400">Kalorifer</th>
                            <th className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-400">Uljni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700">Površina</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center bg-orange-50 font-bold text-orange-700">do 50m²</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-600">do 15m²</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-500">do 25m²</td>
                        </tr>
                        <tr>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700">Zagrijavanje</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center bg-orange-50 font-bold text-orange-700">Trenutno</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-600">Brzo</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-500">15-30 min</td>
                        </tr>
                        <tr>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700">Toplina nakon isključivanja</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center bg-orange-50 font-bold text-orange-700">15-20 min</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-red-500">Nema</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-600">Dugo</td>
                        </tr>
                        <tr>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-700">Ušteda</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center bg-orange-50 font-bold text-orange-700">ECO način</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-red-500">Niska</td>
                            <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-600">Srednja</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10 text-center">Što kažu kupci?</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★★</div>
                    <p className="text-gray-700 mb-3 sm:mb-4 italic text-xs sm:text-base">&quot;Zagrije kupaonicu od 8m² za 3 minute. Koristim ga i u dnevnom boravku od 35m² - svladava to!&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Ana K., Zagreb</div>
                    <span className="text-[10px] sm:text-xs text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Potvrđeno</span>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★★</div>
                    <p className="text-gray-700 mb-3 sm:mb-4 italic text-xs sm:text-base">&quot;Eco način radi odlično. Keramika drži toplinu i nakon isključivanja!&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Marko, Split</div>
                    <span className="text-[10px] sm:text-xs text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Potvrđeno</span>
                </div>
                 <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm sm:col-span-2 md:col-span-1">
                    <div className="text-yellow-400 mb-2 flex text-sm">★★★★☆</div>
                    <p className="text-gray-700 mb-3 sm:mb-4 italic text-xs sm:text-base">&quot;Grijem garažu od 45m². Radi bolje nego što sam očekivao.&quot;</p>
                    <div className="font-bold text-gray-900 text-sm">– Tomislav, Rijeka</div>
                    <span className="text-[10px] sm:text-xs text-green-600 flex items-center mt-1 font-semibold"><LucideCheckCircle className="w-3 h-3 mr-1"/> Potvrđeno</span>
                </div>
            </div>
        </div>
      </section>

      {/* CHECKOUT */}
      <section id="naruci" className="py-10 sm:py-16 bg-orange-50/50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">

            <div className="bg-gray-900 text-white p-3 sm:p-4 text-center">
                <h3 className="font-bold text-sm sm:text-lg">ISPUNITE OBRAZAC ZA NARUDŽBU</h3>
                <p className="text-[10px] sm:text-xs text-gray-400">Sigurno plaćanje pri preuzimanju paketa</p>
            </div>

            <div className="grid md:grid-cols-2">
                <div className="p-4 sm:p-6 md:p-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100">
                    <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg p-2 shadow-sm flex-shrink-0">
                            <img src="/images/7.png" alt="Proizvod" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm sm:text-base">Ceramic Tower Heater Pro</h4>
                            <p className="text-xs text-gray-500">2000W • do 50m²</p>
                            <div className="text-[10px] sm:text-xs text-green-600 font-semibold mt-1 flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                Na zalihi
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm mb-4 sm:mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Akcijska cijena</span>
                            <span className="font-bold">69,99 €</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span>Dostava (Pouzeće)</span>
                            <span className="font-bold">0 €</span>
                        </div>
                    </div>

                    <div className="border-t pt-3 sm:pt-4 flex justify-between items-center">
                        <span className="font-bold text-sm sm:text-lg">Ukupno:</span>
                        <span className="text-2xl sm:text-3xl font-bold text-orange-600">69,99 €</span>
                    </div>

                    <div className="mt-4 sm:mt-6 bg-yellow-50 border border-yellow-100 p-2 sm:p-3 rounded text-[10px] sm:text-xs text-yellow-800 flex gap-2">
                        <LucideShieldCheck className="w-4 h-4 flex-shrink-0" />
                        Plaćate kuriru gotovinom ili karticom. Bez rizika.
                    </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input type="hidden" name="uid" value="01980829-601f-7dba-9f7a-150da3869743" />
                        <input type="hidden" name="offer" value="532" />
                        <input type="hidden" name="lp" value="532" />
                        <input type="hidden" name="tmfp" value="" />

                        <div>
                            <label className="text-[10px] sm:text-xs font-bold text-gray-700 uppercase">Ime i prezime</label>
                            <input
                              type="text"
                              name="your-name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded text-sm focus:outline-none focus:border-orange-500 transition"
                              placeholder="npr. Ivan Horvat"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] sm:text-xs font-bold text-gray-700 uppercase">Telefon (najbolje mobitel)</label>
                            <div className="relative flex">
                              <span className="inline-flex items-center px-3 text-sm text-gray-700 bg-gray-100 border border-r-0 border-gray-300 rounded-l font-medium">
                                {PHONE_PREFIX}
                              </span>
                              <input
                                type="tel"
                                name="tel"
                                autoComplete="tel"
                                inputMode="numeric"
                                maxLength={9}
                                value={formData.phone}
                                onChange={(e) => {
                                  const cleaned = cleanPhoneNumber(e.target.value);
                                  if (cleaned.length <= 9) {
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
                                className={`flex-1 border p-2.5 sm:p-3 rounded-r text-sm focus:outline-none transition ${
                                  errors.phone ? 'border-red-500 bg-red-50' : touched.phone && !errors.phone && formData.phone ? 'border-green-500 bg-green-50' : 'border-gray-300 focus:border-orange-500'
                                }`}
                                placeholder="912345678"
                              />
                              {touched.phone && !errors.phone && formData.phone && (
                                <LucideCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                              )}
                              <span className={`absolute right-8 top-1/2 -translate-y-1/2 text-[10px] ${formData.phone.length === 9 ? 'text-green-500' : 'text-gray-400'}`}>
                                {formData.phone.length}/9
                              </span>
                            </div>
                            {errors.phone && (
                              <p className="text-red-500 text-[10px] sm:text-xs mt-1 flex items-center gap-1">
                                <LucideAlertCircle className="w-3 h-3" /> {errors.phone}
                              </p>
                            )}
                        </div>

                        <div>
                            <label className="text-[10px] sm:text-xs font-bold text-gray-700 uppercase">Adresa za dostavu</label>
                            <input
                              type="text"
                              name="street-address"
                              autoComplete="street-address"
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded text-sm focus:outline-none focus:border-orange-500 transition"
                              placeholder="npr. Ilica 1, 10000 Zagreb"
                            />
                        </div>

                        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-green-50 border border-green-200 rounded flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-4 border-green-600 bg-white"></div>
                                <span className="font-bold text-xs sm:text-sm text-gray-800">Plaćanje pri preuzimanju</span>
                            </div>
                            <LucideCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        </div>

                        <button
                          type="submit"
                          disabled={!isFormValid || isSubmitting}
                          className={`w-full font-bold text-sm sm:text-lg p-3 sm:p-4 rounded shadow-lg mt-3 sm:mt-4 transition flex items-center justify-center gap-2 ${
                            isFormValid && !isSubmitting
                              ? 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer transform hover:scale-[1.02]'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Obrada...
                            </>
                          ) : (
                            <>
                              {isFormValid ? 'KUPI I PLATI PRI PREUZIMANJU!' : 'Ispunite sva polja ispravno'}
                              {isFormValid && <LucideTruck className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </>
                          )}
                        </button>

                        {!isFormValid && Object.values(touched).some(t => t) && (
                          <div className="bg-orange-50 border border-orange-200 rounded p-2 sm:p-3 mt-2">
                            <p className="text-[10px] sm:text-xs text-orange-800 font-medium flex items-center gap-1">
                              <LucideAlertCircle className="w-3 h-3" />
                              Ispunite sva obavezna polja za otključavanje gumba za narudžbu.
                            </p>
                          </div>
                        )}

                        {submitError && (
                          <div className="bg-red-50 border border-red-200 rounded p-2 sm:p-3 mt-2">
                            <p className="text-[10px] sm:text-xs text-red-800 font-medium flex items-center gap-1">
                              <LucideAlertCircle className="w-3 h-3" />
                              {submitError}
                            </p>
                          </div>
                        )}

                        <p className="text-[9px] sm:text-[10px] text-center text-gray-400 mt-2">
                            Klikom na gumb potvrđujete narudžbu s obvezom plaćanja pri preuzimanju.
                        </p>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 sm:py-12 bg-white mb-20 sm:mb-24 md:mb-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
          <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8 text-center">Pitanja i odgovori</h2>
          <div className="space-y-2">
            {[
              { q: "Mogu li platiti karticom kuriru?", a: "Da, većina kurira ima terminale za plaćanje. Možete platiti i gotovinom." },
              { q: "Koliko košta dostava?", a: "U trenutnoj akciji dostava pouzećem je potpuno besplatna." },
              { q: "Za koju površinu je grijač dovoljan?", a: "Grijač je idealan za prostorije do 50m². Snagom od 2000W ih vrlo brzo zagrije." },
              { q: "Drži li keramika stvarno toplinu?", a: "Da! PTC keramičko grijaće tijelo akumulira toplinu i otpušta je još 15-20 minuta nakon isključivanja, što štedi energiju." },
              { q: "Kada ću dobiti paket?", a: "Narudžbe do 14:00 šaljemo isti dan. Paket će biti kod vas za 24-48h." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-3 sm:p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition text-xs sm:text-base"
                >
                  {faq.q}
                  <LucideChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ml-2 transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="p-3 sm:p-4 text-xs sm:text-sm text-gray-600 bg-white border-t border-gray-100">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2 sm:p-3 md:hidden z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] safe-area-pb">
        <div className="flex justify-center items-center gap-3 sm:gap-4 mb-1.5 sm:mb-2 text-[9px] sm:text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
            <span className="flex items-center text-green-600"><LucideCheckCircle className="w-3 h-3 mr-1" /> Pri preuzimanju</span>
            <span className="flex items-center"><LucideHome className="w-3 h-3 mr-1" /> Do 50m²</span>
        </div>

        <div className="flex justify-between items-center gap-2 sm:gap-3">
            <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] text-gray-500 line-through">139,98 €</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-none">69,99 €</span>
            </div>
            <button
                onClick={scrollToOrder}
                className="flex-1 bg-orange-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded font-bold hover:bg-orange-700 transition shadow-lg text-xs sm:text-sm flex items-center justify-center"
            >
                NARUČI <LucideTruck className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            </button>
        </div>
      </div>

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
        <input type="hidden" name="offer" value="532" />
        <input type="hidden" name="lp" value="532" />
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
