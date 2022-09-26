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
import NomineeList from "./NomineeList.component";
/**
 *
 * @author vivek chaudhari
 * @description  Add Nomineee Form
 */

const AddNominee = (props) => {
  // maximum nominee count can be configoured from environment veriable
  const Max_Nominee_Count = 3;

  // slider % of nominee shares
  const [Nominee_1_Share, Set_Nominee_1_Share] = useState(0);
  const [Nominee_2_Share, Set_Nominee_2_Share] = useState(0);
  const [Nominee_3_Share, Set_Nominee_3_Share] = useState(0);

  // for storing relationships that allow to add (comming form APi)
  const [nominee_relationship, setNominee_Relationship] = useState([]);

  // for hide and show guardian form (only show in case nominee's age < 18)
  const [showGuardianForm, setShowGuardianForm] = useState(false);

  // for checking nominee is 18+ or not
  const [IsMinor, setIsMinor] = useState("no");

  //for indentifying selected Document for verifaction ex- pan card or aadhar card
  const [selected_Document, setSelectedDocument] = useState(null);

  //for allready added nominee count which will get from nominee list api
  const [nominee_Count, Setnominee_Count] = useState(0); // All ready added comming from get

  // for custom Pan or aadhar validation if error button disabled
  const [isError, setError] = useState(true);

  const [addedNominee, setaddedNominee] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // get relationships data for binding to dropdown
    const getRelationships = async () => {
      const { data } = await AxiosInstance.get(
        "/signup/static/nominee/relationships",
        {
          headers: {
            //  session_id: props.session_id,
            session_id: "82275b0c-9f2c-4c7b-9dc0-1972f4f55064",
          },
        }
      );
      setNominee_Relationship(data.relationships);
    };
    // get allready added nominees data
    const allreadyExistedNomineeData = async () => {
      const { data } = await AxiosInstance.post(
        "/signup/user/nominee/details",
        { phone: 8369747962 },

        // {phone: props.phone },
        {
          headers: {
            session_id: props.session_id,
            // session_id: "82275b0c-9f2c-4c7b-9dc0-1972f4f55064",
          },
        }
      );
      const added_nomineeCount = data.nominee_data.length;
      console.log(data.nominee_data);
      Setnominee_Count(data.nominee_data.length);
      setaddedNominee(data.nominee_data);

      switch (added_nomineeCount) {
        case 1:
          Set_Nominee_1_Share(data.nominee_data[0].nominee_share);
          Set_Nominee_2_Share(100 - data.nominee_data[0].nominee_share);
          break;
        case 2:
          Set_Nominee_1_Share(data.nominee_data[0]);
          Set_Nominee_2_Share(data.nominee_data[1] - data.nominee_data[0]);
          Set_Nominee_3_Share(100 - data.nominee_data[1]);
          break;
      }
      // console.log(`Nominee Allready Added`, data.nominee_data.length);
      // console.log(
      //   `Nominee Count Left`,
      //   Max_Nominee_Count - data.nominee_data.length
      // );
    };
    getRelationships();
    allreadyExistedNomineeData();

    // for animation of fields
    let lineItem = document.querySelectorAll(".animate__animated");
    lineItem.forEach((item, index) => {
      item.className += " animate__fadeInUp animate__delay_" + index;
    });
  }, [props.session_id]);

  // const Share_Percentage_Indicator = () => {
  let Indicator_Array = [];
  switch (nominee_Count) {
    case 0:
      Indicator_Array.push(
        <ul key={1} className={style.NomineesWrap}>
          <li className={style.Nominees}>
            <p className={style.PerOrange}>{Nominee_1_Share}%</p>
            <p className={style.NomineeNum}>Nominee 1</p>
          </li>
        </ul>
      );
      break;
    case 1:
      Indicator_Array.push(
        <ul key={2} className={style.NomineesWrap}>
          <li className={style.Nominees}>
            <p className={style.PerOrange}>{Nominee_1_Share}%</p>
            <p className={style.NomineeNum}>Nominee 1</p>
          </li>
          ,
          <li className={style.Nominees}>
            <p className={style.PerBlue}>{Nominee_2_Share}%</p>
            <p className={style.NomineeNum}>Nominee 2</p>
          </li>
        </ul>
      );
      break;
    case 2:
      Indicator_Array.push(
        <ul key={3} className={style.NomineesWrap}>
          <li className={style.Nominees}>
            <p className={style.PerOrange}>{Nominee_1_Share}%</p>
            <p className={style.NomineeNum}>Nominee 1</p>
          </li>
          ,
          <li className={style.Nominees}>
            <p className={style.PerBlue}>{Nominee_2_Share}%</p>
            <p className={style.NomineeNum}>Nominee 2</p>
          </li>
          ,
          <li className={style.Nominees}>
            <p className={style.PerGreen}>{Nominee_3_Share}%</p>
            <p className={style.NomineeNum}>Nominee 3</p>
          </li>
        </ul>
      );
      break;
  }
  // };

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

  // if nominee is monior then we need to validate nominee detail as well as guardian detail.else only validate nominee detail
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
    // try {
    
    // here we are using nominnecount+1 beacuse of each time new nominee added hence privious nominee count + 1 
    const count_Interpolation = `Nominee_${nominee_Count+1}_Share`;
    let nominee_data = {
      name: data.nominee_name,
      relation: data.relationship,
      birthdate: new Date(data.dob)
        .toLocaleDateString("es-CL")
        .replace(/-/g, "/")
        .toString(),
      address: data.nominee_address,
      identification_type: selected_Document == "A" ? "aadhar" : "pan",
      identification_no: data.pan_or_aadhar,
      nominee_minor: IsMinor,

      zipcode: "110011",
      nominee_share: eval(count_Interpolation),
    };
    let Guard_data;
    if (IsMinor === "yes") {
      Guard_data = {
        nominee_guardian_details: {
          guardian_identification_no: data.guard_pan_or_aadhar,
          // guardian_dob: data.guard_dob.toLocaleDateString(),
          guardian_dob: new Date(data.guard_dob)
            .toLocaleDateString("es-CL")
            .replace(/-/g, "/")
            .toString(),
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

    if (nominee_Count !== 0 && addedNominee.length !== 0) {
      // here we are changing privious store nominee share data
      // addedNominee store all nominee data that allready added by user and index is used since index start with 0 we hence adding index + 1
      addedNominee.map((nominee, index) => {
        const nomineeCountInterpolation = `Nominee_${index + 1}_Share`;
        
        nominee.nominee_share = eval(nomineeCountInterpolation);
      });
    }

    const PostData = {
      phone: 8369747962,
      // phone: props.phone,
      nominee_data: [...addedNominee, responceObj],
    };
    console.log(PostData);

    const resp = await AxiosInstance.post(
      "signup/user/nominee/add",
      { ...PostData },
      {
        headers: {
          Accept: `application/json`,
          // session_id: props.session_id,
          session_id: "681fa8ba-dc02-4ec0-9306-5b170be2e353",
        },
      }
    );
    console.log(resp);
    if (resp.status == 200) {
      router.push("/co/nominee/nomineelist");
    }



    // } catch (e) {
    //   console.log(e);
    // }
  };


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
  const handleInput = (share, Number_Of_nominee_Allready_Exist) => {
    //console.log(share);

    if (Number_Of_nominee_Allready_Exist == 0) {
      Set_Nominee_1_Share(share[0]);
    } else if (Number_Of_nominee_Allready_Exist == 1) {
      Set_Nominee_1_Share(share);
      Set_Nominee_2_Share(100 - share);
    } else {
      Set_Nominee_1_Share(share[0]);
      Set_Nominee_2_Share(share[1] - share[0]);
      Set_Nominee_3_Share(100 - share[1]);
    }
  };

  const AddNomineeForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.formContainer}>
        <h2 className="title animate__animated">
          Add nominee {nominee_Count + 1}
        </h2>

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
            onChange={(e) => {
              const msg = validatePANOrAddhar(e.target.value);
              setSelectedDocument(msg.type);
              trigger("pan_or_aadhar");
              msg.valid ? setError(false) : setError(true);
              setValue(
                "pan_or_aadhar",
                e.target.value.replace(/[^a-z0-9]/gi, "").toLocaleUpperCase()
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
                yearDropdownItemNumber={100}
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
            {nominee_Count == 0 && (
              <ReactSlider
                className="horizontal_slider"
                thumbClassName="example_thumb"
                trackClassName="example_track"
                defaultValue={100}
                disabled
                ariaLabel={["Rightmost thumb"]}
                pearling
              />
            )}

            {nominee_Count == 1 && (
              <ReactSlider
                className="horizontal_slider"
                thumbClassName="example_thumb"
                trackClassName="example_track"
                defaultValue={50}
                pearling
                onChange={(val) => handleInput(val, nominee_Count)}
              />
            )}

            {nominee_Count == 2 && (
              <ReactSlider
                className="horizontal_slider"
                thumbClassName="example_thumb"
                trackClassName="example_track"
                defaultValue={[40, 20]}
                ariaLabel={["Leftmost thumb", "Rightmost thumb"]}
                pearling
                onChange={(val) => {
                  handleInput(val);
                }}
              />
            )}
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

            {Indicator_Array}
            

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
                  yearItemNumber={100}
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
              onChange={(e) => {
                trigger("guard_pan_or_aadhar");
                const msg = validatePANOrAddhar(e.target.value);
                setSelectedDocument(msg.type);
                msg.valid ? setError(false) : setError(true);
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
          <ButtonUI type="submit" disabled={!isDirty || !isValid || isError}>
            Add Nominee
          </ButtonUI>
        </div>
      </div>
    </form>
  );

  return nominee_Count == Max_Nominee_Count ? <NomineeList /> : AddNomineeForm;
};

const mapStateToProps = (state) => {
  return {
    phone: state.LandingReducer.user.phone,
    session_id: state.LandingReducer.user.session_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNominee);
