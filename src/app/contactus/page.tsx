import React from "react";

function Page() {
    return (
        <section className="bg-white  py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center  text-[#013b94] mb-8">Contact Us</h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              {/* Director Card 1 */}
              <div className="bg-[#013b94] text-white p-6 rounded-lg shadow-lg flex-1 max-w-sm w-full">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">SABU PR</h3>
                  <p className="text-sm">CEO</p>
                  <p className="mt-4 text-sm">
                    Email: <a href="mailto:rproyality632@gmail.com" className="underline hover:text-gray-300">rproyality632@gmail.com</a>
                  </p>
                  <p className="text-sm">
                    Phone: <a href="tel:+1234567890" className="underline hover:text-gray-300">8086866993</a>
                  </p>
                </div>
              </div>
    
              {/* Director Card 2 */}
              <div className="bg-[#013b94] text-white p-6 rounded-lg shadow-lg flex-1 max-w-sm w-full">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">ANJANA SABU</h3>
                  <p className="text-sm">MANAGING DIRECTOR</p>
                  <p className="mt-4 text-sm">
                    Email: <a href="mailto:rproyality632@gmail.com" className="underline hover:text-gray-300">rproyality632@gmail.com</a>
                  </p>
                  <p className="text-sm">
                    Phone: <a href="tel:+918075782022" className="underline hover:text-gray-300">8075782022</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}

export default Page;
