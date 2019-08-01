import React from 'react';
import { Container, Form, Grid } from 'semantic-ui-react';
import HeaderDep from './HeaderDep';
import { semesterOptions, numberOptions } from './constants';

const PrintTranscript = () => (
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
          >ĐƠN ĐỀ NGHỊ CẤP BẢNG ĐIỂM IN SAO
          </h2>
          <div>
            <Grid>
              <Grid.Column width={5} floated="right" style={{
                textAlign: 'right'
              }}
              >
                <br />
                <h4 style={{
                  marginTop: 0,
                  fontFamily: 'Times New Roman'
                }}
                >
                  <i>Kính gửi:</i>
                </h4>
              </Grid.Column>
              <Grid.Column width={7} floated="left">
                <ul style={{
                  textAlign: 'left'
                }}
                >
                  <li>Ban lãnh đạo Viện CNTT&TT</li>
                  <li>Giáo vụ Viện</li>
                </ul>
              </Grid.Column>
            </Grid>
          </div>
        </section>
        <Grid style={{
          marginTop: '1%'
        }}
        >
          <Grid.Column width={3} />
          <Grid.Column width={12}>
            <Form>
              <Form.Group>
                <label>Tên em là</label>
                <Form.Input width="5" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;Số hiệu sinh viên:&nbsp;</label>
                <Form.Input width="5" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Lớp:</label>
                <Form.Input width="6" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;Khoá:&nbsp;&nbsp;</label>
                <Form.Input width="6" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Điện thoại liên hệ: </label>
                <Form.Input width="4" size="mini" />
                <label>&nbsp;&nbsp;&nbsp;Địa chỉ mail:&nbsp;&nbsp;</label>
                <Form.Input width="6" size="mini" />
              </Form.Group>
              <Form.Group>
                <label>Kính đề nghị Viện cấp cho em bảng điểm in sao từ kỳ:</label>
                <Form.Select width="2" size="mini" options={semesterOptions} compact />
                <label>&nbsp;&nbsp;&nbsp;đến kỳ :&nbsp;&nbsp;</label>
                <Form.Select width="2" size="mini" options={semesterOptions} compact />
                <label>&nbsp;&nbsp;&nbsp;số lượng :&nbsp;&nbsp;</label>
                <Form.Select width="1" size="mini" options={numberOptions} compact />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
        <p style={{
          textAlign: 'center',
        }}
        >Em xin chân thành cảm ơn!
        </p>
      </div>
    </Container>
  </div >
);

export default PrintTranscript;