import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCountries } from '../store/actions'
import { getCountriesSelector } from '../store/reducers/selectors'

const useCountries = () => {
  const dispatch = useDispatch()
  const [countriesData, setCountriesData] = useState([])
  const countries = useSelector(getCountriesSelector)

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(getCountries())
    }
  }, [])

  useEffect(() => {
    if (countries.length > 0) {
      setCountriesData(countries)
    }
  }, [countries])

  return [countriesData]
}

export default useCountries
