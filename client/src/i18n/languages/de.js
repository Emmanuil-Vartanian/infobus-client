export default {
  common: {
    today: 'Heute',
    hi: 'Hallo',
    noRecords: 'Keine Aufzeichnungen',
    add: 'Hinzufügen',
    edit: 'Bearbeiten',
    apply: 'Anwenden',
    delete: 'Entfernen?',
    yes: 'Ja',
    no: 'Nein'
  },
  sideBar: {
    booking: 'Reservierungen',
    searchFlights: 'Flugsuche',
    trips: 'Buslinien',
    passengers: 'Passagiere',
    locations: 'Standorte',
    agencies: 'Agenturen',
    users: 'Benutzer',
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
      freeDate: 'Offenes datum'
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
      phone: 'Telefon'
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
      active: 'Aktiv',
      notActive: 'Nicht aktiv',
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
    }
  },
  filterForTable: {
    button: 'Filter anwenden',
    clear: 'Klar',
    departure: 'Abfahrtort',
    arrival: 'Ankunftsort',
    createdAt: 'Auftragsdatum',
    departureDate: 'Abfahrtdatum',
    returnDepartureDate: 'Rückfahrtdatum',
    status: 'Status',
    passengerTrip: 'Buslinien',
    passengerDepartureDate: 'Abfahrtdatum',
    locationCountry: 'Land',
    locationCity: 'Stadt',
    agenciesName: 'Agenturen name',
    agenciesGroup: 'Gruppe'
  },
  days: {
    1: 'Mo',
    2: 'Di',
    3: 'Mi',
    4: 'Do',
    5: 'Fr',
    6: 'Sa',
    0: 'So'
  }
}
