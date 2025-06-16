const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-400">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} MU Travel. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;