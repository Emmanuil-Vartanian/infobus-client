import React, { useState } from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import moment from 'moment'

import { ColumnsGrid } from 'components/FormFields/style'
import { ColumnsGridStyled } from 'pages/TripSearch/style'

import SelectField from 'components/FormFields/SelectField'
import Button from 'components/Button'
import {
  getDiscountsOptions,
  getGreetingOptions,
  // getPaymentOptions,
  getReservationDatesOptions
} from 'services/formOptions'
import InputField from 'components/FormFields/InputField'
import LineLoader from 'components/LineLoader'
import { createReservation } from 'pages/TripSearch/store/actions'
import { EFFECT_LOADING } from 'constants/effectLoading'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { getCurrentUserTokenSelector } from 'pages/Login/store/reducers/selectors'
import Seats from 'pages/Trips/components/UpdateTrip/components'
import { SEND_DATE_FORMAT } from 'constants/dateFormat'

const Reservation = ({ ticket, closeModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useLoadingEffect(EFFECT_LOADING.CREATE_RESERVATION)
  const [passengers, setPassengers] = useState([1])
  const { enqueueSnackbar } = useSnackbar()
  const token = useSelector(getCurrentUserTokenSelector)

  const datesOptions = getReservationDatesOptions(ticket?.departure?.date_list) || []
  const greetingOptions = getGreetingOptions()
  const discountsOptions = getDiscountsOptions(ticket?.discounts) || []
  // const paymentOptions = getPaymentOptions()

  const returnDates = afterDate => {
    const reservationDates =
      getReservationDatesOptions(ticket?.reverseData?.trip_info?.departure?.date_list, afterDate) ||
      []
    reservationDates.unshift({
      id: reservationDates.length,
      text: t('pages.tripSearch.freeDate'),
      value: 'free'
    })
    return reservationDates
  }

  const handleSubmit = data => {
    dispatch(createReservation({ data, ticket, enqueueSnackbar, closeModal }))
  }

  const handleAddPassengers = () => {
    setPassengers(prev => [...prev, prev[prev.length - 1] + 1])
  }

  const handleDeletePassengers = (bookedNumber, number, form, values) => () => {
    const passengerFeilds = [
      'passengerLastName',
      'passengerFirstName',
      'passengerBirthDate',
      'passengerPassportNumber',
      'passengerGreeting',
      'passengerDiscounts'
    ]
    passengerFeilds.forEach(item => {
      form.change(item + number, null)
    })

    if (ticket.seats_selection && bookedNumber) {
      form.change('disabledSeats', [...values.disabledSeats.filter(item => item !== bookedNumber)])
    }

    setPassengers(prev => {
      return prev.filter((item, index) => index + 1 !== number)
    })
  }
  console.log('ticket', ticket)
  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, form, values }) => {
        console.log('values', values)
        return (
          <form onSubmit={handleSubmit}>
            <ColumnsGridStyled columns={ticket?.reverseData?.trip_info && values.date ? 3 : 2}>
              <SelectField
                name={'date'}
                label={t('pages.tripSearch.selectDate')}
                options={datesOptions}
                required
                removeAsterisk
              />
              {ticket?.reverseData?.trip_info && values.date && (
                <SelectField
                  name={'returnDate'}
                  label={t('pages.tripSearch.returnDate')}
                  options={returnDates(values.date)}
                  required
                  removeAsterisk
                />
              )}
              {!ticket?.seats_selection && (
                <Button variant="contained" color="primary" onClick={handleAddPassengers}>
                  {t('pages.tripSearch.addPassenger')}
                </Button>
              )}
            </ColumnsGridStyled>
            {values?.date && (
              <Seats
                initialSeats={ticket?.seats}
                changeForm={form.change}
                startDate={values.date}
                reservation
                valueDisabledSeats={values.disabledSeats}
              />
            )}
            {(ticket.seats_selection ? values.disabledSeats : passengers)?.map((item, index) => (
              <div key={index}>
                <br />
                <br />
                <hr />
                <br />
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div>
                    {t('pages.tripSearch.passenger')} {index + 1}{' '}
                    {ticket.seats_selection && '| ' + t('pages.tripSearch.place') + ' ' + item} (
                    {t('pages.tripSearch.price')}: {ticket.price} €)
                  </div>
                  {index + 1 !== 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDeletePassengers(item, index + 1, form, values)}
                      size={'small'}
                    >
                      {t('pages.tripSearch.deletePassenger')}
                    </Button>
                  )}
                </div>
                <br />
                <ColumnsGrid columns={2}>
                  <InputField
                    name={`passengerLastName${index + 1}`}
                    label={t('pages.tripSearch.lastName')}
                    required
                    removeAsterisk
                  />
                  <InputField
                    name={`passengerFirstName${index + 1}`}
                    label={t('pages.tripSearch.firstName')}
                    required
                    removeAsterisk
                  />
                  <InputField
                    name={`passengerBirthDate${index + 1}`}
                    label={t('pages.tripSearch.birthDate')}
                    placeholder={' '}
                    type={'date'}
                    max={moment().format(SEND_DATE_FORMAT)}
                    required
                    removeAsterisk
                  />
                  <InputField
                    name={`passengerPassportNumber${index + 1}`}
                    label={t('pages.tripSearch.passportNumber')}
                    required
                    removeAsterisk
                  />
                  <SelectField
                    name={`passengerGreeting${index + 1}`}
                    label={t('pages.tripSearch.greeting')}
                    options={greetingOptions}
                  />
                  <SelectField
                    name={`passengerDiscounts${index + 1}`}
                    label={t('pages.tripSearch.discounts')}
                    options={discountsOptions}
                  />
                </ColumnsGrid>
              </div>
            ))}
            {(!ticket.seats_selection || (ticket.seats_selection && values.disabledSeats)) && (
              <>
                <br />
                <hr />
                <br />
                {token ? (
                  <ColumnsGrid columns={1}>
                    {/* <SelectField
                name={'payment_place'}
                label={t('pages.tripSearch.payment')}
                options={paymentOptions}
                required
                removeAsterisk
              /> */}
                    <InputField
                      name={'mobilePhoneNumber'}
                      label={t('pages.tripSearch.passengerContactPhoneNumber')}
                      required
                      removeAsterisk
                    />
                  </ColumnsGrid>
                ) : (
                  <>
                    <div>{t('pages.tripSearch.customer')}</div>
                    <br />

                    <ColumnsGrid columns={3}>
                      <SelectField
                        name={'greeting'}
                        label={t('pages.tripSearch.greeting')}
                        options={greetingOptions}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'lastName'}
                        label={t('pages.tripSearch.lastName')}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'firstName'}
                        label={t('pages.tripSearch.firstName')}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'street'}
                        label={t('pages.tripSearch.street')}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'postalCode'}
                        label={t('pages.tripSearch.postalCode')}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'city'}
                        label={t('pages.tripSearch.city')}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'phoneNumber'}
                        label={t('pages.tripSearch.phoneNumber')}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'mobilePhoneNumber'}
                        label={t('pages.tripSearch.mobilePhoneNumber')}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'email'}
                        label={t('pages.tripSearch.email')}
                        type={'email'}
                        required
                        removeAsterisk
                      />
                    </ColumnsGrid>
                  </>
                )}
              </>
            )}
            <br />
            {loading ? (
              <LineLoader />
            ) : (
              <div style={{ textAlign: 'end' }}>
                <Button variant="contained" color="primary" type="submit" id="submit">
                  {t('pages.tripSearch.book')}
                </Button>
              </div>
            )}
          </form>
        )
      }}
    />
  )
}

export default Reservation
