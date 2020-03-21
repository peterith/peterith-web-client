/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { InputTypeEnum, CalendarEventTypeEnum, YesNoEnum } from '../../utils/enums';
import Heading from '../Heading';
import Input from './Input';
import InputButton from './InputButton';
import Select from './Select';
import DatePicker from './DatePicker';

const CalendarEventForm = ({ onSubmit, startDate, endDate }) => {
  const [formValues, setFormValues] = useState({
    title: '&#127947;',
    type: CalendarEventTypeEnum.FITNESS,
    isPublic: false,
    isAllDay: false,
    startDate,
    endDate,
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

  const handleIsAllDayChange = ({ target: { value } }) => {
    if (value === YesNoEnum.YES) {
      setFormValues((previousFormValues) => {
        const newStartDate = new Date(previousFormValues.startDate);
        newStartDate.setHours(0, 0, 0);
        const newEndDate = new Date(previousFormValues.endDate);
        newEndDate.setHours(0, 0, 0);

        return {
          ...previousFormValues,
          isAllDay: true,
          startDate: newStartDate,
          endDate: newEndDate,
        };
      });
    } else {
      setFormValues((previousFormValues) => ({
        ...previousFormValues,
        isAllDay: false,
      }));
    }
  };

  const handleDateChange = (name) => (date) => {
    setFormValues((previousFormValues) => ({
      ...previousFormValues,
      [name]: date,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading headingLevel={2}>Calendar Event</Heading>
      <Input
        type={InputTypeEnum.TEXT}
        label="Title"
        value={formValues.title}
        isRequired
        onChange={handleChange('title')}
      />
      <Select
        label="Type"
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
        isRequired
        onChange={handleChange('type')}
      />
      <Select
        label="Is Public"
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
        isRequired
        onChange={handleBooleanChange('isPublic')}
      />
      <Select
        label="Is All Day"
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
        isRequired
        onChange={handleIsAllDayChange}
      />
      <DatePicker
        label="Start Date"
        selected={formValues.startDate}
        isAllDay={formValues.isAllDay}
        isRequired
        onChange={handleDateChange('startDate')}
      />
      <DatePicker
        label="End Date"
        selected={formValues.endDate}
        isAllDay={formValues.isAllDay}
        isRequired
        onChange={handleDateChange('endDate')}
      />
      <InputButton value="Add" />
    </form>
  );
};

CalendarEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

CalendarEventForm.defaultProps = {
  startDate: new Date().setHours(0, 0, 0),
  endDate: new Date().setHours(0, 0, 0),
};

export default CalendarEventForm;
