import { supabase } from './supabase';

export type EventType = 'view' | 'call_click' | 'route_click' | 'search';

export async function trackEvent(
  eventType: EventType, 
  clinicSlug?: string, 
  pageUrl?: string,
  extraData: { country?: string, city?: string, device?: string } = {}
) {
  try {
    let sessionId = typeof window !== 'undefined' ? localStorage.getItem('hadi_session_id') : null;
    
    if (!sessionId && typeof window !== 'undefined') {
      sessionId = crypto.randomUUID();
      localStorage.setItem('hadi_session_id', sessionId);
    }

    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: eventType,
        clinic_slug: clinicSlug || 'global',
        page_url: pageUrl || (typeof window !== 'undefined' ? window.location.pathname : ''),
        session_id: sessionId,
        country: extraData.country || 'Unknown',
        city: extraData.city || 'Unknown',
        device_type: extraData.device || 'Desktop'
      });

    if (error) console.error('Tracking error:', error.message);
  } catch (err) {
    // Silent fail
  }
}
