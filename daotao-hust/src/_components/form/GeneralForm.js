import React from 'react';
import { Container, Form, Grid, TextArea } from 'semantic-ui-react';
import HeaderDep from './HeaderDep';

const GeneralForm = () => (
  <div>
    <Container>
      <div className="form-doc-panel form-doc-panel-portrait">
        <HeaderDep />
        <Grid style={{
          marginTop: '1%'
        }}
        >
          <Grid.Column width={3} />
          <Grid.Column width={12}>
            <Form>
              <Form.Group>
                <Form.Input width="14" size="mini" />
              </Form.Group>
              <Form.Group>
                <label><i><b>Kính gửi:</b></i></label>
                <Form.Input width="13" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Tên em là:</label>
                <Form.Input width="5" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;MSSV:&nbsp;</label>
                <Form.Input width="6" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Là sinh viên đang học tại lớp:</label>
                <Form.Input width="4" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;Khoá:&nbsp;&nbsp;</label>
                <Form.Input width="5" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Chuyên ngành:&nbsp;&nbsp;</label>
                <Form.Input width="12" size="mini" />
              </Form.Group>
              <TextArea placeholder="Tell us more" />
            </Form>
          </Grid.Column>
        </Grid>
        <p style={{
          textAlign: 'center',
        }}
        >Em xin chân thành cảm ơn!
        </p>
        <Grid>
          <Grid.Column width={10} />
          <section style={{
            marginTop: '0.5%',
            textAlign: 'center'
          }}
          >
            <p>Hà Nội, ngày {new Date().getDay() + 1} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}</p>
            <h5>Người làm đơn</h5>
          </section>
        </Grid>
      </div>
    </Container>
  </div >
);

export default GeneralForm;