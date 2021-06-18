import { useField } from 'formik';
import React from 'react';
import { Form, Label, Placeholder, Select } from 'semantic-ui-react';
import Datepicker,{ReactDatePickerProps} from 'react-datepicker';

interface Props {
    placeholder: string;
    name: string;
    options:any;
    label?: string;
}

export default function MyDateInput(props: Partial <ReactDatePickerProps>){
    const [field, meta,helpers] = useField(props.name!);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <Datepicker
            {...field}{...props}
            selected={field.value && new Date(field.value)|| null}
            onChange={value =>helpers.setValue(value)}
            placeholderText={props.placeholderText}
            />
            
           
            {meta.touched && meta.error ? (
                <Label basic color='red'> {meta.error} </Label>
            ) : null}
        </Form.Field>
    )
}