import React from 'react'

function Page() {
    return (
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#013b94] mb-8">Get in Touch</h2>
            <div className="max-w-lg mx-auto bg-[#013b94] p-6 rounded-lg shadow-lg">
              <form className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 rounded-md border-2 border-white focus:outline-none focus:border-[#f5f5f5] text-gray-800"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                {/* Email Input */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 rounded-md border-2 border-white focus:outline-none focus:border-[#f5f5f5] text-gray-800"
                    placeholder="Your Email"
                    required
                  />
                </div>
                
                {/* Phone Number Input */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full p-3 rounded-md border-2 border-white focus:outline-none focus:border-[#f5f5f5] text-gray-800"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>
                
                {/* Select Option */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2" htmlFor="service">
                    Select a Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full p-3 rounded-md border-2 border-white focus:outline-none focus:border-[#f5f5f5] text-gray-800"
                    required
                  >
                    <option value="">Select a Service</option>
                    <option value="tour-packages">Tour Packages</option>
                    <option value="hotel-booking">Hotel Booking</option>
                    <option value="cab-services">Tembo travells</option>
                    <option value="houseboat-booking">Houseboat Booking</option>
                    <option value="bus">Bus Booking</option>
                  </select>
                </div>
    
                {/* Message Textarea */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    
                    className="w-full p-3 rounded-md border-2 border-white focus:outline-none focus:border-[#f5f5f5] text-gray-800"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-white text-[#013b94] font-semibold py-2 px-6 rounded-md hover:bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#013b94] focus:ring-opacity-50"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      );
}

export default Page