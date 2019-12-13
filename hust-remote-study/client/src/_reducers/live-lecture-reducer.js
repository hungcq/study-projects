import {
  liveLectureActionTypes,
  mediaStatusTypes,
  roomActionTypes,
  slideTypes,
} from '../_constants';

const initState = {
  lectureId: '',
  currentPage: 1,
  slideUrl: '',
  slideType: slideTypes.PDF,
  numPages: 0,
  chatList: [],
  studentList: [],
  canvasData: '',
  documentList: [
    // {
    //   title: 'SVM',
    //   url: '/svm.pdf',
    //   slideType: slideTypes.PDF,
    // },
    // {
    //   title: 'WCN',
    //   url: '/Introduction-WCN.pdf',
    //   slideType: slideTypes.PDF,
    // },
    // {
    //   title: 'Youtube',
    //   url: 'https://youtu.be/FimHeH-mU88',
    //   slideType: slideTypes.MEDIA,
    // },
    // {
    //   title: 'Mp3',
    //   url: 'https://storage.googleapis.com/lecture-slides/farewell.mp3',
    //   slideType: slideTypes.MEDIA,
    // },
    // {
    //   title: 'FLAC',
    //   url: 'https://storage.googleapis.com/lecture-slides/Heart-Shaped-Box.flac',
    //   slideType: slideTypes.MEDIA,
    // },
  ],
  mediaStatus: mediaStatusTypes.STOP,
  mediaTime: 0,
  lastSlideUpdateTs: 0,
  requestReload: false,
  stream: {
    permissionsGranted: false,
    connected: false,
    sessionInfo: null,
    otCore: null,
    otCoreOptions: null,
    currentState: null,
    connections: [],
    connection: null,
    streamConnections: {},
  },
};

export function liveLectureReducer (state = initState, action) {
  switch (action.type) {
    case 'JOIN_STREAM_SERVER':
      return {
        ...state,
        stream: {
          ...state.stream,
          streamConnections: action.data.streamConnections,
        },
      };
    case 'START_STREAM':
      return {
        ...state,
        stream: {
          ...state.stream,
          currentState: action.currentState,
          permissionsGranted: true,
        },
      };
    case 'UPDATE_STREAM':
      return {
        ...state,
        stream: {
          ...state.stream,
          currentState: action.currentState,
        },
      };
    case 'STOP_STREAM':
      return {
        ...state,
        stream: {
          ...state.stream,
          currentState: null,
        },
      };
    case 'CONNECT_OPEN_TOK_SESSION':
      return {
        ...state,
        stream: {
          ...state.stream,
          connected: true,
        },
      };
    case 'RECEIVE_STREAM_SESSION_INFO':
      return {
        ...state,
        stream: {
          ...initState.stream,
          sessionInfo: action.sessionInfo,
        },
      };
    case 'INIT_OPEN_TOK_CORE':
      return {
        ...state,
        stream: {
          ...state.stream,
          otCore: action.otCore,
          otCoreOptions: action.otCoreOptions,
        },
      };
    case 'ADD_OWN_OPEN_TOK_CONNECTION':
      return {
        ...state,
        stream: {
          ...state.stream,
          connection: action.connection,
        },
      };
    case 'ADD_OPEN_TOK_CONNECTION': {
      const newConnections = [...state.stream.connections];
      const currentIndex = state.stream.connections.findIndex(
        connection => connection.id === action.connection.id);
      if (currentIndex !== -1) {
        newConnections[currentIndex] = action.connection;
      } else {
        newConnections.push(action.connection);
      }

      return {
        ...state,
        stream: {
          ...state.stream,
          connections: newConnections,
        },
      };
    }
    case 'REMOVE_OPEN_TOK_CONNECTION': {
      const newConnections = [...state.stream.connections];
      const currentIndex = state.stream.connections.findIndex(
        connection => connection.id === action.connection.id);
      if (currentIndex !== -1) newConnections.splice(currentIndex, 1);

      return {
        ...state,
        stream: {
          ...state.stream,
          connections: newConnections,
        },
      };
    }
    case 'TOGGLE_STUDENT_AUDIO': {
      const newConnections = [...state.stream.connections];
      const newConnection = state.stream.connection
        ? {...state.stream.connection}
        : state.stream.connection;
      const currentIndex = state.stream.connections.findIndex(
        connection => connection.id === action.connection.id);
      if (currentIndex !==
        -1) newConnections[currentIndex].audioEnabled = action.audioEnabled;
      if (newConnection && newConnection.id ===
        action.connection.id) {
        newConnection.audioEnabled = action.audioEnabled;
      }

      return {
        ...state,
        stream: {
          ...state.stream,
          connections: newConnections,
          connection: newConnection,
        },
      };
    }
    case liveLectureActionTypes.CLEAR_STATE:
      return {
        ...initState,
        // stream: state.stream,
      };
    case liveLectureActionTypes.JOIN:
      let chatList = action.data.lecture.chatList;
      return {
        ...state,
        studentList: action.data.lecture.studentList,
        lectureId: action.data.lectureId,
        currentPage: action.data.lecture.currentPage,
        slideUrl: action.data.lecture.slideUrl,
        slideType: action.data.lecture.slideType,
        chatList,
      };
    case liveLectureActionTypes.LEAVE:
      return {
        ...state,
        studentList: action.data.studentList,
        chatList: [
          ...state.chatList,
          {
            username: action.data.username,
            content: 'just left.',
            type: 'action',
            timestamp: action.data.timestamp,
          },
        ],
      };
    // case liveLectureActionTypes.START:
    //   return {
    //     ...state,
    //     lectureId: action.data.lectureId,
    //   };
    case liveLectureActionTypes.ACT:
      switch (action.data.actionType) {
        case roomActionTypes.CHAT:
          return {
            ...state,
            chatList: [
              ...state.chatList,
              {
                username: action.data.username,
                content: action.data.content,
                type: action.data.type,
                timestamp: action.data.timestamp,
              },
            ],
          };
        case roomActionTypes.CONTROL_SLIDE:
          if (action.data.timestamp > state.lastSlideUpdateTs) {
            return {
              ...state,
              currentPage: action.data.currentPage,
              lastSlideUpdateTs: action.data.timestamp,
            };
          } else {
            return state;
          }
        case roomActionTypes.CHANGE_SLIDE:
          if (action.data.timestamp > state.lastSlideUpdateTs) {
            return {
              ...state,
              slideUrl: action.data.slideUrl,
              currentPage: 1,
              numPages: 0,
              lastSlideUpdateTs: action.data.timestamp,
              slideType: action.data.slideType,
              mediaTime: 0,
              mediaStatus: mediaStatusTypes.STOP,
            };
          } else {
            return state;
          }
        case roomActionTypes.CONTROL_MEDIA:
          if (action.data.timestamp > state.lastSlideUpdateTs) {
            if (action.data.mediaStatus) {
              return {
                ...state,
                lastSlideUpdateTs: action.data.timestamp,
                mediaStatus: action.data.mediaStatus,
              };
            } else if (action.data.mediaTime) {
              return {
                ...state,
                lastSlideUpdateTs: action.data.timestamp,
                mediaTime: action.data.mediaTime,
              };
            } else {
              return state;
            }
          } else {
            return state;
          }
        case roomActionTypes.RAISE_HAND:
          return {
            ...state,
            studentList: state.studentList.map(item => {
              if (item.username === action.data.username) {
                return {
                  ...item,
                  raisedHand: true,
                };
              }
              return item;
            }),
          };
        case roomActionTypes.CLOSE_ALL:
          return {
            ...state,
            studentList: state.studentList.map(item => {
              return {
                ...item,
                raisedHand: true,
              };
            }),
          };
        case roomActionTypes.DRAW:
          return {
            ...state,
            canvasData: action.data.canvasData
          };
        default:
          break;
      }
      return state;
    case liveLectureActionTypes.SET_NUM_PAGES:
      return {
        ...state,
        numPages: action.data.numPages,
      };
    case liveLectureActionTypes.GET_LECTURE_INFO:
      // let slideUrl = '';
      // let slideType = slideTypes.PDF;
      // if (action.data.documentList.length > 0) {
      //   slideUrl = action.data.documentList[0].url;
      //   slideType = action.data.documentList[0].slideType;
      // }
      return {
        ...state,
        documentList: action.data.documentList,
        // slideUrl,
        // slideType
      };
    case liveLectureActionTypes.UPLOAD_SLIDE:
      return {
        ...state,
        documentList: action.data.documentList,
      };
    case liveLectureActionTypes.REQUEST_RELOAD:
      return {
        ...state,
        requestReload: action.data.requestReload,
      };
    default:
      return state;
  }
}
