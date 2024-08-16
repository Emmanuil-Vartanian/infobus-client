import moment from 'moment'

const calculateDuration = (from, to) => {
  const start = new Date(`${from.date}T${from.time}`)
  const end = new Date(`${to.date}T${to.time}`)
  const diff = end - start
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return {
    days,
    hours,
    minutes,
    milliseconds: diff
  }
}

export const directionsData = points => {
  const directions = []

  const createDirection = (from, to, dfbOrder) => ({
    dfb_order: dfbOrder,
    departure: from,
    arrival: to,
    duration: calculateDuration(from, to)
  })

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      directions.push(createDirection(points[i], points[j], directions.length + 1))
    }
  }

  return directions
}

const getDayOfWeek = dateString => new Date(dateString).getDay()

const getDaysDifference = (startDate, endDate) => {
  const start = moment(startDate)
  const end = moment(endDate)
  return end.diff(start, 'days')
}

export const transformCreateTripData = originalJson => {
  const createPoint = (point, date, time, startDate, endDate, index) => {
    const daysDifference = getDaysDifference(startDate, endDate)
    const secondDate = moment(date).add(daysDifference, 'days').format('YYYY-MM-DD')

    const firstPoint = index === 0 ? { start_date: startDate, end_date: endDate } : {}

    return {
      ...point,
      ...firstPoint,
      date,
      time,
      days_of_week: [...new Set([getDayOfWeek(date), getDayOfWeek(secondDate)])].sort(
        (a, b) => a - b
      ),
      date_list: [...new Set([date, secondDate])],
      active: false
    }
  }

  const points = originalJson.route.points.map((point, index) =>
    createPoint(
      point,
      originalJson[`departureDate${index}`],
      originalJson[`departureTime${index}`],
      originalJson.startDate,
      originalJson.endDate,
      index
    )
  )

  const reversePoints = originalJson.route.points
    .slice()
    .reverse()
    .map((point, index) =>
      createPoint(
        point,
        originalJson[`reverseDepartureDate${index}`],
        originalJson[`reverseDepartureTime${index}`],
        originalJson.reverseStartDate,
        originalJson.reverseEndDate,
        index
      )
    )

  return {
    departure: points[0],
    arrival: points[points.length - 1],
    points,
    directions: directionsData(points),
    total_duration: calculateDuration(points[0], points[points.length - 1]),
    seats_selection: String(originalJson.seatsSelection),
    reverse_trip_departure: reversePoints[0],
    reverse_trip_arrival: reversePoints[reversePoints.length - 1],
    reverse_trip_points: reversePoints,
    reverse_trip_directions: directionsData(reversePoints),
    reverse_trip_total_duration: calculateDuration(
      reversePoints[0],
      reversePoints[reversePoints.length - 1]
    ),
    prices: {
      ow_price: originalJson.owPrice,
      rt_price: originalJson.rtPrice,
      season_ow_price: originalJson?.seasonOwPrice || '',
      season_rt_price: originalJson?.seasonRtPrice || '',
      start_season_date: originalJson?.seasonStartDate || '',
      end_season_date: originalJson?.seasonEndDate || ''
    },
    discounts: originalJson?.discounts || [],
    baggage: originalJson?.baggage || [],
    transport: originalJson.carrierAndTransport
  }
}

export const transformUpdateScheduleTripData = originalJson => {
  const points = originalJson.points.map((point, index) => {
    const date = originalJson[`departureDate${index}`]
    const time = originalJson[`departureTime${index}`]

    const daysDifference = getDaysDifference(originalJson.startDate, originalJson.endDate)
    const secondDate = moment(date).add(daysDifference, 'days').format('YYYY-MM-DD')

    const firstPoint =
      index === 0 ? { start_date: originalJson.startDate, end_date: originalJson.endDate } : {}

    return {
      ...point,
      ...firstPoint,
      date,
      time,
      days_of_week: [...new Set([getDayOfWeek(date), getDayOfWeek(secondDate)])].sort(
        (a, b) => a - b
      ),
      date_list: [...new Set([date, secondDate])]
    }
  })

  return {
    points,
    departure: points[0],
    arrival: points[points.length - 1],
    directions: directionsData(points)
  }
}

export const transformUpdateRouteTripData = (
  pointsData,
  originalJson,
  locations,
  isReverse = false
) => {
  if (isReverse) {
    pointsData.reverse()
  }

  const points = pointsData.map((point, index) => {
    const location = address => locations.find(location => location._id === address)

    const address = originalJson[`address${index}`]
      ? { address: location(originalJson[`address${index}`]).address }
      : {}

    const addressForWeek = originalJson.enableRouteSettings
      ? {
          address_for_week: Array.from({ length: 7 }, (_, day) => ({
            [day]: {
              address: location(originalJson[`addressForWeek${index}${day}`])?.address || '',
              name: location(originalJson[`addressForWeek${index}${day}`])?.name || ''
            }
          })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
        }
      : {}

    return {
      ...point,
      ...address,
      ...addressForWeek
    }
  })

  if (isReverse) {
    points.reverse()
  }

  return {
    points,
    departure: points[0],
    arrival: points[points.length - 1]
  }
}
