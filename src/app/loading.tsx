import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
function LoadingResults() {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <p className="text-center animate-pulse font-bold text-[#013b94] pt-10">
          Sit tight - we are finding the best deals for you !!
        </p>
      </div>
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 bg-[#013b94] rounded-full animate-bounce"></div>
      </div>
      <div className="p-5 space-y-2">
        {[...Array(10)].map((_, i)=>(
          <div key={i} className="flex space-x-2 mx-auto max-w-7xl">
              <Skeleton className="h-20 w-20 md:h-44 md:w-44 rounded-lg " />
              <Skeleton className="h-44 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default LoadingResults;
