"use client";

import Script from 'next/script';
import { useEffect } from 'react';

// Dichiarazione per TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface GoogleAdsTrackingProps {
  // Google Ads Conversion ID (es. AW-123456789)
  conversionId: string;
  // Opzionale: per tracciare pageview specifici
  pageLabel?: string;
}

interface ConversionConfig {
  // Etichetta di conversione specifica (es. AbCdEfGhIjKlMnOpQrSt)
  conversionLabel: string;
  // Valore della conversione
  value: number;
  // Valuta (default PLN)
  currency?: string;
  // Transaction ID opzionale
  transactionId?: string;
}

// Componente per includere lo script Google Ads base
export function GoogleAdsScript({ conversionId }: GoogleAdsTrackingProps) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}');
        `}
      </Script>
    </>
  );
}

// Funzione per tracciare conversioni (da chiamare sulla thank you page)
export function trackConversion({
  conversionId,
  conversionLabel,
  value,
  currency = 'PLN',
  transactionId
}: { conversionId: string } & ConversionConfig) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const conversionData: any = {
      'send_to': `${conversionId}/${conversionLabel}`,
      'value': value,
      'currency': currency,
    };

    if (transactionId) {
      conversionData['transaction_id'] = transactionId;
    }

    window.gtag('event', 'conversion', conversionData);

    console.log('[Google Ads] Conversion tracked:', conversionData);
  }
}

// Hook per tracciare conversioni automaticamente al mount
export function useConversionTracking(config: { conversionId: string } & ConversionConfig) {
  useEffect(() => {
    // Aspetta che gtag sia disponibile
    const checkAndTrack = () => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        trackConversion(config);
      } else {
        // Riprova dopo 100ms se gtag non è ancora caricato
        setTimeout(checkAndTrack, 100);
      }
    };

    checkAndTrack();
  }, [config.conversionId, config.conversionLabel, config.value, config.currency, config.transactionId]);
}

// Componente completo per la thank you page con conversion tracking automatico
export function GoogleAdsConversion({
  conversionId,
  conversionLabel,
  value,
  currency = 'PLN',
  transactionId
}: { conversionId: string } & ConversionConfig) {
  useConversionTracking({
    conversionId,
    conversionLabel,
    value,
    currency,
    transactionId
  });

  return (
    <>
      <GoogleAdsScript conversionId={conversionId} />
      {/* Event snippet for conversion - noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.googleadservices.com/pagead/conversion/${conversionId.replace('AW-', '')}/?value=${value}&currency=${currency}&label=${conversionLabel}&guid=ON&script=0`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Configurazioni per diverse landing page
export const LANDING_CONFIGS: Record<string, {
  conversionId: string;
  conversionLabel: string;
  defaultValue: number;
  currency: string;
  productName: string;
}> = {
  'heater-pl': {
    conversionId: 'AW-17763272302',
    conversionLabel: 'y_cyCMGcxc4bEO6MmJZC',
    defaultValue: 299,
    currency: 'PLN',
    productName: 'Ceramic Tower Heater Pro 2000'
  },
  'g-heater-pl': {
    conversionId: 'AW-17763272302',
    conversionLabel: 'y_cyCMGcxc4bEO6MmJZC',
    defaultValue: 299,
    currency: 'PLN',
    productName: 'Ceramic Tower Heater Pro 2000'
  },
  'heater-cz': {
    conversionId: 'AW-17763272302',
    conversionLabel: 'y_cyCMGcxc4bEO6MmJZC',
    defaultValue: 1749,
    currency: 'CZK',
    productName: 'Ceramic Tower Heater Pro 2000'
  },
};

// Funzione helper per ottenere la config di una landing
export function getLandingConfig(landingSlug: string) {
  return LANDING_CONFIGS[landingSlug] || null;
}
