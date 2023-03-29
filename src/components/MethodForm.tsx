import { Formik } from 'formik';
import * as yup from 'yup';
import { useGetParameterTemplateListQuery } from '../store/codecApi';
import { IMethod } from '../types/method';
import AppInput from './AppInput';
import AppSelect from './AppSelect';

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
      {({ handleSubmit, handleChange, validateField }) => {
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
            <div>
              <label htmlFor="method-description-field">Описание метода</label>
              <textarea
                name="methodDescription"
                id="method-description-field"
                cols={30}
                rows={10}
                placeholder="Описание метода"
              />
            </div>
            <h4>Тело метода</h4>
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
          </form>
        );
      }}
    </Formik>
  );
}
