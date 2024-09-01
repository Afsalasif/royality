import React from 'react'

function Page() {
    return (
        <div className="bg-white min-h-screen">
          {/* Hero Section */}
          <section className="bg-[#013b94] text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              <p className="max-w-2xl mx-auto text-lg">
                Learn more about our company, our vision, and the amazing team that makes everything possible.
              </p>
            </div>
          </section>
    
          {/* Company Info Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-[#013b94] mb-8">About our Company</h2>
              <p className="max-w-3xl mx-auto  text-justify text-gray-700 mb-12">
              R P Royality Tours And Travel Solutions Private Limited (RPRTATSPL) is a Private Limited Indian Non-Government Company incorporated in India on 21 December 2022 . Its registered office is in Ernakulam, Kerala, India.

The Company is engaged in the Transportation And Logistics Industry.

The Company's status is Active It's a company limited by shares with an authorized capital of Rs 10.00 Lakh and a paid-up capital of Rs 0.10 Lakh, as per the Ministry of Corporate Affairs (MCA) records.

Anjana Sabu and Parakkat Sabu serve as directors at the Company.

We start this movement in kerala near Kochi airport about 16 years ago.. Company registered as private limited in 2022.. Presently in company.. 25 staff working in company.. We have service in all places in Kerala.. And suitable most cost effective tour.  We do package, hotel booking, house boat booking.. Cab service.. 
 We provide tour services and cab services outside Kerala, Coimbatore, Madurai, Rameswaram, Chennai, Bangalore, Kanyakumari and other parts.. Our organization with own vehicles, staff and highly educated drivers ensures 100% honest and sincere service.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-[#013b94] mb-4">Our Vision</h3>
                  <p className="text-gray-700">
                    To be the global leader in our industry, setting the standard for quality and innovation. Our vision is to make a positive impact on every customer we serve, every product we deliver, and every community we touch.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-[#013b94] mb-4">Our Mission</h3>
                  <p className="text-gray-700">
                    To deliver superior products and services that exceed our customers’ expectations. We aim to continuously innovate and improve, while fostering a culture of excellence and collaboration.
                  </p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Team Section */}
          <section className="py-16 bg-[#f5f5f5]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-[#013b94] mb-8">Meet Our Team</h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Team Member 1 */}
                <div className="bg-[#013b94] text-white p-6 rounded-lg shadow-lg max-w-xs w-full">
                  <div className="text-center">
                    {/* <img
                      src="/team1.jpg" // Replace with your image path
                      alt=""
                      className="w-24 h-24 mx-auto rounded-full mb-4"
                    /> */}
                    <h3 className="text-xl font-semibold">SABU PR</h3>
                    <p className="text-sm">Chief Executive Officer</p>
                    <p className="mt-4 text-sm">
                      Email: <a href="mailto:rproyality632@gmail.com" className="underline hover:text-gray-300">rproyality632@gmail.com</a>
                    </p>
                  </div>
                </div>
    
                {/* Team Member 2 */}
                <div className="bg-[#013b94] text-white p-6 rounded-lg shadow-lg max-w-xs w-full">
                  <div className="text-center">
                    {/* <img
                      src="/team2.jpg" // Replace with your image path
                      alt=""
                      className="w-24 h-24 mx-auto rounded-full mb-4"
                    /> */}
                    <h3 className="text-xl font-semibold">Anjana Sabu</h3>
                    <p className="text-sm">Managing director</p>
                    <p className="mt-4 text-sm">
                      Email: <a href="mailto:rproyality632@gmail.com" className="underline hover:text-gray-300">rproyality632@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
}

export default Page