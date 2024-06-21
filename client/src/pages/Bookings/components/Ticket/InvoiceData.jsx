import React from 'react'
import { locationDistance } from './Ticket'
import { Row10, Row11, Row12, Row5, Row6, Row7, Row8, Row9 } from './style'

const InvoiceData = ({ ticket }) => {
  const taxPercent = 19 / 100 + 1
  const commission = +ticket.commission / 100
  const departureDistance = locationDistance(ticket.locations_info, ticket.departure.city.de)
  const arrivalDistance = locationDistance(ticket.locations_info, ticket.arrival.city.de)

  const coefficientKM = +(departureDistance / (departureDistance + arrivalDistance)).toFixed(3)

  const sumPassengersPrice = ticket.passengers_list.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  )

  const resultSumAndCoefficient = sumPassengersPrice * coefficientKM

  const resultWithTax = +(resultSumAndCoefficient / taxPercent).toFixed(2)

  const zzgl = (resultSumAndCoefficient - resultWithTax).toFixed(2)

  const taxWithCommission = sumPassengersPrice * commission

  const resultCommissionWithTax = +(taxWithCommission / taxPercent).toFixed(2)

  const zzglCommission = (taxWithCommission - resultCommissionWithTax).toFixed(2)

  const invoiceAmount = sumPassengersPrice - taxWithCommission

  const totalAmount = resultSumAndCoefficient - taxWithCommission

  const taxKm = (resultWithTax - resultCommissionWithTax).toFixed(2)

  const zzglKm = (zzgl - zzglCommission).toFixed(2)

  return (
    <div>
      <Row5>
        <p></p>
        <p>
          <span>USt-pflicht. Betrag:</span> {resultWithTax} €
        </p>
        <p>
          <span>zzgl. 19% USt.:</span> {zzgl} €
        </p>
        <p>
          <span>Bruttobetrag:</span> {resultSumAndCoefficient} €
        </p>
        <p></p>
      </Row5>
      <Row6>
        <p>Provision {ticket.commission} %:</p>
        <p>-{taxWithCommission} €</p>
      </Row6>
      <Row7>
        <p></p>
        <p>
          <span>USt-pflicht. Betrag:</span> -{resultCommissionWithTax} €
        </p>
        <p>
          <span>zzgl. 19% USt.:</span> -{zzglCommission} €
        </p>
        <p>
          <span>Bruttobetrag:</span> -{taxWithCommission} €
        </p>
        <p></p>
      </Row7>
      <Row8>
        <p>Rechnungsbetrag:</p>
        <p>{invoiceAmount} €</p>
      </Row8>
      <Row9>
        <p>Gesamt USt-pflicht. Betrag:</p>
        <p>{taxKm} € </p>
        <p>zzgl. 19% USt.:</p>
        <p>{zzglKm} €</p>
        <p>Gutschrift:</p>
        <p>0,00 €</p>
      </Row9>
      <Row10>
        <p>USt. Bruttobetrag:</p>
        <p>{totalAmount} €</p>
        <p>Bereits gezahlt:</p>
        <p>0,00 €</p>
      </Row10>
      <Row11>
        <p>Zahlungsplan:</p>
        <p>Offener Betrag:</p>
        <p>{invoiceAmount} €</p>
      </Row11>
      <Row12>
        <p>Zahlungsziel:</p>
        <p>SOFORT ohne Abzug</p>
      </Row12>
    </div>
  )
}

export default InvoiceData
