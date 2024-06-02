import i18n from 'i18n/config'
import { LANGUAGES } from 'constants/languages'
import moment from 'moment'
import { DATE_FORMAT } from 'constants/dateFormat'

export const getLangOptions = () => {
  const languages = Object.keys(LANGUAGES)

  const options = languages.map((item, index) => {
    return {
      id: index,
      text: i18n.t(`languages.${item}`),
      value: item
    }
  })

  return options
}

export const getTripSearchCitiesOptions = locations => {
  const options = locations
    .map((item, index) => {
      return {
        id: index,
        text: `${item.city[i18n.language]} (${item.country[i18n.language]})`,
        value: item.city
      }
    })
    .sort((a, b) => (a.text < b.text ? -1 : 1))

  return options
}

export const getReservationDatesOptions = (dates, afterDate) => {
  const futureDates = dates?.filter(date => moment(date).isAfter(afterDate || moment()))

  const options = futureDates?.map((item, index) => {
    return {
      id: index,
      text: moment(item).format(DATE_FORMAT),
      value: item
    }
  })

  return options
}

export const getGreetingOptions = () => {
  const options = ['mister', 'missusMiss'].map((item, index) => {
    return {
      id: index,
      text: i18n.t(`pages.tripSearch.${item}`),
      value: index === 0 ? 'mr' : 'mrs'
    }
  })

  return options
}

export const getDiscountsOptions = discounts => {
  const options = discounts?.map((item, index) => {
    return {
      id: index,
      text: `${item.name[i18n.language]} - ${item.value}%`,
      value: item
    }
  })

  return options
}
