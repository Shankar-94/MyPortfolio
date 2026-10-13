import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { ContactFormData, ContactFormErrors } from '../types';

const FORMSPREE_URL = 'https://formspree.io/f/moejngyl';

const EMPTY_FORM: ContactFormData = { name: '', email: '', message: '' };
const EMPTY_ERRORS: ContactFormErrors = {};

const validate = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) errors.name = 'This field is required.';
  if (!data.email.trim()) {
    errors.email = 'This field is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!data.message.trim()) errors.message = 'This field is required.';
  return errors;
};

export const Contact = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>(EMPTY_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSendError(null);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setIsSuccess(true);
    } catch {
      setSendError('Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
    setIsSuccess(false);
    setSendError(null);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="section animate-target"
      aria-labelledby="contact-title"
    >
      <header className="section__header">
        <h2 id="contact-title" className="section__title">
          Contact
        </h2>
        <p className="section__kicker">Let&apos;s build something together.</p>
      </header>
      <div className="section__body section__body--split">
        <div>
          <p>
            Prefer email?{' '}
            <strong>shankar.beruflich@outlook.com</strong>
            <br />
            Or reach out on your favourite platform below.
          </p>
          <ul className="link-list">
            <li>
              <a href="https://github.com/Shankar-94" target="_blank" rel="noreferrer">GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/shankar-puthani" target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
          </ul>
        </div>

        <div className="contact-form-wrap">
          {!isSuccess ? (
            <form
              className="contact-form"
              id="contact-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="contact-form__row">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                />
                <span className="field-error" role="alert">
                  {errors.name ?? ''}
                </span>
              </div>

              <div className="contact-form__row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                />
                <span className="field-error" role="alert">
                  {errors.email ?? ''}
                </span>
              </div>

              <div className="contact-form__row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                />
                <span className="field-error" role="alert">
                  {errors.message ?? ''}
                </span>
              </div>

              {sendError && (
                <p className="field-error" role="alert">
                  {sendError}
                </p>
              )}

              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          ) : (
            <div className="form-success" aria-live="polite">
              <div className="form-success__icon" aria-hidden="true">
                ✓
              </div>
              <p className="form-success__text">
                Message sent! I&apos;ll get back to you soon.
              </p>
              <button className="btn btn--ghost btn--sm" onClick={handleReset}>
                Send another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
