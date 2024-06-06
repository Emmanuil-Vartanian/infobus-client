import React, { useEffect } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import moment from 'moment'

import {
  BusInfoBlock,
  CheckBlock,
  CheckTableBlock,
  DownloadTicket,
  FooterBlock,
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

const Ticket = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const ticket = useSelector(ticketSelector)
  const loading = useLoadingEffect(EFFECT_LOADING.GET_TICKET)

  useEffect(() => {
    dispatch(getTicket(id))
  }, [id])

  const generatePdf = () => {
    const input = document.getElementById('ticket')
    html2canvas(input)
      // eslint-disable-next-line promise/always-return
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4', true)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 0
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
        pdf.save('invoice.pdf')
      })
      .catch(error => {
        console.error('Error generating PDF:', error)
      })
  }

  return loading || !ticket ? (
    <CircularProgress />
  ) : (
    <>
      <DownloadTicket onClick={generatePdf}>Download PDF</DownloadTicket>
      <TicketBackground>
        <TicketData id="ticket">
          <TicketLogo>
            <img src={logoRz} alt="logo" />
            <span>REISE-ZENTRUM</span>
          </TicketLogo>
          <TicketUserBlock>
            <div>
              <ReiseText>REISE-ZENTRUM · Hirzerweg 11 · 12107 · Berlin</ReiseText>
              <div>{de.pages.tripSearch[ticket.user_data.salutation]}</div>
              <div>
                {ticket.user_data.user_first_name} {ticket.user_data.user_last_name}
              </div>
              <div>{ticket.user_data.street}</div>
              <div>
                {ticket.user_data.postal_code} {ticket.user_data.city}
              </div>
            </div>
            <UserRightBlock>
              <div>
                <span>Datum:</span> <span>{moment().format(DATE_FORMAT)}</span>
              </div>
              <div>
                <span>Auftrag Nr:</span> <span></span>
              </div>
              <div>
                <span>Auftragsdatum:</span>
                <span>{moment(ticket.createdAt).format(DATE_FORMAT)}</span>
              </div>
              <div>
                <span>Bearbeiter:</span> <span>Natalia Althof</span>
              </div>
              <div>
                <span></span> <span>030-30343979</span>
              </div>
            </UserRightBlock>
          </TicketUserBlock>
          <CheckBlock>
            <div>
              <h3>Rechnung / Gutschrift Nr.:</h3>
              <p>zu einem Vermittlungsauftrag</p>
            </div>
            <UserRightBlock>
              <div>
                <span>Kd.Telefon:</span> <span>{ticket.user_data.contact_tel_mobile}</span>
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
              <p>105 Km</p>
              <p>512 Km</p>
            </CheckTableBlock>
            {Object.keys(ticket.departure_reverse).length ? (
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
                <p>105 Km</p>
                <p>512 Km</p>
              </CheckTableBlock>
            ) : null}
            <BusInfoBlock>
              <p>
                <span>Abfahrt Hin:</span> {ticket.departure.address.de}
              </p>
              <p>
                <span>Abfahrt Zurück:</span> {ticket.arrival.address.de}
              </p>
            </BusInfoBlock>
            <ParticipantBlock style={{ fontWeight: '500' }}>
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
            <PaymentBlock>
              <p>Zahlung beim Einsteigen im Bus:</p>
              <p>0.00 €</p>
            </PaymentBlock>
          </div>
          <InvoiceText>{ticket.invoice_text}</InvoiceText>
          <FooterBlock>
            <div>
              <p>REISE-ZENTRUM</p>
              <p>Hirzerweg 11</p>
              <p>12107 Berlin</p>
              <p>St.Nr: 21/205/60646</p>
            </div>
            <div>
              <p>
                <span>Telefon:</span>030-30343979
              </p>
              <p>
                <span>Fax:</span>030-30343978
              </p>
              <p>
                <span>Email:</span>info@reise-zentrum.net
              </p>
              <p>
                <span>USt.-Id.:</span>DE247744764
              </p>
            </div>
            <div>
              <p>Postbank Berlin</p>
              <p>Kto-Nr.: 14527104 / BLZ: 10010010</p>
              <p>IBAN: DE74 1001 0010 0014 5271 04</p>
              <p>BIC / SWIFT: PBNKDEFF</p>
            </div>
          </FooterBlock>
        </TicketData>
      </TicketBackground>
    </>
  )
}

export default Ticket
