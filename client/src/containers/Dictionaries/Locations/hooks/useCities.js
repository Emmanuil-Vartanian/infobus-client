import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCities } from '../store/actions'
import { locationsSelector } from '../store/reducers/selectors'

const useCities = () => {
  const dispatch = useDispatch()
  const [citiesData, setCitiesData] = useState([])
  const locations = useSelector(locationsSelector)

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getCities())
    }
  }, [])

  useEffect(() => {
    if (locations.length > 0) {
      setCitiesData(locations)
    }
  }, [locations])

  return [citiesData]
}

export default useCities
