import React from "react";

function RentalBooking(bookingDetails) {
  // console.log(bookingDetails, "here");
  return (
    <>
      <div>
        <p className="text capitalize">
          <strong>trip Type:</strong>
          {bookingDetails.props.tripType}
        </p>
        <p>
          <strong>Starting Location:</strong>
          {bookingDetails.props.tripStartingDestination}
        </p>
        <p>
          <strong>Pickup Date:</strong> {bookingDetails.props.tripPickupdate}
        </p>
        <p>
          <strong>Car Type:</strong> {bookingDetails.props.vehicleName}
        </p>
        <p>
          <strong>KMs Included:</strong> {bookingDetails.props.tripDistance}
        </p>
        <p>
          <strong>Total Fare: </strong>
          {bookingDetails.props.tripTotalFare}
        </p>
      </div>
      <div className="bg-white mt-5 flex justify-between  shadow-md rounded p-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Inclusions</h2>
          <ul>
            <li>Base Fare and Fuel Charges</li>
            <li>Driver Allowance</li>
            <li>GST (18%)</li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-xl  font-semibold mb-4">Exclusion</h2>
          <ul>
            <li>Parking</li>
            <li>State Tax & Toll</li>
            <li>
              after {bookingDetails.props.tripRange} hours extra{" "}
              ₹{bookingDetails.props.vehicleperHour}/hr
            </li>
            <li>
              after {bookingDetails.props.tripDistance} km extra{" "}
              ₹{bookingDetails.props.vehicleperKM}/km
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white mt-5 flex justify-between  shadow-md rounded p-6">
        <div>
          <h2 className="mb-4">Special Notes</h2>
          <ol>
            <li className="text-xs">
              <span className="text-red-800">* </span>The total distance is calculated from pickup point to pickup
              point.
            </li>
            <li className="text-xs">
            <span className="text-red-800">* </span>cancellation must be done before 6 hours prior to pickup time to
              claim refund.
            </li>
            <li className="text-xs"><span className="text-red-800">* </span>cancellation must be done via call.</li>
          </ol>
        </div>
      </div>
    </>
  );
}

export default RentalBooking;
