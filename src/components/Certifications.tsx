import { useScrollReveal } from '../hooks/useScrollReveal';
import { CERTIFICATIONS } from '../data';
import { BrandMark } from './BrandMark';

export const Certifications = () => {
  const ref = useScrollReveal<HTMLElement>();

  if (CERTIFICATIONS.length === 0) return null;

  return (
    <section
      ref={ref}
      id="certifications"
      className="section animate-target"
      aria-labelledby="certifications-title"
    >
      <header className="section__header">
        <h2 id="certifications-title" className="section__title">
          Certifications
        </h2>
        <p className="section__kicker">Credentials that back up the work.</p>
      </header>
      <div className="projects-grid">
        {CERTIFICATIONS.map((cert) => (
          <article key={cert.title} className="card card--project card--cert">
            {cert.image && (
              <a
                href={cert.file ?? cert.verifyUrl ?? cert.image}
                target="_blank"
                rel="noreferrer"
                className="cert__preview"
              >
                <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" />
              </a>
            )}
            {cert.logo && !cert.image && (
              <BrandMark src={cert.logo} className="card__corner-mark" />
            )}
            <div className="card__meta">
              {cert.issuer}
              {cert.date && ` · ${cert.date}`}
            </div>
            <h3 className="card__title">{cert.title}</h3>
            {cert.skills && cert.skills.length > 0 && (
              <ul className="pill-list pill-list--tight">
                {cert.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            )}
            {(cert.file || cert.verifyUrl) && (
              <div className="card__actions">
                {cert.file && (
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--primary btn--sm"
                  >
                    View certificate
                  </a>
                )}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn btn--sm ${cert.file ? 'btn--ghost' : 'btn--primary'}`}
                  >
                    {cert.file ? 'Verify' : 'View credential ↗'}
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
