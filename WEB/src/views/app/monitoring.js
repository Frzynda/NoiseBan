/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardTitle, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { api } from 'constants/defaultValues';
import { ThemeColors } from 'helpers/ThemeColors';
import { BarChart, ScatterChart } from 'components/charts';
import Switch from 'rc-switch';

const Monitoring = ({ match }) => {
  const colors = ThemeColors();
  const [loading, setLoading] = useState(false);
  const [dataSensor, setDataSensor] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [jarak, setJarak] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [realtime, setRealtime] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [avr, setAvr] = useState(0);
  const [condition, setCondition] = useState(1);

  const fetchData = async () => {
    await axios.get(`${api}/data.json`).then((response) => {
      setDataSensor(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (dataSensor) {
      let temp = {};
      [...Object.keys(dataSensor)].map((key) => {
        const x = dataSensor[key] * -1 + (100 - dataSensor[key]);
        if (x > 0.5) {
          temp[key] = (x / 30).toFixed(2);
        } else {
          temp[key] = 0.1;
        }
      });
      setJarak(temp);

      const sorted = [...Object.values(dataSensor)].sort((a, b) => a - b);
      setMax(sorted[sorted.length - 1]);
      setMin(sorted[0]);
      let total = 0;
      sorted.forEach((val) => {
        total = total + val;
      });
      const average = (total / sorted.length).toFixed(2);
      setAvr(average);
    }
  }, [dataSensor]);

  useEffect(() => {
    if (avr < 30) {
      setCondition(1);
    } else if (avr >= 30 && avr < 50) {
      setCondition(2);
    } else {
      setCondition(3);
    }
  }, [avr]);

  useEffect(() => {
    if (realtime) {
      const id = setInterval(fetchData, 1500);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
  }, [realtime]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.monitoring" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-2">
        <Colxx md="6" className="mb-2">
          <Card className="p-4">
            <div className="d-flex align-items-center justify-content-between">
              <CardTitle>Tingkat keributan (dB)</CardTitle>
              <div className="d-flex">
                <p className="text-muted my-auto mr-2">Realtime</p>
                <Switch
                  className="custom-switch custom-switch-small custom-switch-primary"
                  checked={realtime}
                  onChange={() => setRealtime(!realtime)}
                />
              </div>
            </div>
            <div className="chart-container">
              {loading ? (
                <div className="loading position-absolute align-self-center" />
              ) : (
                <BarChart
                  shadow
                  data={{
                    labels: dataSensor ? [...Object.keys(dataSensor)] : [],
                    datasets: [
                      {
                        label: 'Nilai sensor',
                        borderColor: colors.themeColor1,
                        backgroundColor: colors.themeColor1_10,
                        data: dataSensor ? [...Object.values(dataSensor)] : [],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              )}
            </div>
          </Card>
        </Colxx>
        <Colxx md="6" className="mb-2">
          <Card className="p-4">
            <div className="d-flex align-items-center justify-content-between">
              <CardTitle>Jarak keributan (m)</CardTitle>
            </div>
            <div className="chart-container">
              {loading ? (
                <div className="loading position-absolute align-self-center" />
              ) : (
                <BarChart
                  shadow
                  data={{
                    labels: dataSensor ? [...Object.keys(jarak)] : [],
                    datasets: [
                      {
                        label: 'Nilai jarak',
                        borderColor: colors.themeColor2,
                        backgroundColor: colors.themeColor2_10,
                        data: dataSensor ? [...Object.values(jarak)] : [],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              )}
            </div>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="p-4">
            <div className="d-flex">
              <CardTitle>Informasi</CardTitle>
            </div>
            <p>
              Kondisi keseluruhan:
              <Badge
                pill
                className="ml-2"
                color={
                  condition === 1
                    ? 'success'
                    : condition === 2
                    ? 'warning'
                    : 'danger'
                }
              >
                {condition === 1
                  ? 'TENANG'
                  : condition === 2
                  ? 'RIBUT'
                  : 'SANGAT RIBUT'}
              </Badge>
            </p>
            <p>
              Nilai tertinggi yang terdeteksi: <strong>{max}dB</strong>
            </p>
            <p>
              Nilai terendah yang terdeteksi: <strong>{min}dB</strong>
            </p>
            <p>
              Nilai rata-rata keributan semua sensor: <strong>{avr}dB</strong>
            </p>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Monitoring;
