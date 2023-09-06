import { Formik, Form, Field, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, FormField, Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { IPacientetDropDown, IPacienti } from "../../../app/models/IPacienti";
import { IShtrat, IShtratDropDown } from "../../../app/models/IShtrat";
import { ICaktoShtratin } from "../../../app/models/ICaktoShtratin";
import { create } from "yup/lib/array";
import "../Dashboard/cakto.css";

export default observer(function CaktoShtratinForm() {
  const { caktoShtratinStore } = useStore();
  const {
    selectedCaktoShtratin,
    closeForm,
    createCaktoShtratin,
    updateCaktoShtratin,
    loading,
    getPacientet,
    getShtreter,
  } = caktoShtratinStore;

  const initialState = selectedCaktoShtratin ?? {
    caktoShtratin_id: "",
    kohahyrjes: null,
    kohaleshimit: null,
    pacient_id: "",
    shtrat_id: "",
  };

  const [caktoShtratin, setCaktoShtratin] = useState(initialState);
  const validationSchema = Yup.object({
    kohahyrjes: Yup.string()
      .required("Selektoni kohen kur eshte caktuar shtrati...")
      .nullable(),
    kohaleshimit: Yup.string()
      .required("Selektoni kohen kur eshte leshuar shtrati...")
      .nullable(),
    pacient_id: Yup.string().required("Zgjedh pacientin").nullable(),
    shtrat_id: Yup.string().required("Zgjedh shtratin").nullable(),
  });

  let pacientet: IPacienti[] = [];
  let pacientetDropDown: IPacientetDropDown[] = [];

  let shtreter: IShtrat[] = [];
  let shtreterDropDown: IShtratDropDown[] = [];

  function handleFormSubmit(caktoShtratin: ICaktoShtratin) {
    caktoShtratin.caktoShtratin_id
      ? updateCaktoShtratin(caktoShtratin)
      : createCaktoShtratin(caktoShtratin);
  }

  getPacientet().then((response) => {
    response?.forEach((element) => {
      pacientet.push(element);
    });
    for (var i = 0; i < pacientet.length; i++) {
      var pacientiDropDown: IPacientetDropDown = {
        text: pacientet[i].emri + " " + pacientet[i].mbimeri,
        key: pacientet[i].pacient_Id,
        value: pacientet[i].pacient_Id,
      };
      pacientetDropDown.push(pacientiDropDown);
    }
  });

  getShtreter().then((response) => {
    response?.forEach((element) => {
      shtreter.push(element);
    });
    for (var i = 0; i < shtreter.length; i++) {
      var ShtreterDropDown: IShtratDropDown = {
        text: shtreter[i].nrShtratit,
        key: shtreter[i].shtrat_id,
        value: shtreter[i].shtrat_id,
      };
      shtreterDropDown.push(ShtreterDropDown);
    }
  });

  return (
    <Segment className="ssss" clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={caktoShtratin}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <label>Data e hyrjes:</label>
            <MyDateInput name="kohahyrjes" placeholderText="Hyri me..." />
            <label>Data e leshimit: </label>
            <MyDateInput name="kohaleshimit" placeholderText="Leshoi me..." />
            <label>Emri pacientit: </label>
            <MySelectInput
              options={pacientetDropDown}
              placeholder="Zgjedhni pacientin..."
              name="pacient_id"
            ></MySelectInput>
            <label>Shtrati me numer: </label>
            <MySelectInput
              options={shtreterDropDown}
              placeholder="Zgjedhni shtratin..."
              name="shtrat_id"
            ></MySelectInput>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Cakto"
            />
            <Button
              onClick={closeForm}
              floated="right"
              type="button"
              content="Anulo"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
