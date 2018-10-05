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
      name: 'JANE',
      image:"", //'https://images.clipartlogo.com/files/istock/previews/9730/97305655-avatar-icon-of-girl-in-a-wide-brim-felt-hat.jpg',
      shift: '',
      station: '',
      lead: true,
    },
    2: {
      name: 'JADE',
      image: "",//'https://image.flaticon.com/icons/png/512/145/145866.png',
      shift: '',
      station: '',
    },
    3: {
      image: "",//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqVnkZbMWDWOtZq6nPpEJf-EHmzoK5Bb2nWD-4M3NQ-InAFmar',
      name: 'RESHA',
      shift: '',
      station: '',
      lead: true,
    },
    4: {
      image: "",//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3nH5B9nngu2gN8fUvWE3j6wPte5UhR3iu4oHonzpIKhX47eV',
      name: 'JT',
      shift: '',
      station: '',
    },
    5: {
      image: "",//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREeNjxJ_TnxlMG8xZuw04WWb_l6X-lBWTMTJG6XPHIZoZTJTqQ-A',
      name: 'MEGUSTA',
      shift: '',
      station: '',
    },
    6: {
      image: "",//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6eFpM3ZDCbio32-U3qdjdSRGJ-HCs3HM6BbUDFozcbmbGDGhL',
      name: 'KATHY',
      shift: '',
      station: '',
      lead: true,
    },
    7: {
      image: "",//'https://png2.kisspng.com/20180402/yie/kisspng-computer-icons-female-user-profile-avatar-material-5ac1fa22a5a567.4501855215226619226785.png',
      name: 'MARY',
      shift: '',
      station: '',
    },
    8: {
      image: "",//'data:image/png;base64,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',
      name: 'HENRY',
      shift: '',
      station: '',
    },
    9: {
      image: "",//'https://image.flaticon.com/icons/png/512/163/163833.png',
      name: 'HASHKA',
      shift: '',
      station: '',
    },
    10: {
      image:"",// 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'OSHO',
      shift: '',
      station: '',
      lead: true,
    },
    11: {
      image:"",// 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'JOHN',
      shift: '',
      station: '',
      lead: true,
    },
    12: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'ARIYANA',
      shift: '',
      station: '',
      lead: true,
    },
    13: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'BARRY',
      shift: '',
      station: '',
      lead: true,
    },
    14: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'BERLIN',
      shift: '',
      station: '',
      lead: true,
    },
    15: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'SOHANA',
      shift: '',
      station: '',
      lead: true,
    },
    16: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'CASHINE',
      shift: '',
      station: '',
      lead: true,
    },
    17: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'OSHO',
      shift: '',
      station: '',
      lead: true,
    },
    15: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'CAMRY',
      shift: '',
      station: '',
      lead: true,
    },
    18: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'DOLMAN',
      shift: '',
      station: '',
      lead: true,
    },
    19: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'PRETIER',
      shift: '',
      station: '',
      lead: true,
    },
    20: {
      image: 'https://image.flaticon.com/icons/png/512/145/145855.png',
      name: 'OSHO',
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
        //'3': { id: '3', name: 'Shift 3' },
        //'4': { id: '4', name: 'Shift 4' },
      },
    },
    '2': {
      id: '2',
      name: 'Station 2',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
        //'4': { id: '4', name: 'Shift 4' },
      },
    },
    '3': {
      id: '3',
      name: 'Station 3',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '4': {
      id: '4',
      name: 'Station 4',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '5': {
      id: '5',
      name: 'Station 5',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '6': {
      id: '6',
      name: 'Station 6',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '7': {
      id: '7',
      name: 'Station 7',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },
    '8': {
      id: '8',
      name: 'Station 8',
      shifts: {
        '1': { id: '1', name: 'Shift 1' },
        '2': { id: '2', name: 'Shift 2' },
       // '3': { id: '3', name: 'Shift 3' },
       // '4': { id: '4', name: 'Shift 4' },
      },
      
    },

  },
};

export default CONSTANTS;