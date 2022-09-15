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
import axios from "axios";
import { connect } from "react-redux";
/**
 *
 * @author vivek chaudhari
 * @description  Add Nomineee Form
 */

const AddNominee = (props) => {
  const [Nominee_1_Share, Set_Nominee_1_Share] = useState(0);
  const [Nominee_2_Share, Set_Nominee_2_Share] = useState(0);
  const [Nominee_3_Share, Set_Nominee_3_Share] = useState(0);
  const [nominee_relationship, setNominee_Relationship] = useState([]);
  const [showGuardianForm, setShowGuardianForm] = useState(false);
  const [IsMinor, setIsMinor] = useState("no");
  const router = useRouter();

  useEffect(() => {
    // get relationships data for binding to dropdown
    const getRelationships = async () => {
      const { data } = await AxiosInstance.get(
        "/signup/static/nominee/relationships",
        {
          headers: {
            session_id: props.session_id,
          },
        }
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
        birthdate: data.dob.toLocaleDateString(),
        address: data.nominee_address,
        identification_type: "pan",
        identification_no: data.pan_or_aadhar,
        nominee_minor: IsMinor,
        zipcode: "110011",

        nominee_share: 50,
      };
      let Guard_data;
      if (IsMinor === "yes") {
        Guard_data = {
          nominee_guardian_details: {
            guardian_identification_no: data.guard_pan_or_aadhar,
            guardian_dob: data.guard_dob.toLocaleDateString(),
            guardian_identification_type: "pan",
            guardian_name: data.guard_name,
            guardian_address: data.guard_address,
            guardian_relation: data.guard_relationship,
            guardian_zipcode: 110011,
          },
        };
      } else {
        Guard_data = {
          nominee_guardian_details: {},
        };
      }
      const responceObj = Object.assign(nominee_data, Guard_data);

      console.log(nominee_data);
      const PostData = {
        phone: 8369747962,
        nominee_data: [responceObj],
      };
      console.log(PostData);

      const resp = axios.post(
        "https://kyc-stage.ventura1.com/onboarding/v2/signup/user/nominee/add",
        { ...PostData },
        {
          headers: {
            Accept: `application/json`,
            session_id: "82275b0c-9f2c-4c7b-9dc0-1972f4f55064",
          },
        }
      );
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  //  checkAge metod accepts date of birth and Type
  //  for Nominee 'N' and Guardian 'G'
  const checkAge = (date, type) => {
    console.log(date);
    let dob = date.getFullYear();
    let today = new Date().getFullYear();
    console.log(dob);
    console.log(today);
    if (type == "N") {
      if (today - dob < 18) {
        setShowGuardianForm(true);
        setIsMinor("yes");
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
    Set_Nominee_1_Share(share[0]);
    Set_Nominee_2_Share(share[1] - share[0]);
    Set_Nominee_3_Share(100 - share[1]);
  };

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
        <label className="form-label" htmlFor="nomineeName">
        % of nomination
        </label>
        <div className="Sliderwrap">
          <ReactSlider
            className="horizontal_slider"
            thumbClassName="example_thumb"
            trackClassName="example_track"
            defaultValue={[40, 100]}
            ariaLabel={["Leftmost thumb", "Rightmost thumb"]}
            pearling onChange={(val) => { handleInput(val);}}
          />
          <ul className={style.SliderNumWrap}>
            <li className={style.SliderNum}>0</li>
            <li className={style.SliderNum}>|</li>
            <li className={style.SliderNum}>20</li>
            <li className={style.SliderNum}>|</li>
            <li className={style.SliderNum}>40</li>
            <li className={style.SliderNum}>|</li>
            <li className={style.SliderNum}>60</li>
            <li className={style.SliderNum}>|</li>
            <li className={style.SliderNum}>80</li>
            <li className={style.SliderNum}>|</li>
            <li className={style.SliderNum}>100</li>
          </ul>
          <ul className={style.NomineesWrap}>
            <li className={style.Nominees}>
                <p className={style.PerOrange}>{Nominee_1_Share}%</p>
                <p className={style.NomineeNum}>Nominee 1</p>
            </li>
            <li className={style.Nominees}>
                <p className={style.PerBlue}>{Nominee_2_Share}%</p>
                <p className={style.NomineeNum}>Nominee 2</p>
            </li>
            <li className={style.Nominees}>
                <p className={style.PerGreen}>{Nominee_3_Share}%</p>
                <p className={style.NomineeNum}>Nominee 3</p>
            </li>
          </ul>
          <div className={style.SliderTip}>Move the slider to the left or right to <strong>distribute nomination share</strong> between the nominees.
          </div>
        </div>
         

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



const mapStateToProps = (state) => {
console.log(state)
  return {
    session_id: state.LandingReducer.user.session_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(AddNominee);
