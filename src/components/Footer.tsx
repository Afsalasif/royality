// components/Footer.js

const Footer = () => {
    return (
      <footer className="bg-[#013b94] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold">RP ROYALITY</h4>
              <p className="text-sm">© {new Date().getFullYear()} All Rights Reserved</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/refundpolicy" className="hover:text-gray-300">
                Refund Policy
              </a>
              <a href="/aboutus" className="hover:text-gray-300">
                About us
              </a>

              <a href="privacypolicy" className="hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="/termsandconditions" className="hover:text-gray-300">
                Terms of Service
              </a>
              <a href="/contactus" className="hover:text-gray-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  