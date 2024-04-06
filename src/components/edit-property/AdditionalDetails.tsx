"use client";
import { useState, useEffect } from "react";
import { PropertyFormData } from "@/models/PropertyData";
import PropertyImages from "@/models/PropertyData";

import PropertyData from "@/models/PropertyData";
import updateProperty from "@/services/property/updateProperty";
import getPropertyDetail from "@/services/property/getPropertyDetail";

const AdditionalDetails = ({
  setIsChangesExist,
  propId,
}: {
  setIsChangesExist: Function;
  propId: string;
}) => {
  const [originalData, setOriginalData] = useState<PropertyFormData>(
    {} as PropertyFormData
  );
  const [additionalFormData, setAdditionalFormData] =
    useState<PropertyFormData>({} as PropertyFormData);

  useEffect(() => {
    const fetchPropDetail = async () => {
      const propDetail: PropertyData = await getPropertyDetail(propId);
      if (propDetail) {
        console.log(propDetail, "test");
        console.log(originalData, "test ori");
        const img_urls: string[] = propDetail.property_images.map(
          (prop_img: PropertyImages) => prop_img.image_url
        );
        const tmp: PropertyFormData = {
          propertyId: propDetail.property_id,
          address: propDetail.address,
          alley: propDetail.alley,
          bedrooms: propDetail.bedrooms,
          bathrooms: propDetail.bathrooms,
          country: propDetail.country,
          district: propDetail.district,
          floor: propDetail.floor,
          floor_size: propDetail.floor_size,
          floor_size_unit: propDetail.floor_size_unit,
          furnishing: propDetail.furnishing,
          image_urls: img_urls,
          is_occupied: propDetail.renting_property.is_occupied,
          is_sold: propDetail.selling_property.is_sold,
          postal_code: propDetail.postal_code,
          price: propDetail.selling_property.price,
          price_per_month: propDetail.renting_property.price_per_month,
          property_description: propDetail.property_description,
          property_name: propDetail.property_name,
          property_type: propDetail.property_type,
          province: propDetail.province,
          street: propDetail.street,
          sub_district: propDetail.sub_district,
          unit_number: propDetail.unit_number,
        };
        setAdditionalFormData(tmp);
        setOriginalData(tmp);
        console.log(tmp);
      }
    };
    fetchPropDetail();
  }, []);
  return (
    <>
      <div className="large-text m-4 mx-10 my-8 font-bold">
        {" "}
        Additional Details
      </div>
      <div className="flex flex-col lg:flex-row gap-10 px-10">
        <div className="flex flex-col ">
          <div className="medium-text m-4 font-medium">Furnishing</div>
          <div className="m-4  grid w-[550px]  grid-cols-2 gap-4">
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Ready to Move"
                name="furnishing"
                className="invisible "
              ></input>
              <label
                htmlFor="Ready to Move"
                className="small-text inline-block h-full w-full p-3 text-center"
              >
                Ready to Move
              </label>
            </div>
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Fully-Furnished"
                name="furnishing"
                className="invisible "
              ></input>
              <label
                htmlFor="Fully-Furnished"
                className="small-text inline-block h-full w-full p-3 text-center"
              >
                Fully-Furnished
              </label>
            </div>
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Partially-Furnished"
                name="furnishing"
                className="invisible "
              ></input>
              <label
                htmlFor="Partially-Furnished"
                className="small-text inline-block h-full w-full p-3 text-center"
              >
                Partially-Furnished
              </label>
            </div>
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Unfurnished"
                name="furnishing"
                className="invisible "
              ></input>
              <label
                htmlFor="Unfurnished"
                className="small-text inline-block h-full w-full p-3 text-center"
              >
                Unfurnished
              </label>
            </div>
          </div>
          <div className="m-4 grid w-[550px] grid-cols-3  gap-4">
            <div>
              <div className="medium-text m-2 font-medium">Bedrooms</div>
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                required
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
              />
            </div>
            <div>
              <div className="medium-text m-2 font-medium">Bathrooms</div>
              <input
                type="number"
                name="bathrooms"
                placeholder="Bethrooms"
                required
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
              />
            </div>
            <div>
              <div className="medium-text m-2 font-medium">Floor</div>
              <input
                type="number"
                name="floor"
                placeholder="Floor"
                required
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
              />
            </div>
          </div>
          <div className="m-4 grid w-[550px] grid-cols-2  gap-4">
            <div>
              <div className="medium-text m-2 font-medium">Floor Size</div>
              <div className="m-2 flex h-11 flex-row">
                <input
                  type="number"
                  name="floor_size"
                  placeholder="Floor Size"
                  required
                  className=" flex h-full w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                />
                <select className="flex    h-full rounded-lg  bg-ci-light-blue text-white  ">
                  <option
                    value="SQM"
                    className=" h-20 bg-white text-center text-black hover:bg-ci-dark-gray"
                  >
                    Sqm
                  </option>
                  <option
                    value="SQFT"
                    className=" h-20 bg-white text-center text-black hover:bg-ci-dark-gray"
                  >
                    Sqft
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div className="medium-text m-2 font-medium">Unit Number</div>
              <input
                type="number"
                name="unit_number"
                placeholder="Unit Number"
                required
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="medium-text m-4 font-medium">
            Upload Photos of Your Property
          </div>
          <div className="m-4 flex w-full items-center justify-center">
            <label
              htmlFor="photo-upload"
              className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-md bg-ci-gray outline outline-2 outline-ci-dark-gray hover:bg-ci-dark-gray"
            >
              <svg
                className="mb-2 h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-gray-500">Add photos</span>
              <input
                id="photo-upload"
                type="file"
                className="hidden"
                multiple
                // onChange={handlePhotoUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalDetails;
