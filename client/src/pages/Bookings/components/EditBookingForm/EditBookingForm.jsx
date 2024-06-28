import React from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'

import InputField from 'components/FormFields/InputField'
import Button from 'components/Button'
import SelectField from 'components/FormFields/SelectField'
import { getBookingsStatusesOptions, getReservationDatesOptions } from 'services/formOptions'
import { STATUSES } from 'constants/bookings'
import { changeBookings } from 'pages/Bookings/store/actions'
import LineLoader from 'components/LineLoader'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'

const EditBookingForm = ({ booking, handleCloseModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useLoadingEffect(EFFECT_LOADING.CHANGE_BOOKINGS)

  const statusesOptions = getBookingsStatusesOptions(Object.values(STATUSES))
  const returnDates = getReservationDatesOptions(booking?.trip_info?.departure?.date_list) || []

  const handleSubmit = data => {
    dispatch(changeBookings(data, handleCloseModal))
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={booking}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <ColumnsGridStyled columns={3}>
              <InputField name={'buch'} label={t('pages.booking.buch')} type={'number'} />
              <SelectField
                name={'status'}
                label={t('pages.booking.status')}
                options={statusesOptions}
                required
                removeAsterisk
              />
              {booking.departure_reverse ? (
                <SelectField
                  name={'returnDate'}
                  label={t('pages.tripSearch.returnDate')}
                  options={returnDates}
                />
              ) : null}
            </ColumnsGridStyled>
            <ButtonBlock>
              {loading ? <LineLoader /> : <Button type={'submit'}>{t('common.apply')}</Button>}
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default EditBookingForm
