import { mediaStatusTypes, replayActionTypes, roomActionTypes, slideTypes } from '../_constants';

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
    //   slideType: slideTypes.MEDIA
    // },
    // {
    //   title: 'FLAC',
    //   url: 'https://storage.googleapis.com/lecture-slides/Heart-Shaped-Box.flac',
    //   slideType: slideTypes.MEDIA
    // },
  ],
  mediaStatus: mediaStatusTypes.STOP,
  mediaTime: 0,
  lastSlideUpdateTs: 0,
  requestReload: false,
  stream: null,
};

export function replayReducer(state = initState, action) {
  switch (action.type) {
    case 'RECEIVE_REPLAY_STREAM':
      return {
        ...state,
        stream: action.stream,
      };
    case replayActionTypes.CLEAR_STATE:
      return {
        ...initState,
        stream: state.stream,
      };
    case replayActionTypes.JOIN:
      return {
        ...state,
        studentList: [...state.studentList, { username: action.data.username }],
        lectureId: action.data.lectureId,
      };
    case replayActionTypes.START:
      return {
        ...state,
        lectureId: action.data.lectureId,
      };
    case replayActionTypes.LEAVE:
      return {
        ...state,
        studentList: state.studentList.map(item => {
          return item.username !== action.data.username;
        }),
      };
    case replayActionTypes.ACT:
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
              mediaStatus: mediaStatusTypes.STOP
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
    case replayActionTypes.SET_NUM_PAGES:
      return {
        ...state,
        numPages: action.data.numPages,
      };
    case replayActionTypes.GET_LECTURE_INFO:
      return {
        ...state,
        documentList: action.data.documentList,
      };
    case replayActionTypes.REQUEST_RELOAD:
      return {
        ...state,
        requestReload: action.data.requestReload,
      };
    default:
      return state;
  }
}
