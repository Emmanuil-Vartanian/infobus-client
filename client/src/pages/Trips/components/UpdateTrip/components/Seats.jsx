import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Container, SeatBlock, SeatsContainer, SeatsStatus } from './style'

const numbers = [
  45,
  41,
  37,
  33,
  29,
  27,
  25,
  21,
  17,
  13,
  9,
  5,
  1,
  46,
  42,
  38,
  34,
  30,
  28,
  26,
  22,
  18,
  14,
  10,
  6,
  2,
  49,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  50,
  47,
  43,
  39,
  35,
  31,
  null,
  23,
  19,
  15,
  11,
  7,
  3,
  51,
  48,
  44,
  40,
  36,
  32,
  null,
  24,
  20,
  16,
  12,
  8,
  4
]

const Seats = ({
  initialSeats,
  changeForm,
  startDate,
  endDate,
  reservation = false,
  valueDisabledSeats
}) => {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState([])
  const [booked, setBooked] = useState([])

  useEffect(() => {
    if (valueDisabledSeats) {
      setDisabled(valueDisabledSeats)
    }
  }, [valueDisabledSeats])

  useEffect(() => {
    if (!reservation) {
      setDisabled(getInitialSeats('blocked_dates'))
    }
    setBooked(getInitialSeats(!reservation ? 'booked_dates' : 'booked'))
  }, [initialSeats, startDate, endDate])

  const getInitialSeats = keyDates => {
    const newSeats = initialSeats
      .map(seat => {
        if (endDate && seat[keyDates].length > 1) {
          return seat[keyDates].includes(startDate) && seat[keyDates].includes(endDate) && seat.seat
        }

        return seat[keyDates].includes(startDate) && seat.seat
      })
      .filter(item => item)

    if (!reservation) {
      changeForm('disabledSeats', newSeats)
    }

    return newSeats
  }

  const handleSeatClick = seat => () => {
    if (!booked.includes(seat)) {
      const newSeats = disabled.includes(seat)
        ? disabled.filter(s => s !== seat)
        : [...disabled, seat]

      setDisabled(newSeats)

      if (typeof changeForm === 'function') {
        changeForm(
          'disabledSeats',
          newSeats.sort((a, b) => a - b)
        )
      }
    }
  }

  return (
    <Container>
      <SeatsContainer>
        {numbers.map((number, index) => (
          <SeatBlock
            key={index}
            className={`${number === null ? 'empty' : ''} ${disabled.includes(number) ? 'disabled' : ''} ${
              booked.includes(number) ? 'booked' : ''
            }`}
            onClick={handleSeatClick(number)}
          >
            {number}
          </SeatBlock>
        ))}
      </SeatsContainer>
      <div>
        <SeatsStatus>
          <SeatBlock />
          <span> - {t('pages.updateTrip.free')}</span>
        </SeatsStatus>
        <SeatsStatus>
          <SeatBlock className="booked" />
          <span> - {t('pages.updateTrip.booked')}</span>
        </SeatsStatus>
        {!reservation && (
          <SeatsStatus>
            <SeatBlock className="disabled" />
            <span> - {t('pages.updateTrip.disabled')}</span>
          </SeatsStatus>
        )}
      </div>
    </Container>
  )
}

export default Seats
