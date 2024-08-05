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
  url: URL;
  dtlc: string;
  end: string;
  stlc: string;
  start: string;
  phn: string;
};

// Function to create date
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // JavaScript months are 0-based
};

// Function to get the price data
const fetchResults = (data: SearchParams) => {
  const dateOne = parseDate(data.start);
  const dateTwo = parseDate(data.end);
  const timeDifference = Math.abs(dateOne.getTime() - dateTwo.getTime());
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24) + 1);
  console.log(daysDifference);
  return daysDifference;
};

function Page({ searchParams }: Props) {
  const [noOfDays, setNoOfDays] = useState(0);
  const [includedDistance, setIncludedDistance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const results = fetchResults(searchParams);
    const distance = results * 100;
    setIncludedDistance(distance);
    setNoOfDays(results);
  }, []);

  if (!searchParams.url) return notFound();

  const calculateRate = (rent) => {
    const rate = noOfDays * rent;
    return rate;
  };

  const handleButtonClick = (e, item) => {
    const cst = "cst";
    const triptype = 'round';
    const url = new URL("https://www.a.com");
    url.searchParams.set("cst", cst);
    url.searchParams.set("start", searchParams.start);
    url.searchParams.set("end", searchParams.end);
    url.searchParams.set("stlc", searchParams.stlc);
    url.searchParams.set("phn", searchParams.phn);
    url.searchParams.set("enlc", searchParams.dtlc);
    url.searchParams.set("distance", includedDistance.toString());
    url.searchParams.set("veid", item.id);

    const newUrl = `/booking?cst=${cst}&end=${searchParams.end}&tttyp=${triptype}&start=${searchParams.start}&stlc=${searchParams.stlc}&phn=${searchParams.phn}&distance=${includedDistance.toString()}&enlc=${searchParams.dtlc}&veid=${item.id}`;
    router.push(newUrl);
  };

  return (
    <section className="">
      <div className="hidden md:block mx-auto max-w-7xl">
        {/* <SearchForm />
        <RentalSearchForm /> */}
      </div>

      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3"> Your Trip Results </h1>
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
                          Free till 6 hour of departure
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex items-start justify-end space-x-2 text-right">
                      <div className="text-right">
                        <p className="text-xs">{noOfDays} Days</p>
                        <p className="text-2xl font-bold">
                          ₹ {calculateRate(item.rentPerDay)}
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
