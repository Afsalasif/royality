"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, Fragment } from "react";
import React from "react";
import { Popover, Dialog, Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
const products = [
  {
    name: "hotel",
    description: "get hotel booking",
    href: "/hoform",
    icon: ChevronDownIcon,
  },
  {
    name: "house boat",
    description: "book a house boat ",
    href: "/hoform",
    icon: ChevronDownIcon,
  },
  {
    name: "Tour Packages",
    description: "get to know our tour package",
    href: "/hoform",
    icon: ChevronDownIcon,
  },
  {
    name: "tembo travels",
    description: "get a tembo travels rn",
    href: "/hoform",
    icon: ChevronDownIcon,
  },
  {
    name: "bus",
    description: "get a bus rn",
    href: "/hoform",
    icon: ChevronDownIcon,
  },
];
const callsToAction = [
  { name: "Request a demo", href: "#", icon: ChevronDownIcon },
  { name: "Contact sales", href: "#", icon: ChevronDownIcon },
];
function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <header className="bg-[#013894]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="flex text-white text-3xl ">RP Royality</span>
          </Link>
        </div>
        <div className="flex lg:flex-1">
          {" "}
          <div className="flex flex-col items-center">
            <div className="flex flex-row  text-white">
              <Phone className="m-2" />
              <a className="text-white text-3xl" href="tel:+918086866993">
                {" "}
                +91 8086866993
              </a>
            </div>{" "}
            <p className="text-white font-extralight">
              24 x 7 customer support
            </p>
          </div>{" "}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-cente.r -m-2.5 text-white"
            onClick={() => setMobileMenu(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 ">
          <Popover className="relative">
            <Popover.Button className=" flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              Our Services
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-white"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transtion ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex  h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200">
                        <item.icon
                          className="h-6 w-6 text-[#013b94] group-hover:text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-[#013894]"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-[#013894]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      href={item.href}
                      key={item.name}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#013894] hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 text-[#013b94] flex-none"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenu}
        onClose={setMobileMenu}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#013b94] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span>RP Royality</span>
            </a>
            <button
              className="-m-2.5rounded-md  p-2.5  text-white  "
              onClick={() => setMobileMenu(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="divide-y -my-6 divide-gray-500/10">
              <div className="py-6 space-y-2">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-blue-800">
                        Our Services
                        <ChevronDownIcon
                          className={cn(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-blue-800"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
