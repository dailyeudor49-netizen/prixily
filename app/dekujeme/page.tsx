"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { LucideCheckCircle, LucideTruck, LucidePhone, LucidePackage, LucideShieldCheck } from 'lucide-react';
import { GoogleAdsConversion, getLandingConfig } from '@/components/GoogleAdsTracking';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Zákazníku';
  const firstName = name.split(' ')[0];
  const landingSlug = searchParams.get('landing') || 'heater-cz';
  const customValue = searchParams.get('value');
  const transactionId = searchParams.get('tid');
  const isDouble = searchParams.get('double') === '1';

  // Configurazione landing per Google Ads
  const landingConfig = getLandingConfig(landingSlug);

  // Valore dinamico per la conversione
  const conversionValue = customValue ? parseFloat(customValue) : (landingConfig?.defaultValue || 1790);
  const currency = landingConfig?.currency || 'CZK';
  const productName = landingConfig?.productName || 'Ceramic Tower Heater Pro 2000';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 sm:py-16 px-4">
      {/* Google Ads Conversion Tracking - Purchase Event con valore dinamico */}
      {landingConfig && !isDouble && (
        <GoogleAdsConversion
          conversionId={landingConfig.conversionId}
          conversionLabel={landingConfig.conversionLabel}
          value={conversionValue}
          currency={currency}
          transactionId={transactionId || undefined}
        />
      )}

      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <LucideCheckCircle className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
            Děkujeme, {firstName}!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Vaše objednávka byla přijata.
          </p>
        </div>

        {/* Order Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <LucidePackage className="w-5 h-5 text-green-600" />
              Potvrzení objednávky
            </h2>
            <p className="text-gray-600 text-sm">
              Na zadané telefonní číslo obdržíte SMS s potvrzením.
            </p>
          </div>

          {/* What happens next */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Co bude následovat?</h3>

            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <LucidePhone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">1. Telefonický kontakt</h4>
                <p className="text-sm text-gray-600">
                  Náš konzultant vám zavolá do 24 hodin, aby potvrdil objednávku a dohodl podrobnosti doručení.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <LucideTruck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">2. Odeslání do 24-48 hodin</h4>
                <p className="text-sm text-gray-600">
                  Po potvrzení objednávky bude zásilka odeslána kurýrem. Obdržíte sledovací číslo zásilky.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <LucideShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">3. Platba při převzetí</h4>
                <p className="text-sm text-gray-600">
                  Zaplatíte kurýrovi hotově nebo kartou až při převzetí zásilky. Žádné riziko!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Vaše objednávka:</h3>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm">
              <img src="/images/7.png" alt={productName} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{productName}</h4>
              <p className="text-sm text-gray-500">Objednávka potvrzena</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-orange-600">{conversionValue} {currency}</p>
              <p className="text-xs text-gray-500">+ doprava zdarma</p>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6 mb-6">
          <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Důležité informace
          </h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Přijměte hovor od našeho konzultanta</li>
            <li>• Zkontrolujte zásilku před zaplacením kurýrovi</li>
            <li>• Uschovejte si účtenku - je to vaše záruka</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center text-gray-500 text-sm">
          <p>Máte dotazy? Kontaktujte nás:</p>
          <p className="font-semibold text-gray-700 mt-1">support@prixily.com</p>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Načítání...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
