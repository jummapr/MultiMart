"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetEventsByUserMutation } from "@/redux/features/event/eventApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";

const BestDeal = () => {
  const {eventsForUser} = useSelector((state: any) => state.event)
  const [getEventsByUser, { isError, data, error, isSuccess, isLoading }] =
  useGetEventsByUserMutation();
  const [counter, setCounter] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const bestDealData = {
    name: eventsForUser[1]?.name,
    description: eventsForUser[1]?.description,
    image: eventsForUser[1]?.images[0].url,
    originalPrice: eventsForUser[1]?.originalPrice,
    discountPrice: eventsForUser[1]?.discountPrice,
    start_date: eventsForUser[1]?.start_date,
    finish_date: eventsForUser[1]?.finish_date,
  };


  const fetchedEvent = async() => {
    // @ts-ignore
    await getEventsByUser();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const startDate = new Date(bestDealData.start_date);
      const finishDate = new Date(bestDealData.finish_date);
      const currentDate = new Date();

      if (currentDate >= startDate && currentDate <= finishDate) {
        // @ts-ignore
        const distance = finishDate - currentDate;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCounter({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [bestDealData.start_date, bestDealData.finish_date]);

  console.log("Counter for best deal",counter)

  useEffect(() => {
      fetchedEvent();
  },[])


  return (
    <div>
      <div className="w-full flex justify-between items-center pb-10">
        <h3 className="text-3xl font-semibold">Best Event</h3>
        <Link href={"/bestevent"} className={cn(buttonVariants(), "px-6")}>
          View All
        </Link>
      </div>
      <EventCard data={bestDealData} counter={counter}/>
    </div>
  );
};

export default BestDeal;
