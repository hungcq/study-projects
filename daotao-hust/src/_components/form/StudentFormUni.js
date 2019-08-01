import React from 'react';
import { Container, Form, Grid } from 'semantic-ui-react';
import HeaderUni from './HeaderUni';
import { classOptions } from './constants';

const StudentFormUni = () => (
  <div>
    <Container>
      <div className="form-doc-panel form-doc-panel-portrait">
        <HeaderUni />
        <section style={{
          textAlign: 'center'
        }}
        >
          <h2 style={{
            fontFamily: 'Times New Roman',
            marginBottom: 0
          }}
          >GIẤY CHỨNG NHẬN SINH VIÊN
          </h2>
          <h4 style={{
            marginTop: 0,
            fontFamily: 'Times New Roman'
          }}
          >
            HIỆU TRƯỞNG TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI
          </h4>
        </section>
        <Grid style={{
          marginTop: '1%'
        }}
        >
          <Grid.Column width={3} />
          <Grid.Column width={12}>
            <Form>
              <Form.Group>
                <label>Chứng nhận anh/chị:</label>
                <Form.Input width="5" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;Số hiệu sinh viên:&nbsp;</label>
                <Form.Input width="4" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Sinh ngày:</label>
                <Form.Input width="5" size="mini" type="date" />
                <label>&nbsp;&nbsp;&nbsp;Tại thành phố/tỉnh:&nbsp;&nbsp;</label>
                <Form.Input width="5" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Địa chỉ gia đình:</label>
                <Form.Input width="11" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Chỗ ở hiện nay:&nbsp;&nbsp;</label>
                <Form.Input width="11" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Là sinh viên lớp:</label>
                <Form.Input width="4" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;Khóa:&nbsp;&nbsp;</label>
                <Form.Input width="2" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;Thuộc hệ:&nbsp;&nbsp;</label>
                <Form.Select width="2" size="mini" options={classOptions} compact />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
        <p style={{
          textAlign: 'center',
          marginTop: '0.5%'
        }}
        >
          <i><b>Giấy này có giá trị 30 ngày kể từ ngày ký</b></i>
        </p>
        <Grid>
          <Grid.Column width={10} />
          <section style={{
            marginTop: '0.5%',
            textAlign: 'center'
          }}
          >
            <p>Hà Nội, ngày {new Date().getDay() + 1} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}</p>
            <h5>T/L. HIỆU TRƯỞNG</h5>
          </section>
        </Grid>
      </div>
    </Container>
  </div >
);

export default StudentFormUni;