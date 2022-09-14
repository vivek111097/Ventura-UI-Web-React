import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../../ui/Input.component";
import Select from "../../ui/Select.component";


const Nominee = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            select_relation: ''
        }
    });
    const { control } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Controller
                render={({ field }) => <Input {...field} />}
                name="firstName"
                control={control}

            />

            <Controller
                control={control}
                name="select_relation"
                render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { isTouched, isDirty, error },
                    formState,
                }) => (
                    <Select value={value} onChange={onChange} options={{ 1: 'fsersdaserle', 2: 'male', 3: 'other' }} />
                )}
            />

            {/* <Controller
                render={({ field }) => <Select {...field} options={{ 1: 'fsersdaserle', 2: 'male', 3: 'other' }} />}
                name="select_relation"
                control={control}
            /> */}

            {/* <input {...register("firstName")} placeholder="First name" />
            <select {...register("category")}>
                <option value="">Select...</option>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
            </select> */}
            <input type="submit" />
        </form>
    );
}

export default Nominee