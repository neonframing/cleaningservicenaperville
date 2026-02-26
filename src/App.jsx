import { useState } from 'react'
import './App.css'

// Import logo
import logo from '/favicon.svg'

// Import images
import heroImage from './assets/commercial-cleaning/commercial-hero-banner.webp'
import heroImageFallback from './assets/commercial-cleaning/commercial-hero-banner.jpg'
import laptopGuy from './assets/commercial-cleaning/laptop-guy.webp'
import laptopGuyFallback from './assets/commercial-cleaning/laptop-guy.jpg'
import weightsCleaning from './assets/commercial-cleaning/weights-cleaning.webp'
import weightsCleaningFallback from './assets/commercial-cleaning/weights-cleaning.jpg'
import barbershop from './assets/commercial-cleaning/barbershop.webp'
import barbershopFallback from './assets/commercial-cleaning/barbershop.jpg'
import guyCleaning from './assets/commercial-cleaning/guy-cleaning.webp'
import guyCleaningFallback from './assets/commercial-cleaning/guy-cleaning.jpg'
import womanMopping from './assets/commercial-cleaning/woman-mopping.webp'
import womanMoppingFallback from './assets/commercial-cleaning/woman-mopping.jpg'
import cleanDental from './assets/commercial-cleaning/clean-dental.jpg'
import shieldIcon from './assets/commercial-cleaning/shield.svg'
import clockIcon from './assets/commercial-cleaning/clock.svg'
import ecoIcon from './assets/commercial-cleaning/eco.svg'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    businessName: '',
    businessType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await fetch('https://hooks.zapier.com/hooks/catch/23728461/u04vtmg/', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submissionDate: new Date().toISOString()
        })
      })
      
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        businessName: '',
        businessType: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="commercial-cleaning-page">
      {/* ========== HEADER / NAVIGATION ========== */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src={logo} alt="Evora Cleaners" className="logo-image" />
          </div>
          <nav className="nav">
            <a href="#services" className="nav-link">Services</a>
            <a href="#why-us" className="nav-link">Why Us</a>
            <a href="#contact" className="nav-link cta-link">Get Free Quote</a>
          </nav>
        </div>
      </header>

      {/* ========== ATTENTION: HERO SECTION ========== */}
      <section className="hero">
        <picture className="hero-image">
          <source srcSet={heroImage} type="image/webp" />
          <img src={heroImageFallback} alt="Professional commercial office cleaning by Evora Cleaners in Naperville" />
        </picture>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Commercial Cleaning for<br />
            <span className="highlight">Small Business Owners</span>
          </h1>
          <p className="hero-subtitle">
            You run the business. We'll keep it spotless. Professional, bonded & insured 
            commercial cleaning for dental offices, medical practices, gyms, salons, law firms, and more.
          </p>
          <form className="hero-form contact-form" onSubmit={handleSubmit}>
            <h3>Request Your Free Quote</h3>
            {submitStatus === 'success' && (
              <div className="form-success">Thank you! We'll be in touch within 24 hours.</div>
            )}
            {submitStatus === 'error' && (
              <div className="form-error">Something went wrong. Please try again or call us.</div>
            )}
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="firstName" placeholder="First Name *" required value={formData.firstName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input type="text" name="lastName" placeholder="Last Name *" required value={formData.lastName} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="tel" name="phone" placeholder="Phone Number *" required value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email Address *" required value={formData.email} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <select name="businessType" value={formData.businessType} onChange={handleInputChange}>
                  <option value="" disabled>Type of Business</option>
                  <option value="dental">Dental Office</option>
                  <option value="medical">Doctor / Medical Office</option>
                  <option value="gym">Gym / Fitness Center</option>
                  <option value="law">Law Firm</option>
                  <option value="accounting">Accountant / CPA Office</option>
                  <option value="insurance">Insurance Office</option>
                  <option value="realestate">Real Estate Office</option>
                  <option value="salon">Salon / Barbershop / Spa</option>
                  <option value="medspa">Med Spa / Botox Clinic</option>
                  <option value="apartment">Apartment Building</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Tell us about your cleaning needs..." rows="3" value={formData.message} onChange={handleInputChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Get My Free Estimate'}
            </button>
            <p className="form-note">We'll respond within 24 hours with a customized quote.</p>
          </form>
          <div className="hero-trust">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              <span>Bonded & Insured</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span>Background Checked</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              <span>Flexible Scheduling</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INTEREST: SERVICES SECTION ========== */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Services</span>
            <h2 className="section-title">Commercial Cleaning Solutions for Every Business</h2>
            <p className="section-description">
              Reliable, detail-driven cleaning services designed to keep your workspace spotless, healthy, and ready for success every day.
            </p>
          </div>

          <div className="services-grid">
            {/* Fitness & Wellness */}
            <div className="service-card">
              <div className="service-image-wrapper">
                <picture>
                  <source srcSet={weightsCleaning} type="image/webp" />
                  <img src={weightsCleaningFallback} alt="Gym equipment cleaning services" />
                </picture>
              </div>
              <div className="service-content">
                <h3 className="service-title">Gyms & Fitness Centers</h3>
                <p className="service-description">
                  Keep your members healthy with thorough sanitization of all equipment 
                  and facilities.
                </p>
                <ul className="service-list">
                  <li>Equipment & machine sanitization</li>
                  <li>Locker rooms & showers</li>
                  <li>Floor care & mat cleaning</li>
                  <li>High-touch surface disinfection</li>
                </ul>
              </div>
            </div>

            {/* Medical & Dental */}
            <div className="service-card featured">
              <div className="featured-badge">Most Popular</div>
              <div className="service-image-wrapper">
                <picture>
                  <img src={cleanDental} alt="Medical and dental office cleaning" />
                </picture>
              </div>
              <div className="service-content">
                <h3 className="service-title">Medical & Dental Offices</h3>
                <p className="service-description">
                  Maintain a sterile, welcoming environment for your patients with 
                  healthcare-grade cleaning protocols.
                </p>
                <ul className="service-list">
                  <li>Waiting rooms & reception areas</li>
                  <li>Exam rooms & treatment areas</li>
                  <li>Restrooms & patient areas</li>
                  <li>Overnight cleaning available</li>
                </ul>
              </div>
            </div>

            {/* Professional Offices */}
            <div className="service-card">
              <div className="service-image-wrapper">
                <picture>
                  <source srcSet={laptopGuy} type="image/webp" />
                  <img src={laptopGuyFallback} alt="Professional office cleaning services" />
                </picture>
              </div>
              <div className="service-content">
                <h3 className="service-title">Professional Offices</h3>
                <p className="service-description">
                  Law firms, accountants, insurance agencies, real estate offices—
                  we keep your workspace impeccable.
                </p>
                <ul className="service-list">
                  <li>Private offices & conference rooms</li>
                  <li>Reception & waiting areas</li>
                  <li>Break rooms & kitchens</li>
                  <li>After-hours service available</li>
                </ul>
              </div>
            </div>

            {/* Salons & Barbershops */}
            <div className="service-card">
              <div className="service-image-wrapper">
                <picture>
                  <source srcSet={barbershop} type="image/webp" />
                  <img src={barbershopFallback} alt="Salon and barbershop cleaning services" />
                </picture>
              </div>
              <div className="service-content">
                <h3 className="service-title">Salons & Barbershops</h3>
                <p className="service-description">
                  Create a fresh, inviting atmosphere for your clients with 
                  professional salon cleaning services.
                </p>
                <ul className="service-list">
                  <li>Styling stations & mirrors</li>
                  <li>Shampoo bowls & spa areas</li>
                  <li>Floor care & hair removal</li>
                  <li>Restrooms & waiting areas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INTEREST: WHAT WE CLEAN ========== */}
      <section className="what-we-clean">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Clean in Your Commercial Space</h2>
            <p className="section-description">
              Our commercial cleaning services cover the essential spaces that keep your business looking professional and running smoothly.
            </p>
          </div>
          <div className="checklist-grid">
            <div className="checklist-column">
              <div className="checklist-item"><span className="check">✓</span> Waiting rooms & reception areas</div>
              <div className="checklist-item"><span className="check">✓</span> Exam & treatment rooms</div>
              <div className="checklist-item"><span className="check">✓</span> Salon stations & styling areas</div>
              <div className="checklist-item"><span className="check">✓</span> Gym equipment & locker rooms</div>
              <div className="checklist-item"><span className="check">✓</span> Conference & meeting rooms</div>
            </div>
            <div className="checklist-column">
              <div className="checklist-item"><span className="check">✓</span> Private offices & workstations</div>
              <div className="checklist-item"><span className="check">✓</span> Client & staff restrooms</div>
              <div className="checklist-item"><span className="check">✓</span> Break rooms & kitchens</div>
              <div className="checklist-item"><span className="check">✓</span> Lobby & common areas</div>
              <div className="checklist-item"><span className="check">✓</span> Interior glass & mirrors</div>
            </div>
            <div className="checklist-column">
              <div className="checklist-item"><span className="check">✓</span> High-touch surface sanitation</div>
              <div className="checklist-item"><span className="check">✓</span> Floor care (sweep, mop, vacuum)</div>
              <div className="checklist-item"><span className="check">✓</span> Trash removal & recycling</div>
              <div className="checklist-item"><span className="check">✓</span> Hallways & stairwells</div>
              <div className="checklist-item"><span className="check">✓</span> After-hours cleaning available</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DESIRE: WHY CHOOSE US ========== */}
      <section id="why-us" className="why-us">
        <h2 className="why-us__title">The Trusted Choice for Naperville Businesses</h2>
        <p className="why-us__description">
          We understand that your facility reflects your brand. Our team is trained to uphold 
          the highest standards of cleanliness, confidentiality, and professionalism.
        </p>

        <div className="why-us__grid">
          <div className="icon-card">
            <div className="icon-card__icon-wrapper">
              <img src={shieldIcon} alt="Bonded & Insured" className="icon-card__icon" />
            </div>
            <h3 className="icon-card__title">Bonded & Insured</h3>
            <p className="icon-card__description">Full peace of mind with comprehensive insurance coverage and bonded staff for your protection.</p>
          </div>

          <div className="icon-card">
            <div className="icon-card__icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <polyline points="17 11 19 13 23 9"></polyline>
              </svg>
            </div>
            <h3 className="icon-card__title">Vetted Professionals</h3>
            <p className="icon-card__description">Every cleaner undergoes thorough background checks and in-person interviews before joining our team.</p>
          </div>

          <div className="icon-card">
            <div className="icon-card__icon-wrapper">
              <img src={clockIcon} alt="Flexible Scheduling" className="icon-card__icon" />
            </div>
            <h3 className="icon-card__title">Flexible Scheduling</h3>
            <p className="icon-card__description">Early morning, late night, or weekend cleaning—we work around your business hours with zero disruption.</p>
          </div>

          <div className="icon-card">
            <div className="icon-card__icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 className="icon-card__title">Professional Training</h3>
            <p className="icon-card__description">Our team is trained in commercial cleaning best practices to protect your assets and maintain excellence.</p>
          </div>

          <div className="icon-card">
            <div className="icon-card__icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="icon-card__title">Local & Reliable</h3>
            <p className="icon-card__description">Proudly serving Naperville and surrounding areas with consistent, dependable service you can count on.</p>
          </div>

          <div className="icon-card">
            <div className="icon-card__icon-wrapper">
              <img src={ecoIcon} alt="Eco-Friendly Options" className="icon-card__icon" />
            </div>
            <h3 className="icon-card__title">Eco-Friendly Options</h3>
            <p className="icon-card__description">Green cleaning products available upon request for environmentally conscious businesses.</p>
          </div>
        </div>
      </section>

      {/* ========== ACTION: CONTACT / CTA SECTION ========== */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-content">
              <span className="section-tag">Get Started Today</span>
              <h2 className="section-title">Ready to Elevate Your Business Space?</h2>
              <p className="section-description">
                Let Evora Cleaners help you maintain a professional, hygienic, and pristine 
                work environment. Request your personalized quote and schedule a complimentary 
                walk-through today.
              </p>
              <div className="contact-info-items">
                <a href="tel:630-335-7721" className="contact-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>630-335-7721</span>
                </a>
                <a href="mailto:support@evoracleaners.com" className="contact-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>support@evoracleaners.com</span>
                </a>
                <div className="contact-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Mon - Fri: 9 AM - 5 PM</span>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Request Your Free Quote</h3>
                {submitStatus === 'success' && (
                  <div className="form-success">Thank you! We'll be in touch within 24 hours.</div>
                )}
                {submitStatus === 'error' && (
                  <div className="form-error">Something went wrong. Please try again or call us.</div>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" name="firstName" placeholder="First Name *" required value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="lastName" placeholder="Last Name *" required value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Phone Number *" required value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address *" required value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <select name="businessType" value={formData.businessType} onChange={handleInputChange}>
                      <option value="" disabled>Type of Business</option>
                      <option value="dental">Dental Office</option>
                      <option value="medical">Doctor / Medical Office</option>
                      <option value="gym">Gym / Fitness Center</option>
                      <option value="law">Law Firm</option>
                      <option value="accounting">Accountant / CPA Office</option>
                      <option value="insurance">Insurance Office</option>
                      <option value="realestate">Real Estate Office</option>
                      <option value="salon">Salon / Barbershop / Spa</option>
                      <option value="medspa">Med Spa / Botox Clinic</option>
                      <option value="apartment">Apartment Building</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Tell us about your cleaning needs..." rows="3" value={formData.message} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Get My Free Estimate'}
                </button>
                <p className="form-note">
                  We'll respond within 24 hours with a customized quote.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <img src={logo} alt="Evora Cleaners" className="logo-image" />
              </div>
              <p>Clean Homes. Clean Workplaces.<br />More Time for Life.</p>
              <div className="social-links">
                <a href="https://www.facebook.com/share/1Ah9EU6jxn/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/evoracleaning/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/evora-cleaners/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            <div className="footer-contact">
              <h4>Contact</h4>
              <p>630-335-7721</p>
              <p>support@evoracleaners.com</p>
              <p>Naperville, IL</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Evora Cleaners. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
