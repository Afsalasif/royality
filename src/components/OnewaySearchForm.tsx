import React, { useRef, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "./ui/calendar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { format } from "date-fns";

// Spinner component
const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export const formSchema1 = z.object({
  startLocation: z.string().min(1, { message: "Enter an address" }),
  endingLocation: z.string().min(1, { message: "Enter an address" }),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Mobile number must contain only numbers")
    .min(10, "Mobile number must be at least 10 digits"),
  dates: z.date().optional(),
});

type FormSchema = z.infer<typeof formSchema1>;

function OnewaySearchForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Add loading state
  const form1 = useForm<FormSchema>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      startLocation: "",
      endingLocation: "",
      phoneNumber: "",
      dates: undefined,
    },
  });

  const startLocationRef = useRef<HTMLInputElement>(null);
  const endingLocationRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.google) {
      const startAutocomplete = new google.maps.places.Autocomplete(
        startLocationRef.current!
      );
      const endAutocomplete = new google.maps.places.Autocomplete(
        endingLocationRef.current!
      );
      startAutocomplete.addListener("place_changed", () => {
        const place = startAutocomplete.getPlace();
        form1.setValue("startLocation", place.formatted_address || "");
      });

      endAutocomplete.addListener("place_changed", () => {
        const place = endAutocomplete.getPlace();
        form1.setValue("endingLocation", place.formatted_address || "");
      });
    }
  }, [form1]);

  const calculateDistance = (startLocation: string, endingLocation: string) => {
    const service = new google.maps.DistanceMatrixService();
    return new Promise<{ distance: string; duration: string }>((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [startLocation],
          destinations: [endingLocation],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response:any, status:any) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            const result = response.rows[0].elements[0];
            const distance = result.distance?.text || "";
            const duration = result.duration?.text || "";
            resolve({ distance, duration });
          } else {
            reject(new Error("Error fetching distance"));
          }
        }
      );
    });
  };

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    console.log(values);
    setLoading(true); // Set loading to true when submission starts

    try {
      const { distance, duration } = await calculateDistance(
        values.startLocation,
        values.endingLocation
      );

      console.log("Distance:", distance);
      console.log("Duration:", duration);

      const starting_day = values.dates?.getDate().toString() || "";
      const starting_month = (values.dates?.getMonth() || 0 + 1).toString();
      const starting_year = values.dates?.getFullYear().toString() || "";
      const cst = "cst";
      const end = `${starting_day}-${starting_month}-${starting_year}`;

      const url = new URL("https://www.a.com");
      url.searchParams.set("cst", cst);
      url.searchParams.set("end", end);
      url.searchParams.set("stlc", values.startLocation);
      url.searchParams.set("phn", values.phoneNumber);
      url.searchParams.set("enlc", values.endingLocation);
      url.searchParams.set("distance", distance);
      url.searchParams.set("duration", duration);

      await addDoc(collection(db, "Searchedonewaynumbers"), {
        ...values,
        distance,
        duration,
      });

      router.push(`/searchOneway?url=${encodeURIComponent(url.href)}`);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false); // Set loading to false after submission is done
    }
  };

  return (
    <>
      {loading && <Spinner />} {/* Render Spinner component when loading */}
      <Form {...form1}>
        <form
          onSubmit={form1.handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 lg:space-y-0 rounded-lg"
        >
          <div className="grid w-full lg:max-w-sm items-center gap-1.5">
            <FormField
              control={form1.control}
              name="startLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex mt-2">
                    Starting Location
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input {...field} ref={startLocationRef} placeholder="Starting Location" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full lg:max-w-sm items-center gap-1.5">
            <FormField
              control={form1.control}
              name="endingLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex mt-2">
                    Drop Location
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input {...field} ref={endingLocationRef} placeholder="Drop location" />
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
                  <FormLabel className="text-white flex mt-2">Pickup date</FormLabel>
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
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                    Phone number
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input {...field} placeholder="Phone number" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full items-center space-x-2">
            <div className="grid items-center flex-1">
              <Button type="submit" className="bg-blue-500 text-base mt-7">
                Search
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default OnewaySearchForm;
