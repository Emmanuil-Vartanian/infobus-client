import { FILTER_PROPERTIES_NAMES } from 'constants/filterPropertiesNames'
import i18n from 'i18n/config'
import { sortBy, uniq } from 'lodash'
import { getBookingsStatusesOptions, getOptionsWithoutTranslate } from './formOptions'
import moment from 'moment'
import { DATE_FORMAT } from 'constants/dateFormat'

// import { getCountriesOptions } from './formOptions'

const removeDuplicateValues = array => uniq(array).filter(item => item)

// const dataOptions = (tableData, myObjectPropertyName, childrenPropertyName, needSortBy = false) => {
//   let values = tableData
//     .map(item => item[myObjectPropertyName])
//     .flat(Infinity)
//     .filter(item => item)

//   // if (isObject(values[0]) && values[0].hasOwnProperty(childrenPropertyName)) {
//   //   values = values?.map(item => item[childrenPropertyName])
//   // }

//   const removedDuplicate = removeDuplicateValues(values)

//   return needSortBy ? sortBy(removedDuplicate) : removedDuplicate
// }

const departureOptions = tableData => {
  const maxWidthByLang = { de: 110, ru: 164, ua: 164 }

  return {
    name: FILTER_PROPERTIES_NAMES.DEPARTURE,
    maxWidth: maxWidthByLang[i18n.language],
    option: () => {
      const values = tableData
        .map(item => item[FILTER_PROPERTIES_NAMES.DEPARTURE].city[i18n.language])
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
        .map(item => item[FILTER_PROPERTIES_NAMES.ARRIVAL].city[i18n.language])
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
        .map(item => moment(item[FILTER_PROPERTIES_NAMES.DEPARTURE].date).format(DATE_FORMAT))
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

export const tripsPageFilterOptions = tableData => [
  departureOptions(tableData),
  arrivalOptions(tableData)
]

export const bookingsPageFilterOptions = tableData => [
  createdAtOptions(tableData),
  departureOptions(tableData),
  departureDateOptions(tableData),
  returnDepartureDateOptions(tableData),
  arrivalOptions(tableData),
  statusOptions(tableData)
]
