"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

export const formSchema1 = z.object({
  startLocation: z.string().min(1, { message: "Enter an address" }),
  endingLocation: z.string().min(1),
  phoneNumber: z
      .string()
      .regex(/^\d+$/, "Mobile number must contain only numbers")
      .min(10, "Mobile number must be at least 10 digits"),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  additionalCities: z.array(z.string().min(1)).optional(),
});

type FormData = z.infer<typeof formSchema1>;

function RoundSearchForm() {
  const router = useRouter();
  const [inputFields, setInputFields] = useState<Array<{ value: string }>>([]);
  const form1 = useForm<FormData>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      startLocation: "",
      endingLocation: "",
      phoneNumber: "",
      dates: {
        from: undefined,
        to: undefined,
      },
      additionalCities: [],
    },
  });

  const handleAddField = () => {
    if (inputFields.length < 5) {
      setInputFields([...inputFields, { value: "" }]);
    } else {
      alert("Maximum of 5 input fields can be added.");
    }
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  const handleRemoveField = (index: number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onSubmit: SubmitHandler<FormData> = (values) => {
    try {
      const starting_day = values.dates.from.getDate().toString();
      const starting_month = (values.dates.from.getMonth() + 1).toString();
      const starting_year = values.dates.from.getFullYear().toString();
      const ending_day = values.dates.to.getDate().toString();
      const ending_month = (values.dates.to.getMonth() + 1).toString();
      const ending_year = values.dates.to.getFullYear().toString();
      const cst = "cst";
      const starting = `${starting_day}-${starting_month}-${starting_year}`;
      const end = `${ending_day}-${ending_month}-${ending_year}`;

      const additionalCities = inputFields.map((input) => input.value).join(",");

      const url = new URL("https://www.a.com");
      url.searchParams.set("cst", cst);
      url.searchParams.set("start", starting);
      url.searchParams.set("end", end);
      url.searchParams.set("stlc", values.startLocation);
      url.searchParams.set("dtlc", values.endingLocation);
      url.searchParams.set("phn", values.phoneNumber);
      if (additionalCities) {
        url.searchParams.set("additionalCities", additionalCities);
      }

      router.push(`/search?url=${url.href}`);
    } catch (error) {
      console.error("Error creating search URL", error);
    }
  };

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
            name="endingLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex mt-2">
                  Drop Location
                </FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} placeholder="Drop location" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <FormField
            control={form1.control}
            name="dates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white flex mt-2">
                  Trip Date
                </FormLabel>
                <FormMessage />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        name="dates"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !field.value?.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value?.from, "LLL dd, y")} -{" "}
                              {format(field.value?.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value?.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      defaultMonth={field.value.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        {inputFields.map((input, index) => (
          <div className="grid w-full lg:max-w-sm items-center gap-1.5 relative" key={index}>
            <FormField
              control={form1.control}
              name={`additionalCities.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex mt-2">
                    Add city
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        value={input.value}
                        onChange={(event) => handleInputChange(index, event)}
                        placeholder={`Input ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveField(index)}
                        className="absolute right-2 top-2 text-red-500"
                      >
                        x
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
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
            <Button
              type="button"
              className="bg-blue-500 text-base mt-7"
              onClick={handleAddField}
            >
              Add city
            </Button>
          </div>
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

export default RoundSearchForm;
