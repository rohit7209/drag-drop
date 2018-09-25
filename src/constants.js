const CONSTANTS = {
  ui: {
    primaryColor: 'rgb(55, 150, 198)',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  serverUrl: 'http://localhost:8080',
  api: {
    getTechnicianShifts: '/api/get/technician',
    allotTechnicianShifts: '/api/post/technician',
    saveTechnicianShifts: '/api/put/technician',
    deleteTechnicianShifts: '/api/delete/technician',
  },
  employeeList: {
    1: {
      name: 'name 1',
      image: 'https://st2.depositphotos.com/1006318/10458/v/950/depositphotos_104583248-stock-illustration-business-man-profile-icon-male.jpg',
      shift: '',
      station: '',
      lead: true,
    },
    2: {
      name: 'John Doe',
      image: 'https://assets.entrepreneur.com/franchise/avatar/334921.png',
      shift: '',
      station: '',
    },
    3: {
      image: 'http://getdrawings.com/img/cool-facebook-profile-picture-silhouette-10.jpg',
      name: 'jane doe',
      shift: '',
      station: '',
      lead: true,
    },
    4: {
      image: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg',
      name: 'name 2 last',
      shift: '',
      station: '',
    },
    5: {
      image: '',
      name: 'last name',
      shift: '',
      station: '',
    },
    6: {
      image: '',
      name: 'new tech',
      shift: '',
      station: '',
      lead: true,
    },
    7: {
      image: '',
      name: 'old tech',
      shift: '',
      station: '',
    },
    8: {
      image: '',
      name: 'xxx xxxxx',
      shift: '',
      station: '',
    },
    9: {
      image: '',
      name: 'abcd xyz',
      shift: '',
      station: '',
    },
    10: {
      image: '',
      name: 'New Technician',
      shift: '',
      station: '',
      lead: true,
    },
  },
  stationList: {
    '1': {
      id: '1',
      name: 'Station 1',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
        '3': { id: '3', name: 'Shift 3' },
        '4': { id: '4', name: 'Shift 4' },
      },
    },
    '2': {
      id: '2',
      name: 'Station 2',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
        '3': { id: '3', name: 'Shift 3' },
        '4': { id: '4', name: 'Shift 4' },
      },
    },
    '3': {
      id: '3',
      name: 'Station 3',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
        '3': { id: '3', name: 'Shift 3' },
        '4': { id: '4', name: 'Shift 4' },
      },
    },
  },
};

export default CONSTANTS;