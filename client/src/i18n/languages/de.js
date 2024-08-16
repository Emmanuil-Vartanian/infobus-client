export default {
  common: {
    today: 'Heute',
    hi: 'Hallo',
    noRecords: 'Keine Aufzeichnungen',
    add: 'Hinzufügen',
    edit: 'Bearbeiten',
    apply: 'Anwenden',
    delete: 'Entfernen',
    yes: 'Ja',
    no: 'Nein',
    active: 'Aktiv',
    notActive: 'Nicht aktiv',
    selectAll: 'Alle auswählen'
  },
  sideBar: {
    booking: 'Reservierungen',
    searchFlights: 'Flugsuche',
    trips: 'Buslinien',
    passengers: 'Passagiere',
    locations: 'Standorte',
    agencies: 'Agenturen',
    users: 'Benutzer',
    routes: 'Routen',
    discounts: 'Rabatte',
    baggage: 'Gepäck',
    logOut: 'Ausloggen'
  },
  pages: {
    signIn: {
      loginToAccount: 'Einloggen',
      touristCentre: 'Reise Zentrum',
      bookingSystem: 'Informations- und Reservierungssystem',
      email: 'Email',
      password: 'Kennwort',
      logIn: 'Einloggen',
      wrongLoginOrPassword: 'Falscher Login oder Passwort'
    },
    tripSearch: {
      departure: 'Abfahrtstadt',
      arrival: 'Anreisestadt',
      search: 'Suchen',
      foundTrips: 'Gefundene Flüge: :number.',
      departureDays: 'Abreisetage',
      time: 'Zeit',
      arrivalDays: 'Anreisetage',
      oneWayTicket: 'One way ticket',
      roundTripTicket: 'Hin- und Rückfahrtticket',
      toBook: 'Reservierung',
      companyName: 'Firmenname',
      fullInfo: 'Volle Information',
      discounts: 'Rabatte',
      baggage: 'Gepäck',
      route: 'Strecke',
      departurePoint: 'Abfahrtsort',
      arrivalLocation: 'Ankunftsort',
      selectDate: 'Datum wählen',
      returnDate: 'Rückflugdatum',
      greeting: 'Begrüßung',
      lastName: 'Nachname',
      firstName: 'Vorname',
      street: 'Straße',
      postalCode: 'Postleitzahl',
      city: 'Stadt',
      phoneNumber: 'Telefonnummer',
      mobilePhoneNumber: 'Handynummer',
      passengerContactPhoneNumber: 'Kontakttelefonnummer der Passagiere',
      email: 'Email',
      mr: 'Herr',
      mrs: 'Frau / Fräulein',
      birthDate: 'tt.mm.jjjj',
      passportNumber: 'Passnummer',
      passenger: 'Passenger',
      customer: 'Besteller',
      addPassenger: 'Passagier hinzufügen',
      price: 'Preis',
      book: 'Reservieren',
      deletePassenger: 'Beifahrer entfernen',
      reservationAdded: 'Reservierung erfolgreich hinzugefügt',
      payment: 'Zahlung',
      office: 'Im Büro',
      bus: 'Im Bus',
      freeDate: 'Offenes datum',
      place: 'Sitz'
    },
    booking: {
      createdAt: 'Auftragsdatum',
      departure: 'Abfahrtstadt',
      arrival: 'Anreisestadt',
      departureDate: 'Abfahrtdatum',
      time: 'Zeit',
      returnDepartureDate: 'Rückfahrtdatum',
      id: 'Id',
      buch: 'Buch',
      status: 'Status',
      check: 'Rechnung',
      ticket: 'Ticket',
      carrier: 'Firma',
      statuses: {
        new: 'Neu',
        paid: 'Bezahlt',
        confirmed: 'Bestätig',
        canceled: 'Abgesagt'
      },
      active: 'Aktiv',
      archive: 'Archiv',
      all: 'Alle',
      payment: 'Zahlung',
      customer: 'Besteller',
      free: 'Offene'
    },
    trip: {
      licensePlate: 'Kennzeichen',
      color: 'Farbe',
      phone: 'Telefon',
      all: 'Alle',
      directions: 'Richtungen',
      departure: 'Abfahrtstadt',
      arrival: 'Anreisestadt',
      departureDays: 'Abreisetage',
      time: 'Zeit',
      arrivalDays: 'Anreisetage',
      trip: 'Buslinien',
      group: 'Gruppe',
      status: 'Status',
      addTrip: 'Einen Flug hinzufügen',
      editTrip: 'Einen Flug bearbeiten',
      addNewTrip:
        'Erstellen Sie einen neuen Flug, indem Sie eine Route auswählen, einen Flugplan, Preisinformationen, Rabatte, Gepäckregeln und andere Informationen hinzufügen.',
      chooseRoute: '1. Wählen Sie eine Route',
      route: 'Strecke',
      schedule: '2. Fügen Sie den Fahrplan und den Verkehrsplan entlang der Route hinzu :trip',
      scheduleDescription: 'Geben Sie das Datum der ersten und letzten Abfahrt nach Route ein',
      startDate: 'Startdatum',
      endDate: 'Enddatum',
      departureDaysDescription:
        'Geben Sie die Abfahrtstage für die Route an :route beginnend mit :date',
      departureTimeDescription:
        'Geben Sie die Abfahrtszeit vom ursprnglichen Standort und die Ankunftszeit an den folgenden Standorten ein',
      date: 'Datum',
      addPrices: '4. Ticketpreise hinzufügen',
      addSeasonPrice: 'Einen Saisonpreis hinzufügen?',
      seasonPrice: 'Saisonpreis angeben',
      seasonPriceDate: 'Enter the start and end date of the season',
      addDiscounts: '5. Fügen Sie Rabatte hinzu',
      discounts: 'Die Rabatte',
      addBaggage: '6. Freigepäck hinzufgen',
      baggage: 'Freigepäck',
      chooseCarrier: '7. Wählen Sie den Spediteur und das Transportmittel für diesen Flug aus',
      carrierAndTransport: 'Firmen und Transport',
      chooseSeats: '8. Tickets mit Sitzplatzwahl im Bus?'
    },
    updateTrip: {
      route: 'Route',
      schedule: 'Zeitplan',
      seats: 'Sitzplätze im Bus',
      prices: 'Preise',
      discounts: 'Rabatte',
      baggage: 'Gepäck',
      invoiceAndTicketText: 'Rechnungstext und tickettext',
      activate: 'Aktivieren',
      applyChanges: 'Änderungen auf die Rückroute anwenden?',
      invoiceText: 'Rechnungstext',
      ticketText: 'Tickettext',
      activateBusTrip: 'Aktivieren sie die buslinie',
      activateStop: 'Haltestellen zum Ein- und Aussteigen aktivieren',
      deactivateDirection: 'Richtungen werden deaktiviert',
      seasonPriceDate: 'The start and end date of the season',
      activateSeats: 'Sitzplatzauswahl aktivieren',
      dateRange: 'Datumsbereich',
      date: 'Datum',
      dateFrom: 'Datum von',
      dateTo: 'Datum bis',
      free: 'Frei',
      booked: 'Bucht',
      disabled: 'Gesperrt',
      enableRouteSettings: 'Routeneinstellungen nach Wochentagen aktivieren?'
    },
    passenger: {
      username: 'Nachname Vorname',
      birthDay: 'Geburtsdatum',
      typ: 'Typ',
      em: 'Em',
      price: 'Preis',
      bureau: 'Im Büro',
      bus: 'Im Bus',
      place: 'Sitz',
      passID: 'Pass ID',
      departure: 'Abfahrtort',
      arrival: 'Ankunftsort',
      returnDepartureDate: 'Rückfahrtdatum',
      buch: 'Buch',
      sum: 'Summe',
      phone: 'Telefon',
      firstName: 'Vorname',
      lastName: 'Nachname',
      trip: 'Buslinien'
    },
    locations: {
      id: 'Id',
      country: 'Land',
      city: 'Stadt',
      address: 'Adresse',
      name: 'Der name des ortes',
      addLocation: 'Einen Standort hinzufügen',
      editLocation: 'Bearbeiten eines Standorts'
    },
    agencies: {
      id: 'Id',
      name: 'Agenturen name',
      shortName: 'Kurzname',
      taxNumber: 'Steuernummer',
      status: 'Status',
      owner: 'Inhaber',
      group: 'Gruppe',
      pe: 'Reisebüro',
      ltd: 'Firma',
      postalCode: 'Plz',
      street: 'Straße',
      city: 'Stadt',
      tel: 'Telefon',
      fax: 'Fax',
      email: 'Email',
      user: 'Benutzer',
      password: 'Kennwort',
      access: 'Zugang',
      commissionTab: 'Kommission',
      activeTab: 'Aktiv',
      addAgency: 'Agentur hinzufügen',
      editAgency: 'Bearbeitungsagentur',
      form: {
        1: {
          title: '1. Geben Sie den Namen der Agentur ein',
          description: 'Bei Eingang der Bestellung wird Ihnen der Kurzname der Agentur angezeigt',
          fullName: 'Vollständiger Name der Agentur',
          shortName: 'Kurzname der Agentur'
        },
        2: {
          title: '2. Geben Sie die Adresse der Agentur ein',
          description: 'Diese Daten spiegeln sich in den ausgestellten Rechnungen und Tickets wider'
        },
        3: {
          title: '3. Geben Sie die Kontaktdaten der Agentur ein',
          description: 'Diese Daten spiegeln sich in den ausgestellten Rechnungen und Tickets wider'
        },
        4: {
          title:
            '4. Geben Sie die Steuernummer und den Inhaber des Unternehmens oder der Agentur an'
        },
        5: {
          title: '5. Geben Sie die Unternehmensform an',
          enterpriseForm: 'Unternehmensform'
        },
        6: {
          title:
            '6. Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um sich bei Ihrem Konto anzumelden',
          description:
            'Für die Anmeldung am Konto wird die E-Mail-Adresse verwendet. Das Passwort muss 5-20 Zeichen lang sein, mindestens ein Sonderzeichen und mindestens eine Zahl enthalten.'
        }
      }
    },
    users: {
      id: 'Id',
      role: 'Rolle',
      name: 'Name',
      user: 'Benutzer',
      password: 'Kennwort',
      carrierOrAgent: 'Firmen / Agentur',
      group: 'Gruppe',
      access: 'Zugang',
      newPassword: 'Neues kennwort'
    },
    routes: {
      id: 'Id',
      route: 'Route',
      reverseRoute: 'Rckroute',
      addRoute: 'Eine Route hinzufügen',
      departurePoint: '1. Wählen Sie einen Abfahrtsort',
      arrivalPoint: '2. Wählen Sie den Ankunftsort',
      stoppingPlaces: '3. Fügen Sie zusätzliche Stopps hinzu',
      departure: 'Abfahrtort',
      arrival: 'Ankunftsort',
      addStop: 'Einen Stopp hinzufügen',
      stop: 'Stoppen'
    },
    discounts: {
      id: 'Id',
      discountName: 'Rabattname',
      discountType: 'Rabattart',
      discountSize: 'Rabattgröße',
      currency: 'Währung',
      percent: 'Prozent %',
      fixed: 'Fester Rabatt',
      addDiscount: 'Rabatt hinzufgen',
      editDiscount: 'Rabatt bearbeiten'
    },
    baggage: {
      id: 'Id',
      name: 'Name des Freigepäcks',
      type: 'Art der Freigepäckmenge',
      value: 'Der Wert der Norm',
      units: 'Einheiten',
      weight: 'Gewicht',
      price: 'Preis',
      addBaggage: 'Gepäck hinzufügen',
      editBaggage: 'Gepäck bearbeiten'
    }
  },
  filterForTable: {
    button: 'Filter anwenden',
    clear: 'Klar',
    departure: 'Abfahrtort',
    arrival: 'Ankunftsort',
    departureCountry: 'Abflugland',
    arrivalCountry: 'Ankunftsland',
    createdAt: 'Auftragsdatum',
    departureDate: 'Abfahrtdatum',
    returnDepartureDate: 'Rückfahrtdatum',
    status: 'Status',
    passengerTrip: 'Buslinien',
    passengerDepartureDate: 'Abfahrtdatum',
    locationCountry: 'Land',
    locationCity: 'Stadt',
    agenciesName: 'Agenturen name',
    agenciesGroup: 'Gruppe',
    usersRole: 'Rolle',
    usersGroup: 'Gruppe',
    usersAccess: 'Zugang',
    discountsType: 'Rabattart',
    baggageType: 'Art der Freigepäckmenge',
    carrierName: 'Firmenname',
    active: 'Status'
  },
  days: {
    1: 'Mo',
    2: 'Di',
    3: 'Mi',
    4: 'Do',
    5: 'Fr',
    6: 'Sa',
    0: 'So'
  },
  roles: {
    user: 'Benutzer',
    consolidator: 'Konsolidierer',
    chief: 'Chef',
    dispatcher: 'Dispatcher',
    carrier_manager: 'Transporteur',
    agency_manager: 'Agent'
  }
}
