import React from 'react';
import { Container, Form, Grid } from 'semantic-ui-react';
import HeaderDep from './HeaderDep';

const RefDep = () => (
  <div>
    <Container>
      <div className="form-doc-panel form-doc-panel-portrait">
        <HeaderDep />
        <section style={{
          textAlign: 'center'
        }}
        >
          <h2 style={{
            fontFamily: 'Times New Roman',
            marginBottom: 0
          }}
          >GIẤY GIỚI THIỆU
          </h2>
        </section>
        <Grid style={{
          marginTop: '1%'
        }}
        >
          <Grid.Column width={3} />
          <Grid.Column width={12}>
            <Form>
              <Form.Group>
                <label><i><b>Kính gửi:</b></i></label>
                <Form.Input width="13" size="mini" />
              </Form.Group>
              <h4 style={{
                marginTop: 0,
                fontFamily: 'Times New Roman',
                marginLeft: '10%'
              }}
              >
                VIỆN TRƯỞNG VIỆN CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG
              </h4>
              <Form.Group>
                <label>Trân trọng giới thiệu anh/chị:</label>
                <Form.Input width="5" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;Số hiệu sinh viên:&nbsp;</label>
                <Form.Input width="3" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Lớp:</label>
                <Form.Input width="6" size="mini" type="date" />
                <label>&nbsp;&nbsp;&nbsp;Khoá:&nbsp;&nbsp;</label>
                <Form.Input width="5" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Chức vụ:</label>
                <Form.Input width="13" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Được cử đến:&nbsp;&nbsp;</label>
                <Form.Input width="12" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Về việc:&nbsp;&nbsp;</label>
                <Form.Input width="13" size="mini" />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
        <p style={{
          textAlign: 'center',
        }}
        >Đề nghị Quý cơ quan tạo điều kiện giúp đỡ ông (bà) có tên trên hoàn thành nhiệm vụ.
        </p>
        <p style={{
          textAlign: 'center',
          marginTop: '0.5%'
        }}
        >
          <i><b>Giấy này có giá trị 15 ngày kể từ ngày ký</b></i>
        </p>
        <Grid>
          <Grid.Column width={10} />
          <section style={{
            marginTop: '0.5%',
            textAlign: 'center'
          }}
          >
            <p>Hà Nội, ngày {new Date().getDay() + 1} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}</p>
            <h5>VIỆN TRƯỞNG</h5>
          </section>
        </Grid>
      </div>
    </Container>
  </div >
);

export default RefDep;