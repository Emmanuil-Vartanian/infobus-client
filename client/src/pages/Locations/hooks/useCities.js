import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCities } from '../store/actions'
import { getCitiesSelector } from '../store/reducers/selectors'

const useCities = () => {
  const dispatch = useDispatch()
  const [citiesData, setCitiesData] = useState([])
  const cities = useSelector(getCitiesSelector)

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(getCities())
    }
  }, [])

  useEffect(() => {
    if (cities.length > 0) {
      setCitiesData(cities)
    }
  }, [cities])

  return [citiesData]
}

export default useCities
