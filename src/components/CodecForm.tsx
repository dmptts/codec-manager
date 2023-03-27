import { useFormik } from 'formik';
import { useEffect } from 'react';
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
  const formik = useFormik({
    initialValues: {
      codecName: '',
      codecSurname: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {},
    validationSchema: validationSchema,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLElement>,
    fieldName: string
  ) => {
    formik.handleChange(e);
    formik.validateField(fieldName);
  };

  useEffect(() => {
    if (data) {
      formik.setValues({
        codecName: data.name,
        codecSurname: '',
      });
    }
    // eslint-disable-next-line
  }, [data]); // Линтер хочет добавить инстанс формика в зависимости, а в эффекте изменяется его values, что приводит к зацикливанию

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="codec-name-input">Имя кодека</label>
        <input
          type="text"
          name="codecName"
          id="codec-name-input"
          value={formik.values.codecName}
          onChange={(e) => handleInputChange(e, 'codecName')}
          onBlur={formik.handleBlur}
        />
        {formik.errors.codecName && <div>{formik.errors.codecName}</div>}
      </div>
      <div>
        <label htmlFor="codec-surname-inpu">Фамилия кодека</label>
        <input
          type="text"
          name="codecSurname"
          id="codec-surname-input"
          value={formik.values.codecSurname}
          onChange={(e) => handleInputChange(e, 'codecSurname')}
          onBlur={formik.handleBlur}
        />
        {formik.errors.codecSurname && <div>{formik.errors.codecSurname}</div>}
      </div>
      <button type="submit">Создать кодек</button>
    </form>
  );
}
