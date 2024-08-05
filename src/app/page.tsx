"use client";
import Image from "next/image";
import { trending_data } from "../../data/trending";
import SearchForm from "@/components/SearchForm";
import { useEffect } from "react";
// fsq3ajd6Za9IssBhVpCKoZ/IVNUvzA6+cAIpHMe3t4OTlUM
export default function Home() {
  useEffect(() => {
    fetch(
      "https://api.foursquare.com/v3/places/search?query=kerala+tourist+destination&near=Kerala",
      {
        method: "GET",
        headers: {
          'Accept': "application/json",
          'Authorization': "fsq3ajd6Za9IssBhVpCKoZ/IVNUvzA6+cAIpHMe3t4OTlUM",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <main className="bg-[#013b94]">
      <section className="mx-auto p-6 max-w-7xl">
        <h2 className="font-bold text-5xl text-white">
          Book your Next Cab here
        </h2>
        <h3 className="text-white py-5 text-xl">
          Search low prices on quality cab bookings
        </h3>
      </section>
      <section className="m-4 mt-0 -mb-14 px-2 lg:px-4">
        {/* {searchForm} */}
        <SearchForm />
      </section>
      <section className="mx-auto max-w-7xl mt-10 p-6 bg-white rounded-t-lg">
        <div className="p-5">
          <h3 className="text-xl font-bold">Trending desinaion</h3>
          <p className="font-light">
            Most popula choices for travellers from around Kerala
          </p>
        </div>

        <div className="flex space-x-4 py-5 overflow-x-scroll">
          {trending_data.map((item) => (
            <div key={item.id} className="shrink-0 cursor-pointer space-y-1">
              <img
                src={item.src}
                alt=""
                className="w-80 h-72 object-cover rounded-lg pb-2"
              />
              <p className="font-bold">{item.title}</p>
              <p className="">{item.location}</p>
              <p className="font-light text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
