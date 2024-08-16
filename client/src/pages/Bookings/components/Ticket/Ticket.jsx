import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import moment from 'moment'

import {
  BusInfoBlock,
  CheckBlock,
  CheckTableBlock,
  DownloadTicket,
  InvoiceText,
  ParticipantBlock,
  PaymentBlock,
  ReiseText,
  TicketBackground,
  TicketData,
  TicketLogo,
  TicketUserBlock,
  UserRightBlock
} from './style'

import logoRz from 'assets/logo-rz.jpg'
import { getTicket } from 'pages/Bookings/store/actions'
import { ticketSelector } from 'pages/Bookings/store/reducers/selectors'
import useLoadingEffect from 'services/hooks/useLoadingEffect'
import { EFFECT_LOADING } from 'constants/effectLoading'
import CircularProgress from 'components/CircularProgress'
import de from 'i18n/languages/de'
import { DATE_FORMAT } from 'constants/dateFormat'
import { generatePdf } from 'services/generatePdf'
import { getCurrentUserRoleSelector } from 'pages/Login/store/reducers/selectors'
import { ROLES } from 'constants/roles'
import InvoiceData from './InvoiceData'

export const locationDistance = (locations_info, city) => {
  const distance = locations_info.find(item => item?.city?.de === city)
  return distance?.distance
}

const Ticket = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { pathname } = useLocation()
  const ticket = useSelector(ticketSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_TICKET)
  const role = useSelector(getCurrentUserRoleSelector)

  const invoice = pathname.includes('invoice')

  const isAgencyRole = role === ROLES.AGENCY_MANAGER

  useEffect(() => {
    dispatch(getTicket(id))
  }, [id])

  return loading || !ticket ? (
    <CircularProgress />
  ) : (
    <>
      <DownloadTicket onClick={generatePdf('trip')}>Download PDF</DownloadTicket>
      <TicketBackground>
        <TicketData id="ticket">
          <TicketLogo>
            <img src={logoRz} alt="logo" />
            <span>REISE-ZENTRUM</span>
          </TicketLogo>
          <TicketUserBlock>
            <div>
              <ReiseText>REISE-ZENTRUM · Hirzerweg 11 · 12107 · Berlin</ReiseText>
              <div>
                {!isAgencyRole ? de.pages.tripSearch[ticket.user_data?.salutation] : 'Reisebüro'}
              </div>
              <div>
                {!isAgencyRole
                  ? `${ticket.user_data?.user_first_name} ${ticket.user_data?.user_last_name}`
                  : `${ticket.agency_info?.short_name} Inh. ${ticket.agency_info?.enterprise_owner}`}
              </div>
              <div>{!isAgencyRole ? ticket.user_data?.street : ticket.agency_info?.street}</div>
              <div>
                {!isAgencyRole
                  ? `${ticket.user_data?.postal_code} ${ticket.user_data?.city}`
                  : `${ticket.agency_info?.postal_code} ${ticket.agency_info?.city}`}
              </div>
              {role === ROLES.AGENCY_MANAGER && <div>Steuernr.: {ticket.agency_info?.tax}</div>}
            </div>
            <UserRightBlock>
              <div>
                <span>Datum:</span> <span>{moment().format(DATE_FORMAT)}</span>
              </div>
              <div>
                <span>Auftrag Nr:</span> <span>{ticket.buch}</span>
              </div>
              <div>
                <span>Auftragsdatum:</span>
                <span>{moment(ticket.createdAt).format(DATE_FORMAT)}</span>
              </div>
              <div>
                <span>Bearbeiter:</span> <span>Natalia Althof</span>
              </div>
            </UserRightBlock>
          </TicketUserBlock>
          <CheckBlock>
            <div>
              <h3>Telefon: 030-30343979</h3>
              <p>zu einem Vermittlungsauftrag</p>
            </div>
            <UserRightBlock>
              <div>
                <span>Kd.Telefon:</span> <span>{ticket.passengers_contact_tel}</span>
              </div>
            </UserRightBlock>
          </CheckBlock>
          <div>
            <CheckTableBlock style={{ fontWeight: '500' }}>
              <p>BUS Abfahrt</p>
              <p>Beförderer</p>
              <p>Reiseroute</p>
              <p>Ankunft</p>
              <p>BRD Strecke</p>
              <p>Rest Strecke</p>
            </CheckTableBlock>
            <CheckTableBlock>
              <p>
                {moment(ticket.departure.date).format(DATE_FORMAT)}, {ticket.departure.time}
              </p>
              <p>{ticket.carrier_name}</p>
              <p>
                {ticket.departure.city.de} -&gt; {ticket.arrival.city.de}
              </p>
              <p>
                {moment(ticket.arrival.date).format(DATE_FORMAT)}, {ticket.arrival.time}
              </p>
              <p>{locationDistance(ticket?.locations_info, ticket.departure?.city?.de)} Km</p>
              <p>{locationDistance(ticket?.locations_info, ticket.arrival?.city?.de)} Km</p>
            </CheckTableBlock>
            <BusInfoBlock>
              <p></p>
              <p>
                <span>Abfahrt Hin:</span> {ticket.departure?.address?.de}
              </p>
              <p>
                <span>Abfahrt Zurück:</span> {ticket.arrival?.address?.de}
              </p>
            </BusInfoBlock>
            {Object.keys(ticket.departure_reverse).length ? (
              <>
                <CheckTableBlock>
                  <p>
                    {moment(ticket.departure_reverse?.date).format(DATE_FORMAT)},{' '}
                    {ticket.departure_reverse?.time}
                  </p>
                  <p>{ticket.carrier_name}</p>
                  <p>
                    {ticket.departure_reverse?.city?.de} -&gt; {ticket.arrival_reverse?.city?.de}
                  </p>
                  <p>
                    {moment(ticket.arrival_reverse?.date).format(DATE_FORMAT)},{' '}
                    {ticket.arrival_reverse?.time}
                  </p>
                  <p>{locationDistance(ticket?.locations_info, ticket.departure?.city?.de)} Km</p>
                  <p>{locationDistance(ticket?.locations_info, ticket.arrival?.city?.de)} Km</p>
                </CheckTableBlock>

                <BusInfoBlock>
                  <p></p>
                  <p>
                    <span>Abfahrt Hin:</span> {ticket.departure_reverse?.address?.de}
                  </p>
                  <p>
                    <span>Abfahrt Zurück:</span> {ticket.arrival_reverse?.address?.de}
                  </p>
                </BusInfoBlock>
              </>
            ) : null}
            <ParticipantBlock style={{ fontWeight: '500', marginTop: '20px' }}>
              <p>Teilnehmer:</p>
              <p>Geb.Datum</p>
              <p>Passnummer</p>
              <p>Platz</p>
              <p>Reduziert auf</p>
              <p>Preis</p>
            </ParticipantBlock>
            {ticket.passengers_list.map((item, index) => (
              <ParticipantBlock key={index}>
                <p>
                  {index + 1}. {item.last_name} / {item.first_name}
                </p>
                <p>{moment(item.birth_date).format(DATE_FORMAT)}</p>
                <p>{item.passport_id}</p>
                <p>
                  <span></span>
                </p>
                <p></p>
                <p>{item.price}.00 €</p>
              </ParticipantBlock>
            ))}
            {invoice ? (
              <InvoiceData ticket={ticket} isAgencyRole={isAgencyRole} />
            ) : (
              <PaymentBlock>
                <p>Zahlung beim Einsteigen im Bus:</p>
                <p>0.00 €</p>
              </PaymentBlock>
            )}
          </div>
          <InvoiceText>{invoice ? ticket.invoice_text : ticket.ticket_text}</InvoiceText>
        </TicketData>
      </TicketBackground>
    </>
  )
}

export default Ticket
