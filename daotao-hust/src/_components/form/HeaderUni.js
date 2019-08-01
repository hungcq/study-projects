import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

const HeaderUni = () => (
  <div>
    <Grid style={{
      textAlign: 'center'
    }}
    >
      <Grid.Column floated="left" width={1} />
      <Grid.Column floated="left" width={6}>
        <p style={{
          marginBottom: 0,
          fontSize: 13
        }}
        >
          BỘ GIÁO DỤC VÀ ĐÀO TẠO
        </p>
        <p style={{
          fontWeight: 'bold',
          fontSize: 13
        }}
        >TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI
        </p>
        <Divider />
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <p style={{
          marginBottom: 0,
          fontWeight: 'bold',
          fontSize: 13
        }}
        >
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </p>
        <p style={{
          fontWeight: 'bold',
          fontSize: 13
        }}
        >
          Độc lập – Tự do – Hạnh phúc
        </p>
        <Divider />
      </Grid.Column>
      <Grid.Column floated="right" width={1} />
    </Grid>
  </div>
);

export default HeaderUni;