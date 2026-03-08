import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: (action: string, eventName: string, params?: Record<string, any>) => void;
  }
}

export const useMetaPixel = () => {
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, params);
      console.log(`[Meta Pixel] Event tracked: ${eventName}`, params);
    } else {
      console.warn('[Meta Pixel] fbq is not available');
    }
  };

  const trackCustomEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, params);
      console.log(`[Meta Pixel] Custom event tracked: ${eventName}`, params);
    } else {
      console.warn('[Meta Pixel] fbq is not available');
    }
  };

  return {
    // Standard Events
    trackLead: (params?: Record<string, any>) => trackEvent('Lead', params),
    trackCompleteRegistration: (params?: Record<string, any>) => trackEvent('CompleteRegistration', params),
    trackContact: (params?: Record<string, any>) => trackEvent('Contact', params),
    trackSubmitApplication: (params?: Record<string, any>) => trackEvent('SubmitApplication', params),
    trackViewContent: (params?: Record<string, any>) => trackEvent('ViewContent', params),
    trackInitiateCheckout: (params?: Record<string, any>) => trackEvent('InitiateCheckout', params),

    // Custom Events
    trackCustom: trackCustomEvent,

    // Specific tracking for the site
    trackFormStart: (formName: string) => trackCustomEvent('FormStarted', { form_name: formName }),
    trackFormSubmit: (formName: string) => trackEvent('Lead', { form_name: formName }),
    trackButtonClick: (buttonName: string, destination?: string) =>
      trackCustomEvent('ButtonClick', { button_name: buttonName, destination }),
    trackChatMessage: (step: string) => trackCustomEvent('ChatInteraction', { step }),
    trackEligibilityComplete: () => trackEvent('Lead', { form_name: 'eligibility_chat' }),
    trackApplicationSubmit: (applicationData?: Record<string, any>) =>
      trackEvent('SubmitApplication', applicationData),
  };
};
