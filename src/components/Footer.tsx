export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <p className="site-footer__text">
          &copy; {year} Shankar B Puthani. Built with React, TypeScript &amp; a neubrutalist mood.
        </p>
      </div>
    </footer>
  );
};
