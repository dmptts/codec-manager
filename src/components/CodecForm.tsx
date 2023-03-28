import { Formik } from 'formik';
import * as yup from 'yup';
import { ICodec } from '../types/codec';
import AppInput from './AppInput';
import AppSelect from './AppSelect';

interface ICodecFormProps {
  data?: ICodec;
}

const validationSchema = yup.object({
  codecName: yup.string().min(4).required(),
  codecSurname: yup.string().min(4).required(),
});

const testOptions = [
  { value: 1, label: 'option 1' },
  { value: 2, label: 'option 2' },
  { value: 3, label: 'option 3' },
];

export default function CodecForm({ data }: ICodecFormProps) {
  const initialValues = {
    codecName: data?.name ?? '',
    codecSurname: '',
    codecParent: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={() => {}}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleChange, validateField, handleSubmit }) => {
        const handleInputChange = (
          e: React.ChangeEvent<HTMLElement>,
          fieldName: string
        ) => {
          handleChange(e);
          validateField(fieldName);
        };

        return (
          <form onSubmit={handleSubmit}>
            <AppInput
              type="text"
              name="codecName"
              id="codec-name-input"
              onChange={(e) => handleInputChange(e, 'codecName')}
              label="Имя кодека"
            />
            <AppInput
              type="text"
              name="codecSurname"
              id="codec-surname-input"
              onChange={(e) => handleInputChange(e, 'codecSurname')}
              label="Фамилия кодека"
            />
            <AppSelect id="test" name="codecParent" options={testOptions} />
          </form>
        );
      }}
    </Formik>
  );
}
