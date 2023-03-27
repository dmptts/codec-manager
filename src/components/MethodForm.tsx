import { Formik } from 'formik';

export default function MethodForm() {
  return (
    <Formik initialValues={{ methodName: '' }} onSubmit={() => {}}>
      {({
        values,
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        validateField,
      }) => {
        const handleInputChange = (
          e: React.ChangeEvent<HTMLElement>,
          fieldName: string
        ) => {
          handleChange(e);
          validateField(fieldName);
        };
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="method-name-input">Имя метода</label>
              <input
                type="text"
                name="methodName"
                id="method-name-input"
                value={values.methodName}
                onChange={(e) => handleInputChange(e, 'methodName')}
                onBlur={handleBlur}
              />
              {errors.methodName && <div>{errors.methodName}</div>}
            </div>
            <div></div>
          </form>
        );
      }}
    </Formik>
  );
}
