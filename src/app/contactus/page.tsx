import React from "react";

function Page() {
  return (
    <>
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#013b94] mb-8">
            Contact Us
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {/* Director Card 1 */}
            <div className="bg-[#013b94] text-white p-6 rounded-lg shadow-lg flex-1 max-w-sm w-full">
              <div className="text-center">
                <h3 className="text-xl font-semibold">SABU PR</h3>
                <p className="text-sm">CEO</p>
                <p className="mt-4 text-sm">
                  Email:{" "}
                  <a
                    href="mailto:rproyality632@gmail.com"
                    className="underline hover:text-gray-300"
                  >
                    rproyality632@gmail.com
                  </a>
                </p>
                <p className="text-sm">
                  Phone:{" "}
                  <a
                    href="tel:+918086866993"
                    className="underline hover:text-gray-300"
                  >
                    8086866993
                  </a>
                </p>
              </div>
            </div>

            {/* Director Card 2 */}
            <div className="bg-[#013b94] text-white p-6 rounded-lg shadow-lg flex-1 max-w-sm w-full">
              <div className="text-center">
                <h3 className="text-xl font-semibold">ANJANA SABU</h3>
                <p className="text-sm">MANAGING DIRECTOR</p>
                <p className="mt-4 text-sm">
                  Email:{" "}
                  <a
                    href="mailto:rproyality632@gmail.com"
                    className="underline hover:text-gray-300"
                  >
                    rproyality632@gmail.com
                  </a>
                </p>
                <p className="text-sm">
                  Phone:{" "}
                  <a
                    href="tel:+918075782022"
                    className="underline hover:text-gray-300"
                  >
                    8075782022
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#013b94] mb-8">
            Contact Information
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-[#013b94] mb-4">
              RP ROYALITY TOURS AND TRAVEL SOLUTIONS PVT LTD
            </h3>
            <p className="text-gray-700 mb-2">
              PAINADATH BUILDING, 2/180A, OPP. KURUMBAKAAV TEMPLE
            </p>
            <p className="text-gray-700 mb-2">
              POICKATTUSERY, CHENGAMANAD POST
            </p>
            <p className="text-gray-700 mb-2">
              NEAR COCHIN INTERNATIONAL AIRPORT, KOCHI
            </p>
            <p className="text-gray-700 mb-2">Kerala, India - 683578</p>
            <p className="text-gray-700 mb-2">
              <strong>COMPANY REGISTRATION:</strong> U63030KL2022PTC079508
            </p>
            <p className="text-gray-700 mb-2">
              <strong>GSTIN:</strong> 32AAMCR3886N1ZN
            </p>
            <p className="text-gray-700 mb-2">
              <strong>PAN:</strong> AAMCR3886N
            </p>
            <p className="text-gray-700 mb-2">
              <strong>TAN:</strong> CHNR04251C
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> +91 80787 83984 (official), +918086866993,
              +918075782022
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Official Email:</strong>{" "}
              <a
                href="mailto:rproyality632@gmail.com"
                className="underline hover:text-[#013b94]"
              >
                rproyality632@gmail.com
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>CEO Email:</strong>{" "}
              <a
                href="mailto:ssabu2011@gmail.com"
                className="underline hover:text-[#013b94]"
              >
                ssabu2011@gmail.com
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Managing Director Email:</strong>{" "}
              <a
                href="mailto:anjanaa693@gmail.com"
                className="underline hover:text-[#013b94]"
              >
                anjanaa693@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#013b94] mb-8">
            Our Location
          </h2>
          <div className="max-w-3xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1963.6491322925206!2d76.33352753895136!3d10.156392997489286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDA5JzIzLjAiTiA3NsKwMjAnMDUuMyJF!5e0!3m2!1sen!2sin!4v1725252761343!5m2!1sen!2sin"
              className="w-full h-80 rounded-lg shadow-lg"
             
              
              loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
