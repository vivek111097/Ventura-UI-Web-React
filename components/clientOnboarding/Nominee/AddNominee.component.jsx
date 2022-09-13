import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getRelationships } from "../../../Api/user";
import AxiosInstance from "./../../../Api/Axios/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Nominee.module.css";
import { validatePANOrAddhar } from "../../validation/validation";
import ButtonUI from "../../ui/Button.component";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

const AddNominee = () => {
  const [nominee_relationship, setNominee_Relationship] = useState([]);
  const [showGuardianForm, setShowGuardianForm] = useState(false);
  const router = useRouter();

  const schema = yup.object({
    nominee_name: yup.string().required(),
    // relationship: "",
    //   nominee_name: "",
    //   dob: null,
    //   nominee_address: "",
    //   pan_or_aadhar: "",
    //   guard_relationship: "",
    //   guard_name:"",
    //   guard_dob:null,
    //   guard_pan_or_aadhar:"",
    //   guard_address:""
  });

  useEffect(() => {
    const getRelationships = async () => {
      const { data } = await AxiosInstance.get("/relationships");
      setNominee_Relationship(data);
      console.log(data);
    };
    getRelationships();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  const checkAge = () => {
    let dob = new Date(watch("dob")).getFullYear();
    let today = new Date().getFullYear();
    today - dob < 18 ? setShowGuardianForm(true) : setShowGuardianForm(false);
    console.log(today);
    console.log(dob);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}

      <div className={style.formContainer}>
        <h2 className="title">Add nominee 1</h2>

        <label className="form-label" htmlFor="relationshipWithNominee">
          Relationship with nominee
        </label>
        <select
          id="relationshipWithNominee"
          className="form-control"
          {...register("relationship")}
        >
          {nominee_relationship.map((relation, index) => (
            <option key={index} value={relation}>
              {relation}
            </option>
          ))}
        </select>

        <label className="form-label" htmlFor="nomineeName">
          Nominee name
        </label>
        <input
          id="nomineeName"
          className="form-control"
          {...register("nominee_name")}
        />

        <label className="form-label" htmlFor="nomineeName">
          Nominee's PAN/Aadhaar number
        </label>

        <input
          type="text"
          className="form-control"
          maxLength={16}
          {...register("pan_or_aadhar", {
            required: "PAN Number or Aadhaar Number is required",
            validate: validatePANOrAddhar,
          })}
          onKeyUp={(e) => {
            trigger("pan_or_aadhar");
          }}
        />

        <label className="form-label" htmlFor="nomineeName">
          Nominee's Address
        </label>
        <textarea
          style={{ height: 60 }}
          id="nominee_address"
          className="form-control"
          {...register("nominee_address")}
        />

        <label className="form-label" htmlFor="dobNominee1">
          Date of birth
        </label>
        <Controller
          control={control}
          name="dob"
          render={({ field }) => (
            <DatePicker
              className="form-control"
              placeholderText="Select date"
              onChange={(date) => {
                field.onChange(date);
                checkAge();
              }}
              selected={field.value}
              showPopperArrow={false}
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={35}
              scrollableYearDropdown
              popperClassName="datepicker"
              popperPlacement="top-start"
              popperModifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, -20],
                  },
                },
                {
                  name: "preventOverflow",
                  options: {
                    rootBoundary: "viewport",
                    tether: false,
                    altAxis: true,
                  },
                },
              ]}
            />
          )}
        />

        {/* Guardian's detail required in case of nominee is minor  */}
        {showGuardianForm && (
          <div className={style.guardContainer}>
            <label className="form-label" htmlFor="nomineeName">
              Name of nominee guardian
            </label>
            <input
              id="guardianName"
              className="form-control"
              {...register("guard_name")}
            />

            <label className="form-label" htmlFor="relationshipWithNominee">
              Guardian's relationship with nominee
            </label>
            <select
              className="form-control"
              {...register("guard_relationship")}
            >
              {nominee_relationship.map((relation, index) => (
                <option key={index} value={relation}>
                  {relation}
                </option>
              ))}
            </select>

            <label className="form-label" htmlFor="dobNominee1">
              Guardian's date of birth
            </label>
            {/* <Controller
              control={control}
              name="guard_dob"
              render={({ field }) => (
                <DatePicker
                  className="form-control"
                  placeholderText="Select date"
                  showYearPicker
                  onChange={(date) => {
                    field.onChange(date);
                    checkAge();
                  }}
                  selected={field.value}
                  showPopperArrow={false}
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  yearDropdownItemNumber={35}
                  scrollableYearDropdown
                  // popperContainer={ }
                  popperClassName="datepicker"
                  popperPlacement="top-start"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [0, -20],
                      },
                    },
                    {
                      name: "preventOverflow",
                      options: {
                        rootBoundary: "viewport",
                        tether: false,
                        altAxis: true,
                      },
                    },
                  ]}
                />
              )}
            /> */}

            <Controller
              control={control}
              name="guard_dob"
              render={({ field }) => (
                <DatePicker
                  className="form-control"
                  placeholderText="Select date"
                  onChange={(date) => {
                    field.onChange(date);
                    checkAge();
                  }}
                  selected={field.value}
                  showPopperArrow={false}
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  yearDropdownItemNumber={35}
                  scrollableYearDropdown
                  popperClassName="datepicker"
                  popperPlacement="top-start"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [0, -20],
                      },
                    },
                    {
                      name: "preventOverflow",
                      options: {
                        rootBoundary: "viewport",
                        tether: false,
                        altAxis: true,
                      },
                    },
                  ]}
                />
              )}
            />

            <label className="form-label" htmlFor="nomineeName">
              Guardian's PAN/Aadhaar number
            </label>

            <input
              type="text"
              className="form-control"
              maxLength={16}
              {...register("guard_pan_or_aadhar", {
                required: "PAN Number or Address is required",
                validate: validatePANOrAddhar,
              })}
              onKeyUp={(e) => {
                trigger("guard_pan_or_aadhar");
              }}
            />

            <label className="form-label" htmlFor="nomineeName">
              Guardian's Address
            </label>
            <textarea
              style={{ height: 60 }}
              id="nomineeName"
              className="form-control"
              {...register("guard_address")}
            />
          </div>
        )}
        {/* disabled */}
        <ButtonUI
          type="submit"
          onClick={() => router.push("/co/nominee/nomineelist")}
        >
          Add Nominee
        </ButtonUI>
      </div>
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
    </form>
  );
};

export default AddNominee;
