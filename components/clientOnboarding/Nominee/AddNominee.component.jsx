/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./../../../Api/Axios/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Nominee.module.css";
import { validatePANOrAddhar } from "../../validation/Validation";
import ButtonUI from "../../ui/Button.component";
import { useRouter } from "next/router";
import ReactSlider from "react-slider";
import axios from "axios";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  const [selected_Document, setSelectedDocument] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // get relationships data for binding to dropdown
    const getRelationships = async () => {
      const { data } = await AxiosInstance.get(
        "/signup/static/nominee/relationships",
        {
          headers: {
            // session_id: props.session_id,
            session_id: "7f6042b8-bb43-47cd-b326-68ceb1e446c9",
          },
        }
      );
      setNominee_Relationship(data.relationships);
    };
    // const allreadyExistedNomineeData = async () => {
    //   const { data } = await axios.get("http://localhost:3001/nominee");
    //   console.log(data);
    //   console.log(data.nominee_data.length);
    // };
    getRelationships();
    // allreadyExistedNomineeData();
    let lineItem = document.querySelectorAll(".animate__animated");
    lineItem.forEach((item, index) => {
      item.className += " animate__fadeInUp animate__delay_" + index;
    });
  }, [props.session_id]);

  let validationObject = {
    relationship: yup.string().required(),
    nominee_name: yup.string().required(),
    dob: yup.string().required(),
    nominee_address: yup.string().required(),
    pan_or_aadhar: yup.string().required(),
  };
  const guar_validation = {
    guard_relationship: yup.string().required(),
    guard_name: yup.string().required(),
    guard_dob: yup.string().required(),
    guard_pan_or_aadhar: yup.string().required(),
    guard_address: yup.string().required(),
  };
  if (IsMinor === "yes") {
    validationObject = Object.assign(validationObject, guar_validation);
  } else {
    validationObject = Object.assign(validationObject);
  }
  const NomineeSchema = yup.object().shape(validationObject);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isDirty },
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      relationship: "Select Relationship",
      nominee_name: "",
      dob: null,
      nominee_address: "",
      pan_or_aadhar: "",
      guard_relationship: "Select Relationship",
      guard_name: "",
      guard_dob: null,
      guard_pan_or_aadhar: "",
      guard_address: "",
    },
    resolver: yupResolver(NomineeSchema),
  });

  const onSubmit = async (data) => {
    try {
      let nominee_data = {
        name: data.nominee_name,
        relation: data.relationship,
        // birthdate: new Date(data.dob).toLocaleDateString(),
        // birthdate: new Date().toLocaleDateString("es-CL").replace(/-/g, "/").toString(),
        birthdate: "1/2/2022",
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
            // guardian_dob: data.guard_dob.toLocaleDateString(),
            guardian_dob: "1/2/1956",
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

      const PostData = {
        phone: 8369747962,
        nominee_data: [responceObj],
      };
      console.log(PostData);

      const resp = await axios.post(
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

  // const handel_Add_nominee=()=>{
  //   // router.push("/co/nominee/nomineelist")
  // }

  //  checkAge metod accepts date of birth and Type
  //  for Nominee 'N' and Guardian 'G'
  const checkAge = (date, type) => {
    let dob = date.getFullYear();
    let today = new Date().getFullYear();

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
        <h2 className="title animate__animated">Add nominee 1</h2>

        <div className={`animate__animated ${style.inputWrap}`}>
          <label className="form-label" htmlFor="relationshipWithNominee">
            Relationship with nominee
          </label>
          <select
            id="relationshipWithNominee"
            className="form-control"
            {...register("relationship")}
          >
            <option disabled>Select Relationship</option>
            {nominee_relationship.map((relation, index) => (
              <option key={index} value={relation}>
                {relation}
              </option>
            ))}
          </select>
        </div>
        <div className={`animate__animated ${style.inputWrap}`}>
          <label className="form-label" htmlFor="nomineeName">
            Nominee name
          </label>
          <input
            id="nomineeName"
            className="form-control"
            {...register("nominee_name")}
          />
        </div>
        <div className={`animate__animated ${style.inputWrap}`}>
          <label className="form-label" htmlFor="nomineeName">
            Nominee's PAN/Aadhaar number
          </label>

          <input
            type="text"
            className="form-control"
            maxLength={selected_Document === "A" ? 12 : 10}
            {...register("pan_or_aadhar", {
              required: "PAN Number or Aadhaar Number is required",
              // validate: validatePANOrAddhar,
            })}
            onKeyUp={(e) => {
              const msg = validatePANOrAddhar(e.target.value);
              setSelectedDocument(msg.type);
              trigger("pan_or_aadhar");
              setValue("pan_or_aadhar",e.target.value.replace(/[^a-z0-9]/gi, "").toLocaleUpperCase()
              );
            }}
          />
        </div>
        <div className={`animate__animated ${style.inputWrap}`}>
          <label className="form-label" htmlFor="nomineeName">
            Nominee's Address
          </label>
          <textarea
            style={{ height: 60, resize: "none" }}
            id="nominee_address"
            className="form-control"
            {...register("nominee_address")}
          />
        </div>
        <div className={`animate__animated ${style.inputWrap}`}>
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
        </div>
        <div className={`animate__animated ${style.inputWrap}`}>
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
              pearling
              onChange={(val) => {
                handleInput(val);
              }}
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
            <div className={style.SliderTip}>
              Move the slider to the left or right to{" "}
              <strong>distribute nomination share</strong> between the nominees.
            </div>
          </div>
        </div>

        {/* Guardian's detail required in case of nominee is minor  */}
        {showGuardianForm ? (
          <div className={style.guardContainer}>
            <label className="form-label" htmlFor="nomineeName">
              Name of nominee guardian
            </label>
            {showGuardianForm && (
              <input
                id="guardianName"
                className="form-control"
                {...register("guard_name")}
              />
            )}

            <label className="form-label" htmlFor="relationshipWithNominee">
              Guardian's relationship with nominee
            </label>
            <select
              className="form-control"
              {...register("guard_relationship")}
            >
              <option disabled>Select Relationship</option>
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
              })}
              onKeyUp={(e) => {
                trigger("guard_pan_or_aadhar");
                const msg = validatePANOrAddhar(e.target.value);
                setSelectedDocument(msg.type);
                setValue(
                  "guard_pan_or_aadhar",
                  e.target.value.toLocaleUpperCase()
                );
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
        ) : null}
        {/* disabled untile complate form validation */}

        <div className="animate__animated">
          <ButtonUI type="submit" disabled={!isDirty || !isValid}>
            Add Nominee
          </ButtonUI>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    session_id: state.LandingReducer.user.session_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNominee);
