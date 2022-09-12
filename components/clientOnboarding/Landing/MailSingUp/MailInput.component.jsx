import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { UserContext } from '../../../../pages/_app';
import ButtonUI from '../../../ui/Button.component';



const MailInput = ({email,setemail,otpSent, setotpSent}) => {
  // const {state,dispatch} = useContext(UserContext)
    const [disabled, setdisabled] = useState(true);
    const {
      register,
      trigger,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    // Defining Regex for Mail
    const MailRegex = new RegExp(/^[6-9]\d{9}$/i);
    //   Number Validation
    const validateEmail = (phone) => {
        if (MailRegex.test(phone)) {
          //   enabling the button if Mail ID is valid
          setdisabled(false);
          return true;
        } else {
          setdisabled(true);
          return "Invalid Input";
        }
      };
    
      const onSubmit = async (data) => {
          try {
          
            const getData = await fetch(
              "https://kyc-stage.ventura1.com/onboarding/v1/signup/user/email",
              {
                method: "POST",
                headers:{
                    "X-Ventura-Session-Id":email,
                },
                body: JSON.stringify(data),
              }
            );
            // .then((res)=>{
            //   console.log(res)
            // }).catch((error)=>{
            //   console.log(error)
            // })
      
            // { "phone": 7666777118 }
            //   if (getData) {
            //     setotpSent(true);
            //   }
          //   receiving response from backend
            const res = await getData.json();
              if(res){
                  setotpSent(true); 
                  setemail(res.mail)
              }else{
                  alert("there was some error ")
              }
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        };
    
  return (
   <>
    <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
            <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    validate: validateEmail,
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
            </div>
          </div>
          <div className="checkBox">
            <input type="checkbox" id="enableWhatsapp" defaultChecked={"checked"} />
            <label htmlFor="enableWhatsapp">Enable WhatsApp notifications</label>
          </div>
          <ButtonUI type={"submit"} disabled={disabled}>
            Continue
          </ButtonUI>
        </form>
   </>
  )
}

export default MailInput