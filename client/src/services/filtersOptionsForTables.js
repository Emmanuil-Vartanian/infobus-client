import { FILTER_PROPERTIES_NAMES } from 'constants/filterPropertiesNames'
import i18n from 'i18n/config'
import { sortBy, uniq } from 'lodash'
import {
  getAccessOptions,
  getBaggageTypeOptions,
  getBookingsStatusesOptions,
  getDiscountsTypeOptions,
  getOptionsWithoutTranslate,
  getUsersRoleOptions
} from './formOptions'
import moment from 'moment'
import { DATE_FORMAT } from 'constants/dateFormat'

const removeDuplicateValues = array => uniq(array).filter(item => item)

const departureOptions = tableData => {
  const maxWidthByLang = { de: 110, ru: 164, ua: 164 }

  return {
    name: FILTER_PROPERTIES_NAMES.DEPARTURE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item[FILTER_PROPERTIES_NAMES.DEPARTURE]?.city[i18n.language])
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const arrivalOptions = tableData => {
  const maxWidthByLang = { de: 120, ru: 150, ua: 140 }

  return {
    name: FILTER_PROPERTIES_NAMES.ARRIVAL,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item[FILTER_PROPERTIES_NAMES.ARRIVAL]?.city[i18n.language])
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const departureCountryOptions = tableData => {
  const maxWidthByLang = { de: 110, ru: 164, ua: 164 }

  return {
    name: FILTER_PROPERTIES_NAMES.DEPARTURE_COUNTRY,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item[FILTER_PROPERTIES_NAMES.DEPARTURE]?.country[i18n.language])
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const arrivalCountryOptions = tableData => {
  const maxWidthByLang = { de: 120, ru: 150, ua: 140 }

  return {
    name: FILTER_PROPERTIES_NAMES.ARRIVAL_COUNTRY,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item[FILTER_PROPERTIES_NAMES.ARRIVAL]?.country[i18n.language])
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const createdAtOptions = tableData => {
  const maxWidthByLang = { de: 130, ru: 120, ua: 150 }

  return {
    name: FILTER_PROPERTIES_NAMES.CREATED_AT,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => moment(item[FILTER_PROPERTIES_NAMES.CREATED_AT]).format(DATE_FORMAT))
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const departureDateOptions = tableData => {
  const maxWidthByLang = { de: 130, ru: 120, ua: 120 }

  return {
    name: FILTER_PROPERTIES_NAMES.DEPARTURE_DATE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => moment(item[FILTER_PROPERTIES_NAMES.DEPARTURE]?.date).format(DATE_FORMAT))
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const returnDepartureDateOptions = tableData => {
  const maxWidthByLang = { de: 140, ru: 170, ua: 150 }

  return {
    name: FILTER_PROPERTIES_NAMES.RETURNT_DEPARTURE_DATE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item =>
          item['departure_reverse']
            ? moment(item['departure_reverse']?.date).format(DATE_FORMAT)
            : null
        )
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const statusOptions = tableData => {
  const maxWidthByLang = { de: 80, ru: 90, ua: 90 }

  return {
    name: FILTER_PROPERTIES_NAMES.STATUS,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item[FILTER_PROPERTIES_NAMES.STATUS])
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getBookingsStatusesOptions(sortBy(removedDuplicate))
    }
  }
}

const passengersTripOptions = tableData => {
  const maxWidthByLang = { de: 200, ru: 200, ua: 200 }

  return {
    name: FILTER_PROPERTIES_NAMES.PASSENGER_TRIP,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => {
          return `${item?.main_trip_direction?.departure?.city[i18n.language]} - ${item?.main_trip_direction?.arrival?.city[i18n.language]}`
        })
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const passengerDepartureDateOptions = tableData => {
  const maxWidthByLang = { de: 130, ru: 120, ua: 120 }

  return {
    name: FILTER_PROPERTIES_NAMES.PASSENGER_DEPARTURE_DATE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.date)
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const locationCountryOptions = tableData => {
  const maxWidthByLang = { de: 130, ru: 120, ua: 120 }

  return {
    name: FILTER_PROPERTIES_NAMES.LOCATION_COUNTRY,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.country[i18n.language])
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const locationCityOptions = tableData => {
  const maxWidthByLang = { de: 130, ru: 120, ua: 120 }

  return {
    name: FILTER_PROPERTIES_NAMES.LOCATION_CITY,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.city[i18n.language])
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const agenciesNameOptions = tableData => {
  const maxWidthByLang = { de: 200, ru: 200, ua: 200 }

  return {
    name: FILTER_PROPERTIES_NAMES.AGENCIES_NAME,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.name)
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const agenciesGroupOptions = tableData => {
  const maxWidthByLang = { de: 150, ru: 150, ua: 150 }

  return {
    name: FILTER_PROPERTIES_NAMES.AGENCIES_GROUP,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.consolidator_name)
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const usersRoleOptions = tableData => {
  const maxWidthByLang = { de: 170, ru: 170, ua: 170 }

  return {
    name: FILTER_PROPERTIES_NAMES.USERS_ROLE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.role)
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getUsersRoleOptions(sortBy(removedDuplicate))
    }
  }
}

const usersGroupOptions = tableData => {
  const maxWidthByLang = { de: 170, ru: 170, ua: 170 }

  return {
    name: FILTER_PROPERTIES_NAMES.USERS_GROUP,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.consolidator_name)
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const usersAccessOptions = tableData => {
  const maxWidthByLang = { de: 170, ru: 170, ua: 170 }

  return {
    name: FILTER_PROPERTIES_NAMES.USERS_ACCESS,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => (item.active ? 'active' : 'notActive'))
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getAccessOptions(sortBy(removedDuplicate))
    }
  }
}

const discountsTypeOptions = tableData => {
  const maxWidthByLang = { de: 170, ru: 170, ua: 170 }

  return {
    name: FILTER_PROPERTIES_NAMES.DISCOUNTS_TYPE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.type)
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getDiscountsTypeOptions(sortBy(removedDuplicate))
    }
  }
}

const baggageTypeOptions = tableData => {
  const maxWidthByLang = { de: 170, ru: 170, ua: 170 }

  return {
    name: FILTER_PROPERTIES_NAMES.BAGGAGE_TYPE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.type)
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getBaggageTypeOptions(sortBy(removedDuplicate))
    }
  }
}

const carrierNameOptions = tableData => {
  const maxWidthByLang = { de: 170, ru: 170, ua: 170 }

  return {
    name: FILTER_PROPERTIES_NAMES.CARRIER_NAME,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item.carrier_name)
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getOptionsWithoutTranslate(sortBy(removedDuplicate))
    }
  }
}

const activeOptions = tableData => {
  const maxWidthByLang = { de: 140, ru: 140, ua: 140 }

  return {
    name: FILTER_PROPERTIES_NAMES.ACTIVE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => (item.active ? 'active' : 'notActive'))
        .flat(Infinity)
        .filter(item => item)

      const removedDuplicate = removeDuplicateValues(values)

      return getAccessOptions(sortBy(removedDuplicate))
    }
  }
}

export const tripsPageFilterOptions = tableData => [
  departureOptions(tableData),
  arrivalOptions(tableData)
]

export const advancedTripsPageFilterOptions = tableData => [
  departureOptions(tableData),
  arrivalOptions(tableData),
  carrierNameOptions(tableData),
  agenciesGroupOptions(tableData),
  activeOptions(tableData)
]

export const bookingsPageFilterOptions = tableData => [
  createdAtOptions(tableData),
  departureOptions(tableData),
  departureDateOptions(tableData),
  returnDepartureDateOptions(tableData),
  arrivalOptions(tableData),
  statusOptions(tableData)
]

export const passengersPageFilterOptions = tableData => [
  passengersTripOptions(tableData),
  passengerDepartureDateOptions(tableData)
]

export const locationsPageFilterOptions = tableData => [
  locationCountryOptions(tableData),
  locationCityOptions(tableData)
]

export const agenciesPageFilterOptions = tableData => [
  agenciesNameOptions(tableData),
  agenciesGroupOptions(tableData)
]

export const usersPageFilterOptions = tableData => [
  usersRoleOptions(tableData),
  usersGroupOptions(tableData),
  usersAccessOptions(tableData)
]

export const routesPageFilterOptions = tableData => [
  departureCountryOptions(tableData),
  departureOptions(tableData),
  arrivalOptions(tableData),
  arrivalCountryOptions(tableData)
]

export const discountsPageFilterOptions = tableData => [discountsTypeOptions(tableData)]

export const baggagePageFilterOptions = tableData => [baggageTypeOptions(tableData)]
