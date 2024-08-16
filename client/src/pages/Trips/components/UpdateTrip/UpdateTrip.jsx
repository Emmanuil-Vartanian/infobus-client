import React, { Fragment, useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { TabContext, TabPanel } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import moment from 'moment'

import {
  ActivateStopTitle,
  CheckboxFieldActivateStyled,
  CheckboxFieldActivateTripStyled,
  CheckboxFieldStyled,
  DateCheckboxField,
  TabListStyled,
  TabStyled
} from './style'
import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'
import { ColumnsGrid } from 'components/FormFields/style'

import LineLoader from 'components/LineLoader'
import SelectField from 'components/FormFields/SelectField'
import {
  getBaggageOptions,
  getDiscountsOptions,
  getLocationsAddressOptions,
  getTimeSlotsOptions
} from 'services/formOptions'
import { getBaggageSelector } from 'pages/Baggage/store/reducers/selectors'
import { getBaggage } from 'pages/Baggage/store/actions'
import Button from 'components/Button'
import { updateTrip } from 'pages/Trips/store/actions'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import { getDiscounts } from 'pages/Discounts/store/actions'
import { getDiscountsSelector } from 'pages/Discounts/store/reducers/selectors'
import TextareaField from 'components/FormFields/TextareaField'
import InputField from 'components/FormFields/InputField'
import Seats from './components'
import { SEND_DATE_FORMAT } from 'constants/dateFormat'
import { CheckboxFieldBlock, RoutePointsBlock } from '../CreateTrip/style'
import CheckboxField from 'components/FormFields/CheckboxField'
import { indexDays, translationDays } from '../CreateTrip/CreateTrip'
import { getLocations } from 'pages/Locations/store/actions'
import { getLocationsSelector } from 'pages/Locations/store/reducers/selectors'

const tabValue = [
  'route',
  'schedule',
  'seats',
  'prices',
  'discounts',
  'baggage',
  'invoiceAndTicketText',
  'activate'
]

const UpdateTrip = ({ trip, onClose }) => {
  const { i18n, t } = useTranslation()
  const dispatch = useDispatch()
  const loading = useLoadingEffect(EFFECT_LOADING.UPDATE_TRIP)
  const baggages = useSelector(getBaggageSelector)
  const discounts = useSelector(getDiscountsSelector)
  const locations = useSelector(getLocationsSelector)
  const [tab, setTab] = useState('route')

  const discountsOptions = getDiscountsOptions(discounts)
  const baggageOptions = getBaggageOptions(baggages)
  const timeSlotsOptions = time => getTimeSlotsOptions(time)
  const locationsAddressOptions = city => {
    const locationsByCity = locations.filter(location => location.city[i18n.language] === city)
    return getLocationsAddressOptions(locationsByCity)
  }

  useEffect(() => {
    dispatch(getDiscounts())
    dispatch(getBaggage())
    dispatch(getLocations())
  }, [])

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  const handleSubmit = data => {
    dispatch(updateTrip({ ...data, tab }, onClose))
  }

  const initialValuesPrices = () => {
    const obj = {}
    if (Object.prototype.hasOwnProperty.call(trip.prices, 'list')) {
      trip.prices.list.forEach((item, index) => {
        obj[`ow_price_${index}`] = item.ow_price
        obj[`rt_price_${index}`] = item.rt_price
        obj[`season_ow_price_${index}`] = item.season_ow_price
        obj[`season_rt_price_${index}`] = item.season_rt_price
      })
    } else {
      trip.directions.forEach((item, index) => {
        obj[`ow_price_${index}`] = trip.prices.ow_price
        obj[`rt_price_${index}`] = trip.prices.rt_price
        obj[`season_ow_price_${index}`] = trip.prices.season_ow_price
        obj[`season_rt_price_${index}`] = trip.prices.season_rt_price
      })
    }
    return obj
  }

  const initialValuesDays = () => {
    const obj = {}
    indexDays.forEach(item => {
      obj[`day${item}`] =
        moment(trip.departure.start_date).format('dd') === translationDays[item].toLowerCase() ||
        moment(trip.departure.end_date).format('dd') === translationDays[item].toLowerCase()
    })
    return obj
  }

  const initialValuesDepartureDate = () => {
    const obj = {}
    trip.points.forEach((item, index) => {
      obj[`departureDate${index}`] = item.date
      obj[`departureTime${index}`] = item.time
    })
    return obj
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{
        ...trip,
        ...initialValuesPrices(),
        ...initialValuesDays(),
        ...initialValuesDepartureDate(),
        baggage: trip.baggage.map(baggage => baggage._id),
        discounts: trip.discounts.map(discount => discount._id),
        applyChanges: tab !== 'seats' && tab !== 'schedule',
        ...trip.points.reduce((acc, point) => {
          acc[point.point_id] = point.active
          return acc
        }, {}),
        ...trip.points.reduce((acc, point, index) => {
          if (point?.address) {
            const findLocation = locations.find(
              location =>
                location.city[i18n.language] === point.city[i18n.language] &&
                location.address[i18n.language] === point.address[i18n.language]
            )
            acc['address' + index] = findLocation?._id
          }
          if (point?.address_for_week) {
            indexDays.map(item => {
              const findLocation = locations.find(
                location =>
                  location.city[i18n.language] === point.city[i18n.language] &&
                  location.address[i18n.language] ===
                    point.address_for_week[item].address[i18n.language]
              )
              acc['addressForWeek' + index + item] = findLocation?._id
              return point?.address_for_week[item].address[i18n.language]
            })
          }
          return acc
        }, {}),
        startDate: trip.departure.start_date,
        endDate: trip.departure.end_date
      }}
      render={({ handleSubmit, values, form }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TabContext value={tab}>
              <TabListStyled onChange={handleTabChange}>
                {tabValue.map((tab, index) => (
                  <TabStyled key={index} label={t(`pages.updateTrip.${tab}`)} value={tab} />
                ))}
              </TabListStyled>
              <TabPanel value="route">
                <CheckboxFieldStyled
                  name={'enableRouteSettings'}
                  label={t('pages.updateTrip.enableRouteSettings')}
                  flexDirection="row"
                />
                <div style={{ position: 'relative' }}>
                  {trip.points.map((item, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <Box
                        key={index}
                        sx={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: 'white',
                          border: '2px solid #700000',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '22px',
                          left: '3%',
                          transform: 'translateX(-50%)',
                          zIndex: 1
                        }}
                      />
                      {index !== trip.points.length - 1 ? (
                        <Box
                          sx={{
                            position: 'absolute',
                            height: `100%`,
                            width: '2px',
                            borderLeft: '2px dotted #700000',
                            top: '25px',
                            left: '3%',
                            transform: 'translateX(-50%)'
                          }}
                        />
                      ) : null}
                      <div style={{ marginLeft: '50px', paddingTop: '20px' }}>
                        <div>
                          {item.city[i18n.language]} ({item.time})
                        </div>
                        <div style={{ fontSize: '13px', marginBottom: '10px' }}>
                          {item.country[i18n.language]}
                        </div>
                        {values.enableRouteSettings ? (
                          indexDays.map(day => (
                            <SelectField
                              key={day}
                              name={'addressForWeek' + index + day}
                              label={`${t('pages.locations.address')} (${translationDays[day]})`}
                              options={locationsAddressOptions(item.city[i18n.language])}
                              tableSelect
                              style={{ marginBottom: '10px' }}
                            />
                          ))
                        ) : (
                          <SelectField
                            name={'address' + index}
                            label={t('pages.locations.address')}
                            options={locationsAddressOptions(item.city[i18n.language])}
                            tableSelect
                          />
                        )}
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
                <CheckboxFieldStyled
                  name={'applyChanges'}
                  label={t('pages.updateTrip.applyChanges')}
                  flexDirection="row"
                />
              </TabPanel>
              <TabPanel value="schedule">
                <hr />
                <br />
                <ColumnsGridStyled columns={3}>
                  <InputField
                    name={'startDate'}
                    label={t('pages.trip.startDate')}
                    placeholder={' '}
                    type={'date'}
                    min={moment().add(1, 'day').format(SEND_DATE_FORMAT)}
                    required
                    removeAsterisk
                    disabled
                  />
                  <InputField
                    name={'endDate'}
                    label={t('pages.trip.endDate')}
                    placeholder={' '}
                    type={'date'}
                    min={moment(values?.startDate)
                      .add(values?.startDate ? 0 : 1, 'day')
                      .format(SEND_DATE_FORMAT)}
                    required
                    removeAsterisk
                  />
                </ColumnsGridStyled>
                <br />
                <hr />
                <CheckboxFieldBlock>
                  {indexDays.map(item => (
                    <CheckboxField
                      key={item}
                      name={'day' + item}
                      label={translationDays[item]}
                      initialValue={
                        moment(values.startDate).format('dd') ===
                          translationDays[item].toLowerCase() ||
                        moment(values.endDate).format('dd') === translationDays[item].toLowerCase()
                      }
                      disabled={
                        moment(values.startDate).format('dd') ===
                          translationDays[item].toLowerCase() ||
                        moment(values.endDate).format('dd') === translationDays[item].toLowerCase()
                      }
                    />
                  ))}
                </CheckboxFieldBlock>
                <br />
                <hr />
                {trip.points.map((item, index) => (
                  <Fragment key={index}>
                    <RoutePointsBlock>
                      <div>
                        <div>{item.city[i18n.language]}</div>
                        <div>{item.country[i18n.language]}</div>
                      </div>
                      <ColumnsGridStyled columns={2}>
                        <InputField
                          name={'departureDate' + index}
                          label={t('pages.trip.date')}
                          placeholder={' '}
                          type={'date'}
                          min={moment(values.startDate).format(SEND_DATE_FORMAT)}
                          initialValue={moment(
                            values['departureDate' + (index - 1)] || values.startDate
                          ).format(SEND_DATE_FORMAT)}
                          required
                          removeAsterisk
                          disabled={index === 0}
                        />
                        <SelectField
                          name={'departureTime' + index}
                          label={t('pages.trip.time')}
                          options={timeSlotsOptions(
                            values['departureDate' + index] ===
                              values['departureDate' + (index - 1)]
                              ? values['departureTime' + (index - 1)]
                              : null
                          )}
                          required
                          removeAsterisk
                        />
                      </ColumnsGridStyled>
                    </RoutePointsBlock>
                    <hr />
                  </Fragment>
                ))}
              </TabPanel>
              <TabPanel value="seats">
                <CheckboxFieldStyled
                  name={'seats_selection'}
                  label={t('pages.updateTrip.activateSeats')}
                  flexDirection="row"
                />
                {values.seats_selection && (
                  <div>
                    <ColumnsGridStyled columns={3}>
                      <InputField
                        name={'seats_start_date'}
                        label={t(`pages.updateTrip.${values.dateRange ? 'dateFrom' : 'date'}`)}
                        placeholder={' '}
                        type={'date'}
                        min={moment(trip.departure.start_date).format(SEND_DATE_FORMAT)}
                        max={moment(trip.departure.end_date).format(SEND_DATE_FORMAT)}
                      />
                      {values.dateRange && (
                        <InputField
                          name={'seats_end_date'}
                          label={t('pages.updateTrip.dateTo')}
                          placeholder={' '}
                          type={'date'}
                          min={moment(trip.departure.start_date).format(SEND_DATE_FORMAT)}
                          max={moment(trip.departure.end_date).format(SEND_DATE_FORMAT)}
                        />
                      )}
                      <DateCheckboxField
                        name={'dateRange'}
                        label={t('pages.updateTrip.dateRange')}
                        flexDirection="row"
                      />
                    </ColumnsGridStyled>
                    {((!values.dateRange && values.seats_start_date) ||
                      (values.dateRange && values.seats_start_date && values.seats_end_date)) && (
                      <Seats
                        initialSeats={trip.seats}
                        changeForm={form.change}
                        startDate={values.seats_start_date}
                        endDate={values.seats_end_date}
                      />
                    )}
                  </div>
                )}
              </TabPanel>
              <TabPanel value="prices">
                <div>
                  {trip.directions.map((item, index) => (
                    <div key={index}>
                      {index !== 0 && <br />}
                      <div>
                        {index + 1}. {item.departure.city[i18n.language]} -{' '}
                        {item.arrival.city[i18n.language]}
                      </div>
                      <ColumnsGridStyled columns={4}>
                        <InputField
                          name={`ow_price_${index}`}
                          label={'ow price, EUR | €'}
                          type={'number'}
                        />
                        <InputField
                          name={`rt_price_${index}`}
                          label={'rt price, EUR | €'}
                          type={'number'}
                        />
                        <InputField
                          name={`season_ow_price_${index}`}
                          label={'season ow price, EUR | €'}
                          type={'number'}
                        />
                        <InputField
                          name={`season_rt_price_${index}`}
                          label={'season rt price, EUR | €'}
                          type={'number'}
                        />
                      </ColumnsGridStyled>
                      <br />
                      <hr />
                    </div>
                  ))}
                </div>
                <br />
                <div>{t('pages.updateTrip.seasonPriceDate')}</div>
                <ColumnsGridStyled columns={3}>
                  <InputField
                    name={'start_season_date'}
                    label={t('pages.trip.startDate')}
                    placeholder={' '}
                    type={'date'}
                  />
                  <InputField
                    name={'end_season_date'}
                    label={t('pages.trip.endDate')}
                    placeholder={' '}
                    type={'date'}
                  />
                </ColumnsGridStyled>
                <CheckboxFieldStyled
                  name={'applyChanges'}
                  label={t('pages.updateTrip.applyChanges')}
                  flexDirection="row"
                />
              </TabPanel>
              <TabPanel value="discounts">
                <ColumnsGrid columns={1}>
                  <SelectField
                    name={'discounts'}
                    label={t('pages.trip.discounts')}
                    options={discountsOptions}
                    required
                    removeAsterisk
                    multiple
                  />
                </ColumnsGrid>
                <CheckboxFieldStyled
                  name={'applyChanges'}
                  label={t('pages.updateTrip.applyChanges')}
                  flexDirection="row"
                />
              </TabPanel>
              <TabPanel value="baggage">
                <ColumnsGrid columns={1}>
                  <SelectField
                    name={'baggage'}
                    label={t('pages.trip.baggage')}
                    options={baggageOptions}
                    required
                    removeAsterisk
                    multiple
                  />
                </ColumnsGrid>
                <CheckboxFieldStyled
                  name={'applyChanges'}
                  label={t('pages.updateTrip.applyChanges')}
                  flexDirection="row"
                />
              </TabPanel>
              <TabPanel value="invoiceAndTicketText">
                <ColumnsGrid columns={1}>
                  <TextareaField name="invoice_text" label={t('pages.updateTrip.invoiceText')} />
                  <TextareaField name="ticket_text" label={t('pages.updateTrip.ticketText')} />
                </ColumnsGrid>
                <CheckboxFieldStyled
                  name={'applyChanges'}
                  label={t('pages.updateTrip.applyChanges')}
                  flexDirection="row"
                />
              </TabPanel>
              <TabPanel value="activate">
                <CheckboxFieldActivateStyled
                  name={'active'}
                  label={`${t('pages.updateTrip.activateBusTrip')} ${trip.departure.city[i18n.language]} - ${trip.arrival.city[i18n.language]}`}
                  flexDirection="row"
                />
                <br />
                <br />
                <hr />
                <br />
                <ColumnsGrid columns={2}>
                  <div>
                    <ActivateStopTitle>{t('pages.updateTrip.activateStop')}</ActivateStopTitle>
                    <div style={{ position: 'relative' }}>
                      {trip.points.map((item, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                          <Box
                            key={index}
                            sx={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: 'white',
                              border: '2px solid #700000',
                              borderRadius: '50%',
                              position: 'absolute',
                              top: '22px',
                              left: '3%',
                              transform: 'translateX(-50%)',
                              zIndex: 1
                            }}
                          />
                          {index !== trip.points.length - 1 ? (
                            <Box
                              sx={{
                                position: 'absolute',
                                height: `100%`,
                                width: '2px',
                                borderLeft: '2px dotted #700000',
                                top: '25px',
                                left: '3%',
                                transform: 'translateX(-50%)'
                              }}
                            />
                          ) : null}
                          <CheckboxFieldActivateTripStyled
                            name={item.point_id}
                            label={
                              <div>
                                <div>{item.city[i18n.language]}</div>
                                <div style={{ fontSize: '13px' }}>
                                  {item.country[i18n.language]}
                                </div>
                              </div>
                            }
                            flexDirection="row"
                          />
                          <br />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <ActivateStopTitle>
                      {t('pages.updateTrip.deactivateDirection')}
                    </ActivateStopTitle>
                    <br />
                    {trip.points
                      .map((fromPoint, fromIndex) =>
                        trip.points.slice(fromIndex + 1).map((toPoint, toIndex) => {
                          const isInactive =
                            !values[fromPoint.point_id] || !values[toPoint.point_id]
                          return isInactive ? (
                            <div key={`${fromIndex}-${toIndex}`}>
                              {fromPoint.city[i18n.language]} - {toPoint.city[i18n.language]}
                            </div>
                          ) : null
                        })
                      )
                      .filter(Boolean)}
                  </div>
                </ColumnsGrid>
                <CheckboxFieldStyled
                  name={'applyChanges'}
                  label={t('pages.updateTrip.applyChanges')}
                  flexDirection="row"
                />
              </TabPanel>
            </TabContext>
            <ButtonBlock>
              {loading ? <LineLoader /> : <Button type={'submit'}>{t('common.edit')}</Button>}
            </ButtonBlock>
          </form>
        )
      }}
    />
  )
}

export default UpdateTrip
