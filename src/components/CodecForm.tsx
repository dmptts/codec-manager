import { Formik } from 'formik';
import * as yup from 'yup';
import { ICodec } from '../types/codec';

interface ICodecFormProps {
  data?: ICodec;
}

const validationSchema = yup.object({
  codecName: yup.string().min(4).required(),
  codecSurname: yup.string().min(4).required(),
});

export default function CodecForm({ data }: ICodecFormProps) {
  return (
    <Formik
      initialValues={{ codecName: '', codecSurname: '' }}
      onSubmit={() => {}}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        validateField,
      }) => {
        const handleInputChange = (
          e: React.ChangeEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          handleChange(e);
          validateField(fieldName);
        };

        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor=""></label>
              <input
                type="text"
                onChange={(e) => handleInputChange(e, 'codecName')}
                onBlur={handleBlur}
                value={values.codecName}
                name="codecName"
              />
              {errors.codecName && <div>{errors.codecName}</div>}
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => handleInputChange(e, 'codecSurname')}
                onBlur={handleBlur}
                value={values.codecSurname}
                name="codecSurname"
              />
              {errors.codecSurname && <div>{errors.codecSurname}</div>}
            </div>
            <textarea
              name="codecDescription"
              id="codec-description"
              cols={30}
              rows={10}
            ></textarea>
          </form>
        );
      }}
    </Formik>
  );
}
