"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useReducer, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";

// import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import emailjs from "emailjs-com";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export const formSchema1 = z.object({
  startLocation: z.string().min(1, { message: "enter a adress" }),

  phoneNumber: z
      .string()
      .regex(/^\d+$/, "Mobile number must contain only numbers")
      .min(10, "Mobile number must be at least 10 digits"),
  dates: z.date(),
  timeLimit: z.string().min(1),
});

function RentalSearchForm() {
  const router = useRouter();
  const form1 = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      startLocation: "",
      phoneNumber: "",
      dates: undefined,
      timeLimit: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema1>) =>  {
    console.log(values);
    const starting_day = values.dates.getDate().toString();
    const starting_month = values.dates.getMonth().toString();
    const starting_year = values.dates.getFullYear().toString();

    const cst = "cst";

    const end = `${starting_day}-${starting_month}-${starting_year}`;
    const url = new URL("https://www.a.com");
    url.searchParams.set("cst", cst);

    url.searchParams.set("end", end);
    url.searchParams.set("stlc", values.startLocation);
    url.searchParams.set("phn", values.phoneNumber);
    url.searchParams.set("tlt", values.timeLimit);
   
    try {
      const docRef = await addDoc(collection(db, "Searchednumbers"), values)
      // console.log("Document written with ID: ", docRef.id);
      router.push(`/searchRental?url=${url.href}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
   
  }
  return (
    <Form {...form1}>
      <form
        onSubmit={form1.handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 lg:space-y-0 rounded-lg "
      >
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
            control={form1.control}
            name="startLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex mt-2 ">
                  {" "}
                  Starting Location
                </FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} placeholder="Starting Location" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
            control={form1.control}
            name="dates"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex mt-2 ">
                  {" "}
                  Pickup date
                </FormLabel>
                <FormMessage />
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
            control={form1.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex mt-2">
                  {" "}
                  phone number
                </FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} placeholder="phone number" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
            control={form1.control}
            name="timeLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex mt-2">
                  {" "}
                  Select Rent Duration
                </FormLabel>
                <FormMessage />
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="light" disabled={true}>Light</SelectItem> */}
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="12">12 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-center space-x-2">
          <div className="grid items-center flex-1">
            <Button type="submit" className="bg-blue-500 text-base mt-7 ">
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default RentalSearchForm;
