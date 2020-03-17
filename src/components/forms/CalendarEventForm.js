/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { InputTypeEnum, CalendarEventTypeEnum, YesNoEnum } from '../../utils/enums';
import Heading from '../Heading';
import Input from './Input';
import InputButton from './InputButton';
import Select from './Select';

const CalendarEventForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    title: '&#127947;',
    type: CalendarEventTypeEnum.FITNESS,
    isPublic: false,
    isAllDay: false,
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      onSubmit({
        variables: {
          calendarEvent: formValues,
        },
      });
    }
  };

  const isFormValid = () => {
    return true;
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setFormValues((previousFormValues) => ({
      ...previousFormValues,
      [name]: value,
    }));
  };

  const handleBooleanChange = (name) => ({ target: { value } }) => {
    setFormValues((previousFormValues) => ({
      ...previousFormValues,
      [name]: value === YesNoEnum.YES,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading headingLevel={2}>Calendar Event</Heading>
      <Input
        type={InputTypeEnum.TEXT}
        label="Title"
        isRequired
        onChange={handleChange('title')}
        value={formValues.title}
      />
      <Select
        label="Type"
        isRequired
        onChange={handleChange('type')}
        options={[
          {
            label: 'Fitness',
            value: CalendarEventTypeEnum.FITNESS,
          },
          {
            label: 'General',
            value: CalendarEventTypeEnum.GENERAL,
          },
        ]}
        value={formValues.type}
      />
      <Select
        label="Is Public"
        isRequired
        onChange={handleBooleanChange('isPublic')}
        options={[
          {
            label: 'Yes',
            value: YesNoEnum.YES,
          },
          {
            label: 'No',
            value: YesNoEnum.NO,
          },
        ]}
        value={formValues.isPublic ? YesNoEnum.YES : YesNoEnum.NO}
      />
      <Select
        label="Is All Day"
        isRequired
        onChange={handleBooleanChange('isAllDay')}
        options={[
          {
            label: 'Yes',
            value: YesNoEnum.YES,
          },
          {
            label: 'No',
            value: YesNoEnum.NO,
          },
        ]}
        value={formValues.isAllDay ? YesNoEnum.YES : YesNoEnum.NO}
      />
      <InputButton value="Add" />
    </form>
  );
};

CalendarEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CalendarEventForm;
