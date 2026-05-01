'use client';

import { useState } from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    num: '01',
    title: 'Featured Listings',
    desc: 'Prime placement across our category pages, homepage, and editorial features — where luxury buyers are actively browsing.',
    icon: '📋',
  },
  {
    num: '02',
    title: 'Sponsored Stories',
    desc: 'Long-form editorial content crafted by our team, authentically woven into the Indian Luxury House voice.',
    icon: '✍️',
  },
  {
    num: '03',
    title: 'Social Campaigns',
    desc: 'Targeted campaigns across Instagram and LinkedIn, reaching India\'s most discerning luxury audience.',
    icon: '📱',
  },
  {
    num: '04',
    title: 'Brand Launch Support',
    desc: 'Full-scale launch coverage — editorial, social, listings, and PR — for new brands entering the Indian luxury market.',
    icon: '🚀',
  },
  {
    num: '05',
    title: 'Lead Generation',
    desc: 'Qualified leads from high-intent buyers actively seeking luxury goods, services, and experiences.',
    icon: '🎯',
  },
];

const WHY = [
  { title: 'Premium Positioning', desc: 'Your brand sits alongside the world\'s finest — in an environment built exclusively for luxury.' },
  { title: 'Relevant Audience',   desc: 'We attract India\'s HNI and UHNI segment — buyers with intent, taste, and purchasing power.' },
  { title: 'Bespoke Opportunities', desc: 'No cookie-cutter packages. Every partnership is tailored to your goals and brand identity.' },
];

const CATEGORIES = [
  'Cars & Automotive',
  'Yachts & Aviation',
  'Watches & Jewellery',
  'Style & Fashion',
  'Luxury Real Estate',
  'Food & Fine Dining',
  'Travel & Hospitality',
  'Other',
];

const BUDGETS = [
  'Under ₹1 Lakh',
  '₹1L – ₹5L',
  '₹5L – ₹15L',
  '₹15L – ₹50L',
  '₹50L+',
  'Let\'s Discuss',
];

export default function PartnerPage() {
  const [form, setForm] = useState({ name: '', company: '', category: '', budget: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.company || !form.message) return;
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0f0f0f',
    border: '1px solid rgba(201,168,76,0.2)',
    color: '#ffffff',
    fontSize: 13,
    padding: '14px 18px',
    outline: 'none',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <>
      <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72 }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          background: '#0a0a0a',
          padding: '100px 32px 90px',
          overflow: 'hidden',
          textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 60px)',
          }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 24, fontFamily: 'sans-serif' }}>
              Grow With Us
            </p>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(36px, 6vw, 74px)',
              fontWeight: 300, color: '#ffffff',
              lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: 28,
            }}>
              Partner With <em style={{ color: '#C9A84C' }}>Indian Luxury House</em>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4D45' }} />
              <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)' }} />
            </div>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontWeight: 300, fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
              Reach India's luxury audience through trusted visibility.
            </p>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
        </section>

        {/* ══ SERVICES ══════════════════════════════════════════ */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 32px 72px' }}>
          <div style={{ marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: 20 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10, fontFamily: 'sans-serif' }}>What We Offer</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 300, color: '#0a0a0a', letterSpacing: '0.01em' }}>Our Services</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#f0f0f0' }} className="partner-services">
            {SERVICES.map((s, i) => (
              <div key={s.num} style={{
                background: '#ffffff',
                padding: '40px 32px',
                position: 'relative',
                overflow: 'hidden',
                borderTop: i < 3 ? '2px solid #1B4D45' : '2px solid #C9A84C',
              }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: 42, fontWeight: 300, color: '#f5f5f5', marginBottom: 12, lineHeight: 1 }}>{s.num}</p>
                <div style={{ width: 24, height: 1, background: '#C9A84C', marginBottom: 16 }} />
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, color: '#0a0a0a', marginBottom: 12, letterSpacing: '0.02em' }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.8, fontWeight: 300, fontFamily: 'sans-serif' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ WHY WORK WITH US ══════════════════════════════════ */}
        <section style={{ background: '#0a0a0a', padding: '80px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 16, fontFamily: 'sans-serif' }}>The Advantage</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 300, color: '#ffffff', letterSpacing: '0.01em' }}>Why Work With Us</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="partner-why">
              {WHY.map((w, i) => (
                <div key={w.title} style={{ textAlign: 'center', padding: '40px 24px', border: '1px solid rgba(201,168,76,0.12)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 40, height: 1, background: '#C9A84C' }} />
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 300, color: 'rgba(27,77,69,0.4)', marginBottom: 20, lineHeight: 1 }}>0{i + 1}</p>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, color: '#ffffff', marginBottom: 14, letterSpacing: '0.02em' }}>{w.title}</h3>
                  <div style={{ width: 24, height: 1, background: '#C9A84C', margin: '0 auto 16px' }} />
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, fontWeight: 300, fontFamily: 'sans-serif' }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INQUIRY FORM ══════════════════════════════════════ */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '88px 32px 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 16, fontFamily: 'sans-serif' }}>Start the Conversation</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 300, color: '#0a0a0a', letterSpacing: '0.01em', marginBottom: 16 }}>Inquiry Form</h2>
            <div style={{ width: 40, height: 1, background: '#C9A84C', margin: '0 auto' }} />
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '64px 32px', border: '1px solid rgba(201,168,76,0.3)', background: '#fafafa' }}>
              <div style={{ width: 48, height: 1, background: '#C9A84C', margin: '0 auto 28px' }} />
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 300, color: '#0a0a0a', marginBottom: 16 }}>Thank You</h3>
              <p style={{ fontSize: 14, color: '#666', fontFamily: 'sans-serif', lineHeight: 1.8 }}>
                We've received your inquiry and will be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <div style={{ background: '#0a0a0a', padding: '56px 48px', position: 'relative' }} className="partner-form-pad">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#1B4D45,#C9A84C)' }} />

              {/* Name + Company */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="partner-form-2col">
                <div>
                  <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 8, fontFamily: 'sans-serif' }}>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 8, fontFamily: 'sans-serif' }}>Company *</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Brand or company name" style={inputStyle} />
                </div>
              </div>

              {/* Category + Budget */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="partner-form-2col">
                <div>
                  <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 8, fontFamily: 'sans-serif' }}>Category</label>
                  <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 8, fontFamily: 'sans-serif' }}>Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Select budget</option>
                    {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: 8, fontFamily: 'sans-serif' }}>Message *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell us about your brand, goals, and what kind of partnership you're looking for..."
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%', background: '#C9A84C', border: 'none',
                  color: '#0a0a0a', fontSize: 11, letterSpacing: '0.3em',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                  padding: '18px 32px', cursor: 'pointer',
                  fontWeight: 600, transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#DFC27A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
              >
                Submit Inquiry
              </button>

              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 20, fontFamily: 'sans-serif' }}>
                Or email us directly at{' '}
                <a href="mailto:hello@indianluxuryhouse.com" style={{ color: 'rgba(201,168,76,0.5)', textDecoration: 'none' }}>
                  hello@indianluxuryhouse.com
                </a>
              </p>
            </div>
          )}
        </section>

        {/* Back to home */}
        <div style={{ textAlign: 'center', padding: '32px 32px 56px', borderTop: '1px solid #f0f0f0' }}>
          <Link href="/" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1B4D45', textDecoration: 'none', fontFamily: 'sans-serif', borderBottom: '1px solid rgba(27,77,69,0.3)', paddingBottom: 3 }}>
            ← Back to Journal
          </Link>
        </div>

      </main>

      <style>{`
        @media (max-width: 767px) {
          .partner-services   { grid-template-columns: 1fr !important; }
          .partner-why        { grid-template-columns: 1fr !important; }
          .partner-form-2col  { grid-template-columns: 1fr !important; }
          .partner-form-pad   { padding: 36px 24px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .partner-services { grid-template-columns: repeat(2, 1fr) !important; }
          .partner-why      { grid-template-columns: repeat(2, 1fr) !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        input:focus, textarea:focus, select:focus { border-color: rgba(201,168,76,0.5) !important; }
        select option { background: #1a1a1a; color: #fff; }
      `}</style>
    </>
  );
}