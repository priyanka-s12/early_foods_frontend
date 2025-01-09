const Footer = () => {
  return (
    <footer className="bg-body-tertiary py-3">
      <div className="container">
        <div className="text-center">
          <p>
            &copy; {new Date().getFullYear()} Early Foods. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
