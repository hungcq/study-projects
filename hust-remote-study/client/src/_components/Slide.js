import React from 'react';
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { doSetNumPages } from '../_actions';
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf';
import { accountTypes, roomActionTypes, slideTypes } from '../_constants';
import {
  emitPerformActionLecture,
  emitUploadSlide,
  getUsername,
  isStudent,
} from '../_utils';
import { DocumentList, Player } from './';
import { lectureService } from '../_services';
import { NotificationManager } from 'react-notifications';
import SignatureCanvas from 'react-signature-canvas';

class Slide extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      url: '',
      pageHeight: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidMount () {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions () {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.props.setNumPages({
      numPages,
    });
  };

  onPageChanged = (dPage) => {
    let currentPage = this.props.currentPage;
    const numPages = this.props.numPages;
    if (currentPage + dPage <= numPages && currentPage + dPage >= 1) {
      currentPage += dPage;
    }
    const data = {
      lectureId: this.props.lectureId,
      actionType: roomActionTypes.CONTROL_SLIDE,
      currentPage,
      username: getUsername(this.props.auth),
    };
    emitPerformActionLecture(data);
    // if (this.sigCanvas) {
    //   this.sigCanvas.clear();
    // }
  };

  playQuestions = () => {
    window.playQuestions(6072877866549248, 6074425386531822);
    // window.playQuestions(4573188096786432, 5088367209349120);
  };

  uploadNewSlide = (id, url, file) => {
    this.setState({url: ''});
    lectureService.addSlide(id, url, file).then(response => {
      if (response.data && response.data.slideUrl) {
        emitUploadSlide({slideUrl: response.data.slideUrl, lectureId: id});
      }
    }).catch(error => {
      if (error.response && error.response.data &&
        error.response.data.error) {
        NotificationManager.error(error.response.data.error);
      }
      NotificationManager.error(JSON.stringify(error));
    }).then(() => {
      // always executed
    });
  };

  onChange = (e, {name, value}) => {
    this.setState({
      [name]: value,
    });
  };

  onDrawEnd = (canvasData) => {
    const data = {
      lectureId: this.props.lectureId,
      actionType: roomActionTypes.DRAW,
      canvasData: JSON.stringify(canvasData),
      username: getUsername(this.props.auth),
    };
    emitPerformActionLecture(data);
  };

  componentWillReceiveProps (nextProps, nextContext) {
    let canvasData;
    if (this.props.replaying) {
      canvasData = nextProps.replay.canvasData;
    } else {
      canvasData = nextProps.liveLecture.canvasData;
    }
    if (this.sigCanvas && canvasData && canvasData !== '') {
      this.sigCanvas.fromData(JSON.parse(canvasData));
    }
  }

  onPageLoadSuccess = (page) => {
    this.setState({pageHeight: page.height});
  };

  render () {
    const {
      numPages, currentPage, slideUrl, documentList,
      lectureId, slideType, mediaStatus, replaying, mediaTime,
    } = this.props;
    const isFromElearning = this.props.auth.accessToken === 'elearning';
    const uploadSlide = (<div>
      {isFromElearning || replaying ? null
        :
        <Grid stackable divided>
          <Grid.Column width={8}>
            <Form onSubmit={() => this.uploadNewSlide(lectureId, null,
              this.fileInput.current.files[0])}>
              <Form.Field>
                <label>Slide Upload</label>
                <input type='file' ref={this.fileInput}/>
              </Form.Field>
              <Form.Button content='Upload file'/>
            </Form>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form onSubmit={() => this.uploadNewSlide(lectureId, this.state.url,
              null)}>
              <Form.Input fluid
                          name='url'
                          value={this.state.url}
                          label='Document URL'
                          placeholder='URL'
                          onChange={this.onChange}/>
              <Form.Button content='Add Document'
                           disabled={this.state.url === ''}/>
            </Form>
          </Grid.Column>
        </Grid>
      }
    </div>);
    const docList = (<div>
      <Divider/>
      <DocumentList documentList={documentList} lectureId={lectureId}
                    slideUrl={slideUrl} replaying={replaying}/>
      {isStudent(this.props.auth) ?
        <Button onClick={this.playQuestions}>
          Practice Exercises
        </Button>
        :
        uploadSlide
      }
      <div style={{display: 'none'}}>
        <div id="modal-main-template" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Modal Header</h4>
              </div>
              <div className="modal-body"></div>
              <div className="modal-footer">
                <Button color='blue'
                        data-dismiss="modal">
                  Ok
                </Button>
                <Button color='red'
                        data-dismiss="modal">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

    return (
      <div>
        {!slideUrl
          ? (
            <Segment placeholder>
              <Header icon>
                <Icon name='pdf file outline'/>
                No documents.
              </Header>
              {docList}
            </Segment>
          )
          : (
            <Segment textAlign='center'>
              {slideType === slideTypes.PDF
                ?
                <div style={styles.myContainer}>
                  <Document
                    file={slideUrl}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                  >
                    <Page
                      width={this.state.width / 2.1}
                      key={`page_${currentPage}`}
                      pageNumber={currentPage}
                      style={styles.myPage}
                      onLoadSuccess={this.onPageLoadSuccess}
                    >
                      <div style={styles.myCanvas}>
                        <SignatureCanvas
                          ref={(ref) => { this.sigCanvas = ref; }}
                          onEnd={() => this.onDrawEnd(this.sigCanvas.toData())}
                          penColor='red'
                          minWidth={3}
                          dotSize={3}
                          canvasProps={{
                            width: this.state.width / 2.1,
                            height: this.state.pageHeight < 600 ? this.state.pageHeight : 600,
                            className: 'sigCanvas',
                          }}
                        />
                      </div>
                    </Page>
                  </Document>
                  {
                    this.props.auth.accountType === accountTypes.LECTURER &&
                    lectureId !== '' &&
                    !replaying
                      ?
                      <div>
                        <Divider/>
                        <Button icon labelPosition='left'
                                onClick={() => this.onPageChanged(-1)}
                                disabled={currentPage === 1 || numPages === 0}>
                          <Icon name='left arrow'/>
                          Prev
                        </Button>
                        <Button icon labelPosition='right'
                                onClick={() => this.onPageChanged(1)}
                                disabled={currentPage === numPages ||
                                numPages === 0}>
                          Next
                          <Icon name='right arrow'/>
                        </Button>
                      </div>
                      :
                      null
                  }
                </div>
                :
                <Player
                  url={slideUrl}
                  lectureId={lectureId}
                  width={this.state.width}
                  mediaStatus={mediaStatus}
                  mediaTime={mediaTime}
                  replaying={replaying}/>
              }
              {docList}
            </Segment>
          )
        }
      </div>
    );
  }
}

const styles = {
  myContainer: {
    position: 'relative',
  },
  myPage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  myCanvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
};

const mapState = state => state;

const mapDispatch = (dispatch) => ({
  setNumPages: data => dispatch(doSetNumPages(data)),
});

const connectedSlide = connect(mapState, mapDispatch)(Slide);
export { connectedSlide as Slide };