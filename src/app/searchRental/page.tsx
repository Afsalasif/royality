'use client'
import React, { useEffect, useState } from "react";
import { roundTripData, roundTripData2 } from "../../../data/vehicleData";
import { useRouter } from "next/navigation";
import { useBooking } from "../../../contexts/Bookingcontext";

type Props = {
  searchParams: SearchParams;
};

type SearchParams = {
  url: string;
  end: string;
  stlc: string;
  phn: string;
  tlt: string;
};

type VehicleData = {
  id: number;
  url: string;
  vehicleName: string;
  vehicleType: string;
  maximumCapacity: number;
  rentPerKm: number;
  rentPerHour: number;
  rentPerDay: number;
  rentper12:number
};

function Page({ searchParams }: Props) {
  const [kilometerData, setKilometerData] = useState<number>(0);
  const [vehicle1, setVehicle1] = useState<VehicleData[]>([]);
  const { setBooking } = useBooking();
  const router = useRouter();

  useEffect(() => {
    getKilometer();
    getVehicle();
  }, []);

  const getVehicle = () => {
    const date = searchParams.end;
    const [day, month, year] = date.split("-").map(Number);
    const fmonth = month + 1;
    if (fmonth > 2 && fmonth < 6) {
      setVehicle1(roundTripData as VehicleData[]);
    } else {
      setVehicle1(roundTripData2 as VehicleData[]);
    }
  };

  const getKilometer = () => {
    if (searchParams.tlt === "8") {
      setKilometerData(80);
    } else {
      setKilometerData(120);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, item: VehicleData) => {
    setBooking({ searchParams, item, kilometerData });
    let a = item.id;
    let str = a.toString()
    const cst = "cst";
    const triptype = 'rental';
    const url = new URL("https://www.a.com");
    url.searchParams.set("cst", cst);
    url.searchParams.set("tttyp", triptype);
    url.searchParams.set("start", searchParams.end);
    url.searchParams.set("stlc", searchParams.stlc);
    url.searchParams.set("phn", searchParams.phn);
    url.searchParams.set("tlt", searchParams.tlt);
    url.searchParams.set("km", kilometerData.toString());
    url.searchParams.set("veid", str);

    router.push(`/booking?url=${url.href}`);
  };

  return (
    <section className="">
      <div className="hidden md:block mx-auto max-w-7xl">
      </div>

      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">Your Trip Results</h1>
        <h3 className="pb-3">
          Dates of trip:
          <span className="italic ml-2">{searchParams.end}</span>
          <hr className="mb-5" />
          <div className="space-y-2 mt-5">
            {vehicle1?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between space-x-0 md:space-x-4 p-5 border rounded-lg"
              >
                <img
                  src={item.url}
                  alt="Car Type"
                  className="w-full md:w-44 h-44 rounded-lg object-contain"
                />
                <div className="flex flex-1 flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-5 justify-between">
                  <div>
                    <h2 className="text-lg font-bold">
                      {item.vehicleName}
                      <span className="text-sm font-extralight"> or similar</span>
                    </h2>
                    <div className="text-gray-700 mt-2">
                      <span className="text-sm">
                        {item.vehicleType} • AC • {item.maximumCapacity} Seats • {kilometerData} kms included
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm space-x-2">
                        <span className="text-gray-700 text-left">Extra km fare</span>
                        <span className="font-bold text-left">
                          ₹{item.rentPerKm}/km after {kilometerData} kms
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm space-x-2">
                        <span className="text-gray-700 text-left">Extra hour fare</span>
                        <span className="font-bold text-left">
                          ₹{item.rentPerHour}/hr after {searchParams.tlt} hours
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm space-x-2">
                        <span className="text-gray-700">Fuel Type</span>
                        <span className="font-bold">any</span>
                      </div>
                      <div className="flex items-center justify-between text-sm space-x-2">
                        <span className="text-gray-700">Cancellation</span>
                        <span className="font-bold text-green-600">Free till 6 hours of departure</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex items-start justify-end space-x-2 text-right">
                    {searchParams.tlt == '8' && (
                      <div className="text-right">
                      <p className="text-2xl font-bold">₹ {item.rentPerDay} / {searchParams.tlt} hr</p>
                      <p className="text-xs">+18% tax</p>
                    </div>
                    )}
                      {searchParams.tlt == '12' && (
                      <div className="text-right">
                      <p className="text-2xl font-bold">₹ {item.rentper12} / {searchParams.tlt} hr</p>
                      <p className="text-xs">+18% tax</p>
                    </div>
                    )}

                      
                    </div>
                    <button className="bg-blue-500 text-white rounded mt-2 py-1 px-4" onClick={(e) => handleButtonClick(e, item)}>
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
