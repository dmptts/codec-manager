import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useGetParameterTemplateListQuery } from '../store/codecApi';
import { IMethod } from '../types/method';
import AppInput from './AppInput';
import AppSelect from './AppSelect';
import AppTextArea from './AppTextArea';
import styled from 'styled-components';

interface IMethodFormProps {
  method?: IMethod;
}

const validationSchema = yup.object({
  methodName: yup.string().min(4).required(),
});

export default function MethodForm({ method }: IMethodFormProps) {
  const initialValues = {
    methodName: method?.name ?? '',
    methodParameterTemplate: method?.parametr_template_id ?? '',
    methodDescription: method?.description ?? '',
    methodOperator: '',
    methodTo: '',
    methodParams: '',
  };

  const parameterTemplateOptions = useGetParameterTemplateListQuery().data?.map(
    (template) => ({
      value: template.id,
      label: template.name,
    })
  );

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={() => {}}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleChange, validateField }) => {
        const handleInputChange = (
          e: React.ChangeEvent<HTMLElement>,
          fieldName: string
        ) => {
          handleChange(e);
          validateField(fieldName);
        };

        return (
          <StyledForm>
            <h4>Основное</h4>
            <Wrapper>
              <AppInput
                type="text"
                name="methodName"
                id="method-name-field"
                onChange={(e) => handleInputChange(e, 'methodName')}
                label="Имя метода"
                placeholder="Имя метода"
              />
              <AppSelect
                name="methodParameterTemplate"
                id="method-parameter-template-field"
                options={parameterTemplateOptions}
                label="Шаблон параметров"
                placeholder="Шаблон параметров"
              />
              <AppTextArea
                name="methodDescription"
                id="method-description-field"
                cols={30}
                rows={5}
                placeholder="Описание метода"
                label="Описание метода"
              />
            </Wrapper>
            <h4>Тело метода</h4>
            <Wrapper>
              <AppSelect
                name="methodOperator"
                id="method-operator-field"
                options={[{ value: 'Test', label: 'test' }]}
                label="Оператор"
                placeholder="Оператор"
              />
              <AppSelect
                name="methodTo"
                id="method-to-field"
                options={[{ value: 'Test', label: 'test' }]}
                label="Принимающая переменная"
                placeholder="Принимающая переменная"
              />
              <AppSelect
                name="methodParams"
                id="method-params-field"
                options={[{ value: 'Test', label: 'test' }]}
                label="Передаваемые переменные"
                placeholder="Передаваемые переменные"
              />
            </Wrapper>
          </StyledForm>
        );
      }}
    </Formik>
  );
}

const StyledForm = styled(Form)`
  padding: 25px 40px;

  border: 1px solid #e6e6e6;
  border-top: none;
`;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 40px;
`;
