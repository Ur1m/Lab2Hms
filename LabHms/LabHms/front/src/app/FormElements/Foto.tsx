import { type } from 'os';
import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'
interface IProps extends  FieldRenderProps<string,HTMLInputElement>,
FormFieldProps{}

const Foto:React.FC<IProps> = ({
    input,
   type,
    placeholder,
    meta:{touched,error}
}) => {
    return (
       <Form error={touched && !!error} type={type} >
        <input {...input}  placeholder={placeholder} />
        {touched && error && (<Label basic color='red'>{error}</Label>)}
       </Form>
      
    );
}
export default Foto