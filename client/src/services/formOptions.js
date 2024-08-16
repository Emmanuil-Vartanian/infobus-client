import i18n from 'i18n/config'
import { LANGUAGES } from 'constants/languages'
import moment from 'moment'
import { DATE_FORMAT_WITH_DAY } from 'constants/dateFormat'

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
      text: moment(item).format(DATE_FORMAT_WITH_DAY),
      value: item
    }
  })

  return options
}

export const getGreetingOptions = () => {
  const options = ['mr', 'mrs'].map((item, index) => {
    return {
      id: index,
      text: i18n.t(`pages.tripSearch.${item}`),
      value: item
    }
  })

  return options
}

export const getDiscountsOptions = discounts => {
  const options = discounts?.map((item, index) => {
    return {
      id: index,
      text: `${item.name[i18n.language]} - ${item.value}%`,
      value: item._id
    }
  })

  return options
}

export const getPaymentOptions = () => {
  const options = ['office', 'bus']?.map((item, index) => {
    return {
      id: index,
      text: i18n.t(`pages.tripSearch.${item}`),
      value: item
    }
  })

  return options
}

export const getOptionsWithoutTranslate = data => {
  const options = data?.map((code, index) => {
    return { id: index, text: code, value: code }
  })

  return options
}

export const getBookingsStatusesOptions = data => {
  const options = data?.map((code, index) => {
    return { id: index, text: i18n.t(`pages.booking.statuses.${code}`), value: code }
  })

  return options
}

export const getEnterpriseFormOptions = () => {
  const options = ['pe', 'ltd'].map((item, index) => {
    return {
      id: index,
      text: i18n.t(`pages.agencies.${item}`),
      value: item
    }
  })

  return options
}

export const getConsolidatorsOptions = data => {
  const options = data?.map((item, index) => {
    return { id: index, text: item.name, value: item._id }
  })
  options.unshift({ id: data.length, text: 'None', value: '' })

  return options
}

export const getAccessOptions = data => {
  const optionsData = data || ['active', 'notActive']

  const options = optionsData.map((item, index) => {
    return {
      id: index,
      text: i18n.t(`common.${item}`),
      value: item
    }
  })

  return options
}

export const getUsersRoleOptions = data => {
  const options = data.map((item, index) => {
    return {
      id: index,
      text: i18n.t(`roles.${item}`),
      value: item
    }
  })

  return options
}

export const getCountriesOptions = data => {
  const options = data.map((item, index) => {
    return {
      id: index,
      text: item.country[i18n.language],
      value: item.country[i18n.language]
    }
  })

  return options
}

export const getCitiesOptions = data => {
  const options = data.map((item, index) => {
    return {
      id: index,
      text: item.city[i18n.language],
      value: item.city[i18n.language]
    }
  })

  return options
}

export const getDiscountsTypeOptions = data => {
  const optionsData = data || ['percent', 'fixed']

  const options = optionsData.map((item, index) => {
    return {
      id: index,
      text: i18n.t(`pages.discounts.${item}`),
      value: item
    }
  })

  return options
}

export const getBaggageTypeOptions = data => {
  const optionsData = data || ['weight', 'price']

  const options = optionsData.map((item, index) => {
    return {
      id: index,
      text: i18n.t(`pages.baggage.${item}`),
      value: item
    }
  })

  return options
}

export const getRoutesOptions = data => {
  const options = data.map((item, index) => {
    const route = item.points.map(({ city }) => city[i18n.language])

    return { id: index, text: route.join(' - '), value: item._id }
  })

  return options
}

export const getTimeSlotsOptions = startTime => {
  const [startHour, startMinute] = startTime?.split(':')?.map(Number) || [0, 0]

  const times = []

  for (let h = startHour; h < 24; h++) {
    for (let m = startTime && h === startHour ? startMinute + 5 : 0; m < 60; m += 5) {
      const hour = h.toString().padStart(2, '0')
      const minute = m.toString().padStart(2, '0')
      times.push(`${hour}:${minute}`)
    }
  }

  const options = times.map((item, index) => {
    return { id: index, text: item, value: item }
  })

  return options
}

export const getBaggageOptions = data => {
  const options = data.map((item, index) => {
    const name = item.name[i18n.language]

    return { id: index, text: name, value: item._id }
  })

  return options
}

export const getCarrierAndTransportOptions = data => {
  const options = data.map((item, index) => {
    const name = `${item.carrier_name} (${item?.consolidator_name || ''})`

    return { id: index, text: name, value: item._id }
  })

  return options
}

export const getLocationsAddressOptions = locations => {
  const options = locations.map((item, index) => {
    return { id: index, text: item.address[i18n.language], value: item._id }
  })

  return options
}
