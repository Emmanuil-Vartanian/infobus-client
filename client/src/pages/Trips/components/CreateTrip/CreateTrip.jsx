import React, { Fragment, useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { ButtonBlock, ColumnsGridStyled } from 'pages/Locations/style'
import { AddSeasonPrice, CheckboxFieldBlock, RoutePointsBlock, СhooseSeatsButton } from './style'

import SearchBySelectField from 'components/FormFields/SearchBySelectField'
import { getRoutes } from 'pages/Routes/store/actions'
import { getRoutesSelector } from 'pages/Routes/store/reducers/selectors'
import {
  getBaggageOptions,
  getCarrierAndTransportOptions,
  getDiscountsOptions,
  getRoutesOptions,
  getTimeSlotsOptions
} from 'services/formOptions'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import LineLoader from 'components/LineLoader'
import Button from 'components/Button'
import InputField from 'components/FormFields/InputField'
import { DATE_FORMAT, SEND_DATE_FORMAT } from 'constants/dateFormat'
import CheckboxField from 'components/FormFields/CheckboxField'
import i18n, { resources } from 'i18n/config'
import SelectField from 'components/FormFields/SelectField'
import { getDiscounts } from 'pages/Discounts/store/actions'
import { getDiscountsSelector } from 'pages/Discounts/store/reducers/selectors'
import { getBaggage } from 'pages/Baggage/store/actions'
import { getBaggageSelector } from 'pages/Baggage/store/reducers/selectors'
import { getTransport } from 'pages/Transport/store/actions'
import { getTransportSelector } from 'pages/Transport/store/reducers/selectors'
import { createTrip } from '../../store/actions'

export const indexDays = [1, 2, 3, 4, 5, 6, 0]

export const translationDays = resources[i18n.language].translation.days

const CreateTrip = ({ onClose }) => {
  const { i18n, t } = useTranslation()
  const dispatch = useDispatch()
  const routes = useSelector(getRoutesSelector)
  const discounts = useSelector(getDiscountsSelector)
  const baggages = useSelector(getBaggageSelector)
  const transport = useSelector(getTransportSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.CREATE_TRIP)
  const [disabledDepartureTime, setDisabledDepartureTime] = useState([])
  const [reverseDisabledDepartureTime, setReverseDisabledDepartureTime] = useState([])
  const [addSeasonPrice, setAddSeasonPrice] = useState(null)
  const [seatsSelection, setSeatsSelection] = useState(null)

  const routesOptions = getRoutesOptions(routes)
  const timeSlotsOptions = time => getTimeSlotsOptions(time)
  const discountsOptions = getDiscountsOptions(discounts)
  const baggageOptions = getBaggageOptions(baggages)
  const carrierAndTransportOptions = getCarrierAndTransportOptions(transport)

  useEffect(() => {
    dispatch(getRoutes())
    dispatch(getDiscounts())
    dispatch(getBaggage())
    dispatch(getTransport())
  }, [])

  const handleSubmit = data => {
    dispatch(createTrip({ ...data, seatsSelection }, onClose))
  }

  const getRouteById = id => {
    const route = routes?.find(route => route._id === id)
    if (!disabledDepartureTime?.length) {
      setDisabledDepartureTime(route?.points?.map((_, index) => index + 1))
    }
    if (!reverseDisabledDepartureTime?.length) {
      setReverseDisabledDepartureTime(route?.points?.map((_, index) => index + 1))
    }
    return route
  }

  const getRoutesCity = id => {
    const route = getRouteById(id)
    return `${route.departure.city[i18n.language]} - ${route.arrival.city[i18n.language]}`
  }

  const getReverseRoutesCity = id => {
    const route = getRouteById(id)
    return `${route.arrival.city[i18n.language]} - ${route.departure.city[i18n.language]}`
  }

  const handleChangeDepartureTime = index => () => {
    setDisabledDepartureTime(prev => {
      if (prev.length !== 1) {
        return prev.filter(item => item !== index + 1)
      }
      return prev
    })
  }

  const handleChangeReverseDepartureTime = index => () => {
    setReverseDisabledDepartureTime(prev => {
      if (prev.length !== 1) {
        return prev.filter(item => item !== index + 1)
      }
      return prev
    })
  }

  const handleAddSeasonPrice = () => {
    setAddSeasonPrice(true)
  }

  const handleRemoveSeasonPrice = () => {
    setAddSeasonPrice(false)
  }

  const handleTrueSeatsSelection = () => {
    setSeatsSelection(true)
  }

  const handleFalseSeatsSelection = () => {
    setSeatsSelection(false)
  }

  return (
    <div>
      <div>{t('pages.trip.addNewTrip')}</div>
      <br />
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <div>{t('pages.trip.chooseRoute')}</div>
                <ColumnsGridStyled columns={1}>
                  <SearchBySelectField
                    name={'route'}
                    label={t('pages.trip.route')}
                    options={routesOptions}
                    required
                    removeAsterisk
                  />
                </ColumnsGridStyled>
              </div>
              <br />
              {values?.route && (
                <>
                  <div>
                    <div>
                      {t('pages.trip.schedule').replace(
                        ':route',
                        getRoutesCity(values.route.value)
                      )}
                    </div>
                    <div>{t('pages.trip.scheduleDescription')}</div>
                    <ColumnsGridStyled columns={3}>
                      <InputField
                        name={'startDate'}
                        label={t('pages.trip.startDate')}
                        placeholder={' '}
                        type={'date'}
                        min={moment().add(1, 'day').format(SEND_DATE_FORMAT)}
                        required
                        removeAsterisk
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
                  </div>
                  <br />
                </>
              )}
              {values?.startDate && values?.endDate && (
                <>
                  <div>
                    <hr />
                    <br />
                    <div>
                      {t('pages.trip.departureDaysDescription')
                        .replace(':route', getRoutesCity(values.route.value))
                        .replace(':date', moment(values.startDate).format(DATE_FORMAT))}
                    </div>
                    <CheckboxFieldBlock>
                      {indexDays.map(item => (
                        <CheckboxField
                          key={item}
                          name={'day' + item}
                          label={translationDays[item]}
                          initialValue={
                            moment(values.startDate).format('dd') ===
                              translationDays[item].toLowerCase() ||
                            moment(values.endDate).format('dd') ===
                              translationDays[item].toLowerCase()
                          }
                          disabled={
                            moment(values.startDate).format('dd') ===
                              translationDays[item].toLowerCase() ||
                            moment(values.endDate).format('dd') ===
                              translationDays[item].toLowerCase()
                          }
                        />
                      ))}
                    </CheckboxFieldBlock>
                  </div>
                  <br />
                </>
              )}
              {values?.startDate && values?.endDate && (
                <div>
                  <hr />
                  <br />
                  <div>{t('pages.trip.departureTimeDescription')}</div>
                  {getRouteById(values.route.value)?.points &&
                    [...getRouteById(values.route.value).points].map((item, index) => (
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
                              disabled={index === 0 || disabledDepartureTime.includes(index)}
                              required
                              removeAsterisk
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
                              disabled={disabledDepartureTime.includes(index)}
                              onHandleChange={handleChangeDepartureTime(index)}
                              required
                              removeAsterisk
                            />
                          </ColumnsGridStyled>
                        </RoutePointsBlock>
                        <hr />
                      </Fragment>
                    ))}
                </div>
              )}

              {values[
                'departureTime' + (getRouteById(values?.route?.value)?.points?.length - 1)
              ] && (
                <>
                  <br />
                  <div>
                    <div>{t('pages.trip.scheduleDescription')}</div>
                    <ColumnsGridStyled columns={3}>
                      <InputField
                        name={'reverseStartDate'}
                        label={t('pages.trip.startDate')}
                        placeholder={' '}
                        type={'date'}
                        min={moment().add(1, 'day').format(SEND_DATE_FORMAT)}
                        required
                        removeAsterisk
                      />
                      <InputField
                        name={'reverseEndDate'}
                        label={t('pages.trip.endDate')}
                        placeholder={' '}
                        type={'date'}
                        min={moment(values?.reverseStartDate)
                          .add(values?.reverseStartDate ? 0 : 1, 'day')
                          .format(SEND_DATE_FORMAT)}
                        required
                        removeAsterisk
                      />
                    </ColumnsGridStyled>
                  </div>
                  <br />
                </>
              )}
              {values?.reverseStartDate && values?.reverseEndDate && (
                <>
                  <div>
                    <hr />
                    <br />
                    <div>
                      {t('pages.trip.departureDaysDescription')
                        .replace(':route', getReverseRoutesCity(values.route.value))
                        .replace(':date', moment(values.reverseStartDate).format(DATE_FORMAT))}
                    </div>
                    <CheckboxFieldBlock>
                      {indexDays.map(item => (
                        <CheckboxField
                          key={item}
                          name={'reverseDay' + item}
                          label={translationDays[item]}
                          initialValue={
                            moment(values.reverseStartDate).format('dd') ===
                              translationDays[item].toLowerCase() ||
                            moment(values.reverseEndDate).format('dd') ===
                              translationDays[item].toLowerCase()
                          }
                          disabled={
                            moment(values.reverseStartDate).format('dd') ===
                              translationDays[item].toLowerCase() ||
                            moment(values.reverseEndDate).format('dd') ===
                              translationDays[item].toLowerCase()
                          }
                        />
                      ))}
                    </CheckboxFieldBlock>
                  </div>
                  <br />
                </>
              )}
              {values?.reverseStartDate && values?.reverseEndDate && (
                <div>
                  <hr />
                  <br />
                  <div>{t('pages.trip.departureTimeDescription')}</div>
                  {getRouteById(values.route.value)?.points &&
                    [...getRouteById(values.route.value).points].reverse().map((item, index) => (
                      <Fragment key={index}>
                        <RoutePointsBlock>
                          <div>
                            <div>{item.city[i18n.language]}</div>
                            <div>{item.country[i18n.language]}</div>
                          </div>
                          <ColumnsGridStyled columns={2}>
                            <InputField
                              name={'reverseDepartureDate' + index}
                              label={t('pages.trip.date')}
                              placeholder={' '}
                              type={'date'}
                              min={moment(values.reverseStartDate).format(SEND_DATE_FORMAT)}
                              initialValue={moment(
                                values['reverseDepartureDate' + (index - 1)] ||
                                  values.reverseStartDate
                              ).format(SEND_DATE_FORMAT)}
                              disabled={index === 0 || reverseDisabledDepartureTime.includes(index)}
                              required
                              removeAsterisk
                            />
                            <SelectField
                              name={'reverseDepartureTime' + index}
                              label={t('pages.trip.time')}
                              options={timeSlotsOptions(
                                values['reverseDepartureDate' + index] ===
                                  values['reverseDepartureDate' + (index - 1)]
                                  ? values['reverseDepartureTime' + (index - 1)]
                                  : null
                              )}
                              disabled={reverseDisabledDepartureTime.includes(index)}
                              onHandleChange={handleChangeReverseDepartureTime(index)}
                              required
                              removeAsterisk
                            />
                          </ColumnsGridStyled>
                        </RoutePointsBlock>
                        <hr />
                      </Fragment>
                    ))}
                </div>
              )}

              {values[
                'reverseDepartureTime' + (getRouteById(values?.route?.value)?.points?.length - 1)
              ] && (
                <div>
                  <br />
                  <div>{t('pages.trip.addPrices')}</div>
                  <ColumnsGridStyled columns={2}>
                    <InputField
                      name={'owPrice'}
                      label={'ow price, EUR | €'}
                      type={'number'}
                      required
                      removeAsterisk
                    />
                    <InputField
                      name={'rtPrice'}
                      label={'rt price, EUR | €'}
                      type={'number'}
                      required
                      removeAsterisk
                    />
                  </ColumnsGridStyled>
                  <br />
                  <AddSeasonPrice>
                    <div>
                      {addSeasonPrice
                        ? t('pages.trip.seasonPrice')
                        : t('pages.trip.addSeasonPrice')}
                    </div>
                    {addSeasonPrice === null ? (
                      <div>
                        <Button onClick={handleAddSeasonPrice} size={'small'}>
                          {t('common.yes')}
                        </Button>
                        <Button onClick={handleRemoveSeasonPrice} size={'small'}>
                          {t('common.no')}
                        </Button>
                      </div>
                    ) : addSeasonPrice ? (
                      <Button onClick={handleRemoveSeasonPrice} size={'small'}>
                        {t('common.delete')}
                      </Button>
                    ) : (
                      <Button onClick={handleAddSeasonPrice} size={'small'}>
                        {t('common.add')}
                      </Button>
                    )}
                  </AddSeasonPrice>
                  {addSeasonPrice && (
                    <>
                      <ColumnsGridStyled columns={2}>
                        <InputField
                          name={'seasonOwPrice'}
                          label={'season ow price, EUR | €'}
                          type={'number'}
                          required
                          removeAsterisk
                        />
                        <InputField
                          name={'seasonRtPrice'}
                          label={'season rt price, EUR | €'}
                          type={'number'}
                          required
                          removeAsterisk
                        />
                      </ColumnsGridStyled>
                      <br />
                      <div>{t('pages.trip.seasonPriceDate')}</div>
                      <ColumnsGridStyled columns={3}>
                        <InputField
                          name={'seasonStartDate'}
                          label={t('pages.trip.startDate')}
                          placeholder={' '}
                          type={'date'}
                          required
                          removeAsterisk
                        />
                        <InputField
                          name={'seasonEndDate'}
                          label={t('pages.trip.endDate')}
                          placeholder={' '}
                          type={'date'}
                          required
                          removeAsterisk
                        />
                      </ColumnsGridStyled>
                    </>
                  )}
                  {((values?.owPrice && values?.rtPrice && addSeasonPrice === false) ||
                    (addSeasonPrice &&
                      values?.seasonOwPrice &&
                      values?.seasonRtPrice &&
                      values?.seasonStartDate &&
                      values?.seasonEndDate)) && (
                    <>
                      <div>
                        <br />
                        <hr />
                        <br />
                        <div>{t('pages.trip.addDiscounts')}</div>
                        <ColumnsGridStyled columns={1}>
                          <SelectField
                            name={'discounts'}
                            label={t('pages.trip.discounts')}
                            options={discountsOptions}
                            multiple
                          />
                        </ColumnsGridStyled>
                      </div>
                      <div>
                        <br />
                        <div>{t('pages.trip.addBaggage')}</div>
                        <ColumnsGridStyled columns={1}>
                          <SelectField
                            name={'baggage'}
                            label={t('pages.trip.baggage')}
                            options={baggageOptions}
                            multiple
                          />
                        </ColumnsGridStyled>
                      </div>
                      <div>
                        <br />
                        <div>{t('pages.trip.chooseCarrier')}</div>
                        <ColumnsGridStyled columns={1}>
                          <SelectField
                            name={'carrierAndTransport'}
                            label={t('pages.trip.carrierAndTransport')}
                            options={carrierAndTransportOptions}
                            required
                            removeAsterisk
                          />
                        </ColumnsGridStyled>
                      </div>
                    </>
                  )}
                </div>
              )}
              {values?.carrierAndTransport && (
                <div>
                  <br />
                  <div>{t('pages.trip.chooseSeats')}</div>
                  <ColumnsGridStyled columns={2}>
                    <СhooseSeatsButton onClick={handleTrueSeatsSelection} active={seatsSelection}>
                      {t('common.yes')}
                    </СhooseSeatsButton>
                    <СhooseSeatsButton
                      onClick={handleFalseSeatsSelection}
                      active={seatsSelection === false}
                    >
                      {t('common.no')}
                    </СhooseSeatsButton>
                  </ColumnsGridStyled>
                </div>
              )}
              <ButtonBlock>
                {loading ? (
                  <LineLoader />
                ) : (
                  <Button type={'submit'} disabled={seatsSelection === null}>
                    {t('common.add')}
                  </Button>
                )}
              </ButtonBlock>
            </form>
          )
        }}
      />
    </div>
  )
}

export default CreateTrip
