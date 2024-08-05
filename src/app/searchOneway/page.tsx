"use client";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { roundTripData } from "../../../data/vehicleData";
import SearchForm from "@/components/SearchForm";
import RentalSearchForm from "@/components/RentalSearchForm";

type Props = {
  searchParams: SearchParams;
};

type SearchParams = {
  url: string; // Changed from URL to string for easier parsing
  enlc?: string; // Optional, if not always present
  end?: string;
  stlc?: string;
  start?: string;
  phn?: string;
  distance?: string;
  duration?: string;
};

function Page({ searchParams }: Props) {
  const [noOfDays, setNoOfDays] = useState(0);
  const [includedDistance, setIncludedDistance] = useState<number>(0);
  const router = useRouter();
  const [params, setParams] = useState({});

  useEffect(() => {
    if (!searchParams.url) {
      notFound();
      return;
    }

    // Decode the URL
    const decodedUrl = decodeURIComponent(searchParams.url);
    
    // Extract query parameters from the decoded URL string
    const url = new URL(decodedUrl);
    const distance = url.searchParams.get("distance");
    const duration = url.searchParams.get("duration");
    const end = url.searchParams.get("end");
    const stlc = url.searchParams.get("stlc");
    const start = url.searchParams.get("start");
    const phn = url.searchParams.get("phn");
    const enlc = url.searchParams.get("enlc");

    // Set the included distance if available
    if (distance) {
      setIncludedDistance(parseFloat(distance));
    }

    // Store all parameters in state
    setParams({ end, stlc, start, phn, enlc, distance, duration });

    // If the URL params are expected to be present, set the other states accordingly
    console.log(searchParams);
  }, [searchParams.url]);

  const calculateRate = (rentPerkm: number, minimumOneway: number) => {
    if (includedDistance < 30) {
      return minimumOneway;
    } else {
      const balance = includedDistance - 30;
      console.log(balance);
      const rate = (balance * rentPerkm) + minimumOneway;
      const roundedRate = Math.ceil(rate);
      return roundedRate;
    }
  };

  const handleButtonClick = (e, item) => {
    const cst = "cst";
    const triptype ='oneWay'
    const url = new URL("https://www.a.com");
    url.searchParams.set("cst", cst);
    url.searchParams.set("start", params.end);
    url.searchParams.set("stlc", params.stlc);
    url.searchParams.set("phn", params.phn);
    url.searchParams.set("enlc", params.enlc);
    url.searchParams.set("distance", includedDistance.toString());
    url.searchParams.set("duration", params.duration);
    url.searchParams.set("veid", item.id);

    const newUrl = `/booking?cst=${cst}&start=${params.end}&tttyp=${triptype}&stlc=${params.stlc}&phn=${params.phn}&enlc=${params.enlc}&distance=${includedDistance}&duration=${params.duration}&veid=${item.id}`;
    router.push(newUrl);
  };

  return (
    <section>
      <div className="hidden md:block mx-auto max-w-7xl">
        {/* Additional content or layout */}
      </div>

      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">Your Trip Results</h1>
        <h3 className="pb-3">
          Dates of trip:
          <span className="italic ml-2">
            {searchParams.start} to {searchParams.end}
          </span>
          <hr className="mb-5" />
          <div className="space-y-2 mt-5">
            {roundTripData.map((item) => (
              <div
                key={item.vehicleName}
                className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between md:space-x-4 p-5 border rounded-lg"
              >
                <img
                  src={item.url}
                  alt="Car Type"
                  className="w-full md:w-44 h-44 rounded-lg object-contain"
                />
                <div className="flex flex-col md:flex-row flex-1 space-y-4 md:space-y-0 md:space-x-5 justify-between">
                  <div>
                    <h2 className="text-lg font-bold">
                      {item.vehicleName}{" "}
                      <span className="text-sm font-extralight">or similar</span>
                    </h2>
                    <div className="text-gray-700 mt-2">
                      <span className="text-sm">
                        {item.vehicleType} • AC • {item.maximumCapacity} Seats •{" "}
                        {includedDistance} kms included
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm space-x-2">
                        <span className="text-gray-700">Extra km fare</span>
                        <span className="font-bold">
                          ₹{item.rentPerKm}/km after {includedDistance} kms
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm space-x-2">
                        <span className="text-gray-700">Fuel Type</span>
                        <span className="font-bold">any</span>
                      </div>
                      <div className="flex items-center justify-between text-sm space-x-2">
                        <span className="text-gray-700">Cancellation</span>
                        <span className="font-bold text-green-600">
                          Free till 6 hours of departure
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex items-start justify-end space-x-2 text-right">
                      <div className="text-right">
                        <p className="text-xs">{noOfDays} Days</p>
                        <p className="text-2xl font-bold">
                          ₹ {calculateRate(item.rentPerKm, item.minumumOneway)}
                        </p>
                        <p className="text-xs">+18% tax</p>
                      </div>
                    </div>
                    <button
                      className="bg-blue-500 text-white rounded mt-2 py-1 px-4"
                      onClick={(e) => handleButtonClick(e, item)}
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </h3>
      </div>
    </section>
  );
}

export default Page;
