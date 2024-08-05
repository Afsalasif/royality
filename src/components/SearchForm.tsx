"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useReducer, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnewaySearchForm from "./OnewaySearchForm";
import RoundSearchForm from "./RoundSearchForm";
import RentalSearchForm from "./RentalSearchForm";




// starting of page
function SearchForm() {
  return (
    <>
      <Tabs defaultValue="oneWay" className="items-center">
        <TabsList className="flex flex-row max-w-60 mx-auto items-center justify-center space-x-0 lg:space-x-2 lg:space-y-0 rounded-lg ">
          <TabsTrigger value="oneWay">Oneway</TabsTrigger>
          <TabsTrigger value="round">Round</TabsTrigger>
          <TabsTrigger value="rental">Rental</TabsTrigger>
        </TabsList>
        <TabsContent value="oneWay">
          <OnewaySearchForm />
        </TabsContent>
        <TabsContent value="round">
          <RoundSearchForm />
        </TabsContent>
        <TabsContent value="rental">
          <RentalSearchForm />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default SearchForm;
