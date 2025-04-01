export const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-dark-primary py-4 px-6 flex items-center justify-center text-black dark:text-white">
      <div className="w-full max-w-6xl flex flex-col items-center space-y-4 text-center">
        <p className="dark:text-text-secondary text-sm">
          DIPLOMATURA UNIVERSITARIA DESARROLLO WEB FULL STACK CON JAVASCRIPT
        </p>

        <a
          href="https://github.com/matiasdsanchezr"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center space-x-2 dark:text-accent-teal hover:text-button-primary-hover transition-colors duration-300"
        >
          <i className="ph ph-github-logo text-2xl"></i>
          <span className="font-['Orbitron'] text-sm">github.com/matiasdsanchezr</span>
        </a>

        <p className="dark:text-text-secondary text-sm inline-block">
          &copy; <span id="currentYear">2025</span>
        </p>
      </div>
    </footer>
  );
};
