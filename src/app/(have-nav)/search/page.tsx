"use client";
import PropertyData from "@/models/PropertyData";
import PropertyCards from "@/components/my-listing/PropertyCards";
import Image from "next/image";

import { useEffect, useState } from "react";
import SearchProperty from "@/components/my-listing/SearchProperty";
import getProperties from "@/services/property/getProperties";
import { useSearchContext } from "@/context/SearchContext";

function magic(mn: number | null, mx: number | null, json: string): string {
  let tmp: string = "";

  if (mn === null && mx !== null) {
    tmp = tmp + "," + json + "[lte]:" + mx.toString();
  } else if (mn !== null && mx === null) {
    tmp = tmp + "," + json + "[gte]:" + mn.toString();
  } else if (mn !== null && mx !== null) {
    if (mn !== 0 && mx !== 0) {
      if (mn <= mx) {
        tmp = tmp + "," + json + "[gte]:" + mn.toString();
        tmp = tmp + "," + json + "[lte]:" + mx.toString();
      } else {
        tmp = tmp + "," + json + "[gte]:" + mx.toString();
        tmp = tmp + "," + json + "[lte]:" + mn.toString();
      }
    }
  }
  return tmp;
}

function makeFilterString(searchFilters:any): string {
  const minFloorSize: number | null = searchFilters.minFloorSize;
  const maxFloorSize: number | null = searchFilters.maxFloorSize;
  const minPrice: number | null = searchFilters.minPrice;
  const maxPrice: number | null = searchFilters.maxPrice;
  const numBathrooms: number | null = searchFilters.numBathrooms;
  const numBedrooms: number | null = searchFilters.numBedrooms;
  let filters: string = "";

  filters += magic(minFloorSize, maxFloorSize, "floor_size")+magic(minPrice,maxPrice,"renting_property.price_per_month");

  if(numBathrooms!==null){
    filters += ",bathrooms[eql]:"+numBathrooms.toString()
  }

  if(numBedrooms!==null){
    filters += ",bedrooms[eql]:"+numBedrooms.toString()
  }

  return filters.slice(1);
}

const myFavPage = () => {
  const { searchContent, isSearching, setIsSearching, searchFilters } =
    useSearchContext();

  const [propData, setData] = useState<PropertyData[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [sort,setSortby]  = useState<string>("created_at:desc")
  
  useEffect(() => {
    const fetchProp = async () => {
      const filters:string = makeFilterString(searchFilters.current);
      // console.log(filters,"test filters")
      console.log(sort,"test sort")
      const data = await getProperties(searchContent.current, 20, 1,sort, filters);
      if (data) {
        setData(data.properties);
        setTotal(data.total);
      }

      setIsSearching(false);
    };

    console.log(
      { searchContent, isSearching, setIsSearching, ...searchFilters.current },
      "testing search context"
    );
    fetchProp();
  }, [isSearching,sort]);

  return (
    <>
      <div className="flex w-full justify-center ">
        <SearchProperty></SearchProperty>
      </div>
      {total !== 0 ? (
        <div className="mt-8 flex h-full w-full flex-col items-center ">
          <div className="md:w-[700px] lg:w-[1000px]">
            <PropertyCards
              propData={propData}
              totalProp={total}
              isEditable={false}
              additionaltext="from searching result"
              showAmount={true}
              setSort={setSortby}
            ></PropertyCards>
          </div>
        </div>
      ) : (
        <div className="mx-72 mt-8 flex h-1/2 flex-col items-center justify-around">
          <div className="text-center text-4xl font-bold">
            Property not found
          </div>

          <Image
            src="/img/mylisting/home.svg"
            alt="home"
            width={100}
            height={100}
          />
          <div className="">
            <div className="m-1 text-center text-2xl">
              Your listing is empty.
            </div>
            <div className="m-1 text-center text-2xl">
              Let&apos;s create a property on your listing.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default myFavPage;
