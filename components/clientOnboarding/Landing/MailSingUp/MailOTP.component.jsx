import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import ButtonUI from '../../../ui/Button.component';


const MailOTP = (props) => {
    const { session, phone } = props;
    console.log(session);
    const {
      register,
      trigger,
      setValue,
  
      handleSubmit,
      formState: { errors ,isDirty,isValid},
    } = useForm();

    const router = useRouter();

    // Getting All OTP Element From Input 
    function getCodeBoxElement(index) {
      return document.getElementById("codeBox" + index);
    }

    // OnKeyUp Function 
    function onKeyUpEvent(index, event) {
      const eventCode = event.which || event.keyCode;
      if (getCodeBoxElement(index).value.length === 1) {
        if (index !== 6) {
          getCodeBoxElement(index + 1).focus();
        } else {
          // var ele = document.getElementById("codeBox" + index)
          // for (var p of Array.from(ele)) {
          //   console.log(p)
          //   console.log("hello")
          //   }
        }
      }
      if (eventCode === 8 && index !== 1) {
        getCodeBoxElement(index - 1).focus();
      }
    }

    // OnFocus Event
    function onFocusEvent(index) {
      for (let item = 1; item < index; item++) {
        const currentElement = getCodeBoxElement(item);
        if (!currentElement.value) {
          currentElement.focus();
          break;
        }
      }
    }

    
// Handling THe Form on Submit Using Async Await
    const onSubmit = async (data) => {

      // Destructuring All the Input 
      const { codeBox1, codeBox2, codeBox3, codeBox4 , codeBox5, codeBox6 } = data;

      // Storing all input in one variable 
      const otp = `${codeBox1}${codeBox2}${codeBox3}${codeBox4}${codeBox5}${codeBox6}`;
      try {
        console.log(data.otp);
        const getData = await fetch(
          "https://kyc-stage.ventura1.com/onboarding/v1/signup/user/phone/otp/verify",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "X-Ventura-Session-Id": session,
            },
            body: JSON.stringify({
              phone: phone,
              otp: otp,
            }),
          }
        );
        // .then((res) => {
        //   alert("otp verified successfully");
        //   console.log(res);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
  
        // { "phone": 7666777118 }
        //   if (getData) {
        //     setotpSent(true);
        //   }
  

        //   receiving response from backend
        const res = await getData.json();
        if (res) {
          alert("top verified");
          router.push("/co/welcome");
        } else {
          alert("there was some error ");
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>

      {/* OTP Input Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-4 text-center">
                <div className="row">
                  <div className="col-sm-12 mt-5 bgWhite">
                    <div className="title">Verify OTP</div>
                   
                   {/* OTP Input Field */}
                    <input
                      className="otp"
                      id="codeBox1"
                      type="text"
                      onInput={(event) => {
                        setValue(
                          "codeBox1",
                          event.target.value.replace(/\D/g, "")
                        );
                        onKeyUpEvent(1, event);
                      }}
                      onFocus={() => {
                        onFocusEvent(1);
                      }}
                      {...register("codeBox1", {
                        required: true,
                      })}
                      maxLength={1}
                    />
                   
                   {/* OTP Input Field */}
                    <input
                      className="otp"
                      id="codeBox2"
                      type="text"
                      onInput={(event) => {
                        setValue(
                          "codeBox2",
                          event.target.value.replace(/\D/g, "")
                        );
                        onKeyUpEvent(2, event);
                      }}
                      onFocus={() => {
                        onFocusEvent(2);
                      }}
                      {...register("codeBox2", {
                        required: true,
                      })}
                      maxLength={1}
                    />
                   
                   {/* OTP Input Field */}
                    <input
                      className="otp"
                      id="codeBox3"
                      type="text"
                      onInput={(event) => {
                        setValue(
                          "codeBox3",
                          event.target.value.replace(/\D/g, "")
                        );
                        onKeyUpEvent(3, event);
                      }}
                      onFocus={() => {
                        onFocusEvent(3);
                      }}
                      {...register("codeBox3", {
                        required: true,
                      })}
                      maxLength={1}
                    />
                   
                   {/* OTP Input Field */}
                    <input
                      className="otp"
                      id="codeBox4"
                      type="text"
                      onInput={(event) => {
                        setValue(
                          "codeBox4",
                          event.target.value.replace(/\D/g, "")
                        );
                        onKeyUpEvent(4, event);
                      }}
                      onFocus={() => {
                        onFocusEvent(4);
                      }}
                      {...register("codeBox4", {
                        required: true,
                      })}
                      maxLength={1}
                    />
                   
                   {/* OTP Input Field */}
                    <input
                      className="otp"
                      id="codeBox5"
                      type="text"
                      onInput={(event) => {
                        setValue(
                          "codeBox5",
                          event.target.value.replace(/\D/g, "")
                        );
                        onKeyUpEvent(5, event);
                      }}
                      onFocus={() => {
                        onFocusEvent(5);
                      }}
                      {...register("codeBox5", {
                        required: true,
                      })}
                      maxLength={1}
                    />
                   
                   {/* OTP Input Field */}
                    <input
                      className="otp"
                      id="codeBox6"
                      type="text"
                      onInput={(event) => {
                        setValue(
                          "codeBox6",
                          event.target.value.replace(/\D/g, "")
                        );
                        onKeyUpEvent(6, event);
                      }}
                      onFocus={() => {
                        onFocusEvent(6);
                      }}
                      {...register("codeBox6", {
                        required: true,
                      })}
                      maxLength={1}
                    />

                    {/* Submit Button */}
                      <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
                      submit
                    </ButtonUI>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <OTPInput
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={6}
        otpType="number"
        disabled={false}
        secure
      />
      <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}
          {/* <ButtonUI type={"submit"} disabled={disabled}>
            submit
          </ButtonUI> */}
        </form>
      </>
    );
  };

  
export default MailOTP;
