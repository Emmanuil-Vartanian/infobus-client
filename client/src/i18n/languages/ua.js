export default {
  common: {
    today: 'Сьогодні',
    hi: 'Привіт',
    noRecords: 'Записи відсутні',
    add: 'Додати',
    edit: 'Редагувати',
    apply: 'Застосувати',
    delete: 'Видалити?',
    yes: 'Так',
    no: 'Ні'
  },
  sideBar: {
    booking: 'Бронювання',
    searchFlights: 'Пошук рейсів',
    trips: 'Рейси',
    passengers: 'Список пасажирів',
    locations: 'Локації',
    agencies: 'Агенції',
    users: 'Користувачі',
    logOut: 'Вихід'
  },
  pages: {
    signIn: {
      loginToAccount: 'Увійти',
      touristCentre: 'Центр подорожей',
      bookingSystem: 'Інформаційно-бронювальна система',
      email: 'Email',
      password: 'Пароль',
      logIn: 'Увійти',
      wrongLoginOrPassword: 'Неправильний логін або пароль'
    },
    tripSearch: {
      departure: 'Місто відправлення',
      arrival: 'Місто прибуття',
      search: 'Пошук',
      foundTrips: 'Знайдено рейсів: :number.',
      departureDays: 'Дні виїзду',
      time: 'Час',
      arrivalDays: 'Дні прибуття',
      oneWayTicket: 'Квиток в один бік',
      roundTripTicket: 'Квиток туди і назад',
      toBook: 'Бронювати',
      companyName: 'Назва компанії',
      fullInfo: 'Повна інформація',
      discounts: 'Знижки',
      baggage: 'Багаж',
      route: 'Маршрут',
      departurePoint: 'Місце відправлення',
      arrivalLocation: 'Місце прибуття',
      selectDate: 'Виберіть дату',
      returnDate: 'Дата повернення',
      greeting: 'Привітання',
      lastName: 'Прізвище',
      firstName: "Ім'я",
      street: 'Вулиця',
      postalCode: 'Поштовий індекс',
      city: 'Місто',
      phoneNumber: 'Номер телефону',
      mobilePhoneNumber: 'Номер мобільного телефону',
      passengerContactPhoneNumber: 'Контактний номер телефону пасажирів',
      email: 'Email',
      mr: 'Містер',
      mrs: 'Місіс / Міс',
      birthDate: 'дд.мм.рррр',
      passportNumber: 'Номер паспорта',
      passenger: 'Пасажир',
      customer: 'Замовник',
      addPassenger: 'Додати пасажира',
      price: 'Ціна',
      book: 'Забронювати',
      deletePassenger: 'Видалити пасажира',
      reservationAdded: 'Бронювання успішно додано',
      payment: 'Оплата',
      office: 'У бюро',
      bus: 'В автобусі',
      freeDate: 'Відкрита дата'
    },
    booking: {
      createdAt: 'Дата замовлення',
      departure: 'Місто відправлення',
      arrival: 'Місто прибуття',
      departureDate: 'Дата виїзду',
      time: 'Час',
      returnDepartureDate: 'Дата виїзду назад',
      id: 'Id',
      buch: 'Buch',
      status: 'Статус',
      check: 'Рахунок',
      ticket: 'Квиток',
      carrier: 'Перевізник',
      statuses: {
        new: 'Новий',
        paid: 'Сплачено',
        confirmed: 'Підтверджено',
        canceled: 'Скасовано'
      },
      active: 'Активні',
      archive: 'Архів',
      all: 'Всі',
      payment: 'Оплата',
      customer: 'Замовник',
      free: 'Відкрита'
    },
    trip: {
      licensePlate: 'Номерний знак',
      color: 'Колір',
      phone: 'Телефон'
    },
    passenger: {
      username: "Прізвище І'мя",
      birthDay: 'Дата Народження',
      typ: 'Typ',
      em: 'Em',
      price: 'Ціна',
      bureau: 'В Бюро',
      bus: 'В Автобусі',
      place: 'Місце',
      passID: 'Pass ID',
      departure: 'Місто відправлення',
      arrival: 'Місто прибуття',
      returnDepartureDate: 'Дата виїзду назад',
      buch: 'Buch',
      sum: 'Сума',
      phone: 'Телефон',
      firstName: "І'мя",
      lastName: 'Прізвище',
      trip: 'Рейс'
    },
    locations: {
      id: 'Id',
      country: 'Країна',
      city: 'Місто',
      address: 'Адреса',
      name: 'Назва локації',
      addLocation: 'Додавання локації',
      editLocation: 'Редагування локації'
    },
    agencies: {
      id: 'Id',
      name: 'Назва агентства',
      shortName: 'Коротка назва',
      taxNumber: 'Податковий номер',
      status: 'Статус',
      owner: 'Власник',
      group: 'Група',
      pe: 'Турагентство',
      ltd: 'Фірма',
      postalCode: 'Поштовий індекс',
      street: 'Вулиця',
      city: 'Місто',
      tel: 'Телефон',
      fax: 'Факс',
      email: 'Email',
      user: 'Користувач',
      password: 'Пароль',
      access: 'Доступ',
      active: 'Активний',
      notActive: 'Не активний',
      commissionTab: 'Комісія',
      activeTab: 'Активні',
      addAgency: 'Додати агентство',
      editAgency: 'Редагувати агентство',
      form: {
        1: {
          title: '1. Вкажіть назву агентства',
          description: 'Коротка назва агентства, буде відображатись при надходженні замовлення',
          fullName: 'Повна назва агентства',
          shortName: 'Коротка назва агентства'
        },
        2: {
          title: '2. Вкажіть адресу агентства',
          description: 'Ці дані будуть відображатись у виставлених рахунках та білетах'
        },
        3: {
          title: '3. Вкажіть контактні дані агентства',
          description: 'Ці дані будуть відображатись у виставлених рахунках та білетах'
        },
        4: {
          title: '4. Вкажіть податковий номер та власника підприємства, агентства'
        },
        5: {
          title: '5. Зазначте форму підприємства',
          enterpriseForm: 'Форма підприємства'
        },
        6: {
          title: '6. Вкажіть email і пароль для входу в акаунт',
          description:
            'Email буде використовуватись для входу в аккаунт. Пароль повинен складатися з 5-20 символів, містити хоча б один спеціальний символ і хоча б одну цифру.'
        }
      }
    }
  },
  filterForTable: {
    button: 'Застосувати фільтр',
    clear: 'Очистити',
    departure: 'Місто відправлення',
    arrival: 'Місто прибуття',
    createdAt: 'Дата замовлення',
    departureDate: 'Дата виїзду',
    returnDepartureDate: 'Дата виїзду назад',
    status: 'Статус',
    passengerTrip: 'Рейс',
    passengerDepartureDate: 'Дата виїзду',
    locationCountry: 'Країна',
    locationCity: 'Місто',
    agenciesName: 'Назва агентства',
    agenciesGroup: 'Група'
  },
  days: {
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб',
    0: 'Нд'
  }
}
