import { Formik } from 'formik';
import * as yup from 'yup';
import { useGetCodecListQuery } from '../store/codecApi';
import { ICodecFull } from '../types/codec';
import AppInput from './AppInput';
import AppSelect from './AppSelect';
import CodecMethodList from './CodecMethodList';

interface ICodecFormProps {
  data?: ICodecFull;
}

const validationSchema = yup.object({
  codecName: yup.string().min(4).required(),
  codecSurname: yup.string().min(4).required(),
});

export default function CodecForm({ data }: ICodecFormProps) {
  const initialValues = {
    codecName: data?.name ?? '',
    codecParent: '',
    codecDescription: data?.description ?? '',
  };

  const codecParentOptions = useGetCodecListQuery({}).data?.map((codec) => ({
    value: codec.id,
    label: codec.name,
  }));

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
          <>
            <form onSubmit={handleSubmit}>
              <AppInput
                type="text"
                name="codecName"
                id="codec-name-field"
                onChange={(e) => handleInputChange(e, 'codecName')}
                label="Имя кодека"
                placeholder="Имя кодека"
              />
              <AppSelect
                name="codecParent"
                id="codec-parent-field"
                options={codecParentOptions}
                label="Кодек-родитель"
                placeholder="Расширяемый кодек"
              />
              <div>
                <label htmlFor="codec-description-field">Описание кодека</label>
                <textarea
                  name="codecDescription"
                  id="codec-description-field"
                  cols={30}
                  rows={10}
                  placeholder="Описание кодека"
                />
              </div>
            </form>
            <section>
              <h2>Методы</h2>
              <CodecMethodList methods={data?.methods} />
            </section>
            <button type="submit">Создать кодек</button>
          </>
        );
      }}
    </Formik>
  );
}
