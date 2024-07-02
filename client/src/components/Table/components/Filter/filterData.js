import { DATE_FORMAT } from 'constants/dateFormat'
import { FILTER_PROPERTIES_NAMES } from 'constants/filterPropertiesNames'
import i18n from 'i18n/config'
import moment from 'moment'

export const filteredObjects = (objData, dataFilter, allValuesArentNull) => {
  const filteredObjects = () => {
    const newMyObjects = objData?.filter(item => {
      return Object.entries(dataFilter)?.every(([key, value]) => {
        const departure = FILTER_PROPERTIES_NAMES.DEPARTURE
        const arrival = FILTER_PROPERTIES_NAMES.ARRIVAL
        const createdAt = FILTER_PROPERTIES_NAMES.CREATED_AT
        const departureDate = FILTER_PROPERTIES_NAMES.DEPARTURE_DATE
        const returnDepartureDate = FILTER_PROPERTIES_NAMES.RETURNT_DEPARTURE_DATE
        const passengerDepartureDate = FILTER_PROPERTIES_NAMES.PASSENGER_DEPARTURE_DATE
        const passengerTrip = FILTER_PROPERTIES_NAMES.PASSENGER_TRIP
        const locationCountry = FILTER_PROPERTIES_NAMES.LOCATION_COUNTRY
        const locationCity = FILTER_PROPERTIES_NAMES.LOCATION_CITY
        const agenciesName = FILTER_PROPERTIES_NAMES.AGENCIES_NAME
        const agenciesGroup = FILTER_PROPERTIES_NAMES.AGENCIES_GROUP

        if (key === departure || key === arrival) {
          return item[key].city[i18n.language] === value
        } else if (key === createdAt) {
          return value === moment(item[key]).format(DATE_FORMAT)
        } else if (key === departureDate) {
          return value === moment(item[departure].date).format(DATE_FORMAT)
        } else if (key === returnDepartureDate) {
          return value === moment(item['departure_reverse']?.date).format(DATE_FORMAT)
        } else if (key === passengerDepartureDate) {
          return item.date === value
        } else if (key === passengerTrip) {
          const trips = `${
            item?.main_trip_direction.departure?.city[i18n.language]
          } - ${item?.main_trip_direction?.arrival?.city[i18n.language]}`
          return trips === value
        } else if (key === locationCountry || key === locationCity) {
          const keyName = key == locationCountry ? 'country' : 'city'
          return item[keyName][i18n.language] === value
        } else if (key === agenciesName) {
          return item.name === value
        } else if (key === agenciesGroup) {
          return item.consolidator_name === value
        }
      })
    })
    return newMyObjects?.length || allValuesArentNull ? newMyObjects : objData
  }
  return dataFilter ? filteredObjects() : objData || []
}
