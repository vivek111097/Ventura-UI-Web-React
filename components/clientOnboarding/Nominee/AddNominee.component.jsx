import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./../../../Api/Axios/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Nominee.module.css";
import { validatePANOrAddhar } from "../../validation/validation";
import ButtonUI from "../../ui/Button.component";
import { useRouter } from "next/router";
import ReactSlider from "react-slider";
/**
 *
 * @author vivek chaudhari
 * @description  Add Nomineee Form
 */

const AddNominee = () => {
  const [Nominee_1_Share,Set_Nominee_1_Share] = useState(0);
  const [Nominee_2_Share,Set_Nominee_2_Share] = useState(0);
  const [Nominee_3_Share,Set_Nominee_3_Share] = useState(0);
  const [nominee_relationship, setNominee_Relationship] = useState([]);
  const [showGuardianForm, setShowGuardianForm] = useState(false);
  const [IsMinor, setIsMinor] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // get relationships data for binding to dropdown
    const getRelationships = async () => {
      const { data } = await AxiosInstance.get(
        "/signup/static/nominee/relationships"
      );
      setNominee_Relationship(data.relationships);
    };
    getRelationships();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      relationship: "",
      nominee_name: "",
      dob: null,
      nominee_address: "",
      pan_or_aadhar: "",
      guard_relationship: "",
      guard_name: "",
      guard_dob: null,
      guard_pan_or_aadhar: "",
      guard_address: "",
    },
  });
  const onSubmit = (data) => {
    try {
      let nominee_data = {
        name: data.nominee_name,
        relation: data.relationship,
        birthdate: data.dob,
        address: data.nominee_address,
        identification_type: "pan",
        identification_no: data.pan_or_aadhar,
        nominee_minor: IsMinor,
        zipcode: "110011",
        nominee_guardian_details: {
          guardian_identification_no: data.guard_pan_or_aadhar,
          guardian_dob: data.guard_dob,
          guardian_identification_type: "pan",
          guardian_name: data.guard_name,
          guardian_address: data.guard_address,
          guardian_relation: data.guard_relationship,
          guardian_zipcode: 110011,
        },
        nominee_share: 50,
      };
      console.log(nominee_data);
      const PostData = {
        phone: 8369747962,
        nominee_data: [nominee_data],
      };
      console.log(PostData);
      const resp = AxiosInstance.post("/signup/user/nominee/add", {
        PostData,
      });
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  //  checkAge metod accepts date of birth and Type
  //  for Nominee 'N' and Guardian 'G'
  const checkAge = (date, type) => {
    let dob = new Date(date).getFullYear();
    let today = new Date().getFullYear();
    if (type == "N") {
      if (today - dob < 18) {
        setShowGuardianForm(true);
        setIsMinor(true);
      } else {
        setShowGuardianForm(false);
      }
    } else if (type == "G") {
      if (today - dob < 18) {
        console.log("Guardian's age should be greter than 18");
      }
    }
  };
  const handleInput = (share) => {
    Set_Nominee_1_Share(share[0])
    Set_Nominee_2_Share(share[1] - share[0])
    Set_Nominee_3_Share(100 - share[1])
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          onKeyUp={() => {
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
                checkAge(date, "N");
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

        <ReactSlider
          className={style.horizontal_slider}
          thumbClassName={style.example_thumb}
          trackClassName={style.example_track}
          defaultValue={[40, 100]}
          ariaLabel={["Leftmost thumb", "Rightmost thumb"]}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          pearling
          onChange={(val) => {
            handleInput(val);
          }}
        />
        <p>Nominee 1 : {Nominee_1_Share}%</p>
        <p>Nominee 2 : {Nominee_2_Share}%</p>
        <p>Nominee 3 : {Nominee_3_Share}%</p>

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

            <Controller
              control={control}
              name="guard_dob"
              render={({ field }) => (
                <DatePicker
                  className="form-control"
                  placeholderText="Select date"
                  onChange={(date) => {
                    field.onChange(date);
                    checkAge(date, "G");
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
        {/* disabled untile complate form validation */}
        <ButtonUI
          type="submit"
          onClick={() => router.push("/co/nominee/nomineelist")}
        >
          Add Nominee
        </ButtonUI>
      </div>
      {errors.exampleRequired && <span>This field is required</span>}
    </form>
  );
};

export default AddNominee;
