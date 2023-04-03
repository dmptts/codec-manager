import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useGetCodecListQuery } from '../store/codecApi';
import { ICodecFull } from '../types/codec';
import AppInput from './AppInput';
import AppSelect from './AppSelect';
import CodecMethodList from './CodecMethodList';
import AppTextArea from './AppTextArea';
import styled from 'styled-components';
import Container from './Container';

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
          <Container>
            <StyledForm>
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
              <AppTextArea
                name="codecDescription"
                id="codec-description-field"
                cols={30}
                rows={5}
                placeholder="Описание кодека"
                label="Описание кодека"
              />
            </StyledForm>
            <section>
              <h2>Методы</h2>
              <CodecMethodList methods={data?.methods} />
            </section>
            <button type="submit">Создать кодек</button>
          </Container>
        );
      }}
    </Formik>
  );
}

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 88px;
`;
