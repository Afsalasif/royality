import React from "react";

function Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-[#013b94] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="max-w-2xl text-justify mx-auto text-lg"></p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Introduction */}
            <h2 className="text-2xl font-bold capitalize text-[#013b94] mb-4">
              1. refund policy
            </h2>
            <p className="text-gray-700 mb-8 text-justify">
              Cancellation and Returns You may cancel the booking up to 6 hour
              before the journey without any cancellation charges for all
              services. However, last-minute cancellations might cause a loss to
              the driver/hotel. Therefore, we recommend canceling as soon as you
              have learned of the change in your travel plans. Refunds If you
              are eligible for refunds based on the “Cancellation and Returns”
              policy above, then the refund will be remitted back to you in 5-7
              working days. In case of any issues, write to us at
              rproyality632@gmail.com or call us at +918086866993
            </p>
         
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
