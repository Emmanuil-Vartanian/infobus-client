export default {
  common: {
    today: 'Сегодня',
    hi: 'Привет',
    noRecords: 'Нет записей',
    add: 'Добавить',
    edit: 'Редактировать',
    apply: 'Применить',
    delete: 'Удалить?',
    yes: 'Да',
    no: 'Нет'
  },
  sideBar: {
    booking: 'Бронирование',
    searchFlights: 'Поиск рейсов',
    trips: 'Рейсы',
    passengers: 'Список пассажиров',
    locations: 'Локации',
    agencies: 'Агентства',
    users: 'Пользователи',
    logOut: 'Выход'
  },
  pages: {
    signIn: {
      loginToAccount: 'Войти',
      touristCentre: 'Туристический центр',
      bookingSystem: 'Система информации и бронирования',
      email: 'Email',
      password: 'Пароль',
      logIn: 'Войти',
      wrongLoginOrPassword: 'Неверный логин или пароль'
    },
    tripSearch: {
      departure: 'Город отправления',
      arrival: 'Город прибытия',
      search: 'Поиск',
      foundTrips: 'Найдено рейсов: :number.',
      departureDays: 'Дни выезда',
      time: 'Время',
      arrivalDays: 'Дни прибытия',
      oneWayTicket: 'Билет в одну сторону',
      roundTripTicket: 'Билет туда - обратно',
      toBook: 'Бронировать',
      companyName: 'Название компании',
      fullInfo: 'Полная информация',
      discounts: 'Скидки',
      baggage: 'Багаж',
      route: 'Маршрут',
      departurePoint: 'Место отправления',
      arrivalLocation: 'Место прибытия',
      selectDate: 'Выберите дату',
      returnDate: 'Дата возвращения',
      greeting: 'Приветствие',
      lastName: 'Фамилия',
      firstName: 'Имя',
      street: 'Улица',
      postalCode: 'Почтовый индекс',
      city: 'Город',
      phoneNumber: 'Номер телефона',
      mobilePhoneNumber: 'Номер мобильного телефона',
      passengerContactPhoneNumber: 'Контактный номер телефона пассажиров',
      email: 'Email',
      mr: 'Мистер',
      mrs: 'Миссис / Мисс',
      birthDate: 'дд.мм.гггг',
      passportNumber: 'Номер паспорта',
      passenger: 'Пассажир',
      customer: 'Заказчик',
      addPassenger: 'Добавить пассажира',
      price: 'Цена',
      book: 'Забронировать',
      deletePassenger: 'Удалить пассажира',
      reservationAdded: 'Бронирование успешно добавлено',
      payment: 'Оплата',
      office: 'В бюро',
      bus: 'В автобусе',
      freeDate: 'Открытая дата'
    },
    booking: {
      createdAt: 'Дата заказа',
      departure: 'Город отправления',
      arrival: 'Город прибытия',
      departureDate: 'Дата выезда',
      time: 'Время',
      returnDepartureDate: 'Дата выезда обратно',
      id: 'Id',
      buch: 'Buch',
      status: 'Статус',
      check: 'Счет',
      ticket: 'Билет',
      carrier: 'Перевозчик',
      statuses: {
        new: 'Новый',
        paid: 'Оплачено',
        confirmed: 'Подтверждено',
        canceled: 'Отменено'
      },
      active: 'Активные',
      archive: 'Архив',
      all: 'Все',
      payment: 'Оплата',
      customer: 'Заказчик',
      free: 'Открытая'
    },
    trip: {
      licensePlate: 'Номерной знак',
      color: 'Цвет',
      phone: 'Телефон'
    },
    passenger: {
      username: 'Фамилия Имя',
      birthDay: 'Дата Рождения',
      typ: 'Typ',
      em: 'Em',
      price: 'Цена',
      bureau: 'В Бюро',
      bus: 'В Автобусе',
      place: 'Место',
      passID: 'Pass ID',
      departure: 'Город отправления',
      arrival: 'Город прибытия',
      returnDepartureDate: 'Дата выезда обратно',
      buch: 'Buch',
      sum: 'Сумма',
      phone: 'Телефон',
      firstName: 'Имя',
      lastName: 'Фамилия',
      trip: 'Рейс'
    },
    locations: {
      id: 'Id',
      country: 'Страна',
      city: 'Город',
      address: 'Адрес',
      name: 'Название локации',
      addLocation: 'Добавление локации',
      editLocation: 'Редактирование локации'
    },
    agencies: {
      id: 'Id',
      name: 'Название агентства',
      shortName: 'Короткое название',
      taxNumber: 'Налоговый номер',
      status: 'Статус',
      owner: 'Владелец',
      group: 'Группа',
      pe: 'Турагентство',
      ltd: 'Фирма',
      postalCode: 'Почтовый индекс',
      street: 'Улица',
      city: 'Город',
      tel: 'Телефон',
      fax: 'Факс',
      email: 'Email',
      user: 'Пользователь',
      password: 'Пароль',
      access: 'Доступ',
      active: 'Активный',
      notActive: 'Не активный',
      commissionTab: 'Комиссия',
      activeTab: 'Активные',
      addAgency: 'Добавить агентство',
      editAgency: 'Редактировать агентство',
      form: {
        1: {
          title: '1. Укажите название агентства',
          description: 'Краткое название агентства будет отображаться при поступлении заказа',
          fullName: 'Полное название агентства',
          shortName: 'Краткое название агентства'
        },
        2: {
          title: '2. Укажите адрес агентства',
          description: 'Эти данные будут отображаться в выставленных счетах и билетах'
        },
        3: {
          title: '3. Укажите контактные данные агентства',
          description: 'Эти данные будут отображаться в выставленных счетах и билетах'
        },
        4: {
          title: '4. Укажите налоговый номер и владельца предприятия, агентства'
        },
        5: {
          title: '5. Укажите форму предприятия',
          enterpriseForm: 'Форма предприятия'
        },
        6: {
          title: '6. Укажите email и пароль для входа в аккаунт',
          description:
            'Email будет использоваться для входа в аккаунт. Пароль должен состоять из 5-20 символов, содержать хотя бы один специальный символ и хотя бы одну цифру.'
        }
      }
    }
  },
  filterForTable: {
    button: 'Применить фильтр',
    clear: 'Очистить',
    departure: 'Город отправления',
    arrival: 'Город прибытия',
    createdAt: 'Дата заказа',
    departureDate: 'Дата выезда',
    returnDepartureDate: 'Дата выезда обратно',
    status: 'Статус',
    passengerTrip: 'Рейс',
    passengerDepartureDate: 'Дата выезда',
    locationCountry: 'Страна',
    locationCity: 'Город',
    agenciesName: 'Название агентства',
    agenciesGroup: 'Группа'
  },
  days: {
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб',
    0: 'Вс'
  }
}
