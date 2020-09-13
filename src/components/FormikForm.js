import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getServicesTypes, insertQueue } from '../api/apiService';
import * as Yup from 'yup';

const servicesTypes = getServicesTypes();
var serviceType = '';
const handleChangeServiceType = (event) => {
  serviceType = event.target.value;
};

const mySchema = Yup.object().shape({
  numberWhatsApp: Yup.string()
    .required('Campo obrigatório!')
    .min(11, 'Você esqueceu algum número do telefone...')
    .max(11, 'Tem número demais nesse telefone...'),
});

const MyForm = ({ onSave }) => (
  <div>
    <Formik
      initialValues={{
        numberWhatsApp: '',
        requestedService: '',
        name: '',
        process: '',
        cpf: '',
        adress: '',
        observations: '',
      }}
      validationSchema={mySchema}
      onSubmit={(
        {
          numberWhatsApp,
          requestedService,
          name,
          process,
          cpf,
          adress,
          observations,
        },
        { setSubmitting }
      ) => {
        setTimeout(() => {
          insertQueue({
            numberWhatsApp,
            requestedService: serviceType,
            name,
            process,
            cpf,
            adress,
            observations,
          });
        }, 400);
        onSave();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="text"
            name="numberWhatsApp"
            placeholder="Número WhatsApp com DDD"
          />
          <ErrorMessage
            name="numberWhatsApp"
            render={(msg) => (
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'red',
                  marginBottom: '1px',
                  display: 'block',
                }}
              >
                {msg}
              </span>
            )}
          />
          <label htmlFor="serviceType">Serviço solicitado</label>
          <select
            className="s10 browser-default"
            name="serviceType"
            value={serviceType}
            onChange={handleChangeServiceType}
          >
            {servicesTypes.map(({ id, serviceType }) => {
              return (
                <option key={id} value={serviceType}>
                  {serviceType}
                </option>
              );
            })}
          </select>
          <Field type="text" name="name" placeholder="Nome do cliente" />
          <Field type="text" name="process" placeholder="Processo" />
          <Field type="text" name="cpf" placeholder="CPF" />
          <Field type="text" name="adress" placeholder="Endereço" />
          <Field type="text" name="observations" placeholder="Observações" />
          <button
            className="waves-effect waves-light btn green"
            style={{ fontWeight: 'bold', margin: '10px' }}
            type="submit"
            disabled={isSubmitting}
          >
            <i className="material-icons right">save</i>Salvar
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default MyForm;
