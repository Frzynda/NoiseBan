/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardTitle,
  CustomInput,
  Input,
  Row,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { api } from 'constants/defaultValues';
import { ThemeColors } from 'helpers/ThemeColors';
import { BarChart, BarChart2, LineChart } from 'components/charts';
import Switch from 'rc-switch';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import id from 'date-fns/locale/id';

const Monitoring = ({ match }) => {
  const colors = ThemeColors();
  const [loading, setLoading] = useState(false);
  const [dataSensor, setDataSensor] = useState(null);
  const [jarak, setJarak] = useState({});
  const [realtime, setRealtime] = useState(true);
  const [intervalId, setIntervalId] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [avr, setAvr] = useState(0);
  const [condition, setCondition] = useState(1);
  const [sensors, setSensors] = useState([]);
  const [values, setValues] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const fetchData = async () => {
    await axios.get(`${api}/data.json`).then((response) => {
      const x = response.data ? [...Object.keys(response.data)] : [];
      setSensors(x);
      const y = [];
      const data = { ...dataSensor };
      const allData = { ...dataSensor };
      x.forEach((i) => {
        const sensorValue = response.data[i];
        y.push(sensorValue[response.data[i].length - 1].value);
        data[i] = sensorValue[response.data[i].length - 1];
        allData[i] = sensorValue;
      });
      setDataSensor(data);
      setHistory(allData);
      setValues(y);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(history).length > 0) {
      const data = {};
      sensors.forEach((key) => {
        let temp = [];
        let subTemp = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let hourTemp = 0;
        let count = 0;
        history[key].forEach((item) => {
          let sourceDate = item.timestamp.split('T')[0];
          sourceDate = sourceDate
            .split('-')
            .map((i) => parseInt(i))
            .join('-');
          let selectedDate = `${selectedTime.getFullYear()}-${
            selectedTime.getMonth() + 1
          }-${selectedTime.getDate()}`;
          console.log(selectedDate);
          const sourceHour = parseInt(
            item.timestamp.split('T')[1].split(':')[0]
          );
          for (let i = 0; i < 24; i++) {
            if (sourceHour === i && sourceDate === selectedDate) {
              count += 1;
              hourTemp = hourTemp + parseInt(item.value);
              subTemp.splice(i, 1, hourTemp / count);
            }
          }
        });
        temp.push(subTemp);
        data[key] = temp[0];
      });
      const x = [...sensors].map((key) => {
        return {
          label: key,
          borderColor: colors.themeColor1,
          backgroundColor: colors.themeColor1_10,
          data: data[key],
          borderWidth: 1,
        };
      });
      setSelectedData(x);
    }
  }, [selectedTime, history]);

  useEffect(() => {
    if (dataSensor) {
      let temp = {};
      [...sensors].map((key) => {
        const x = dataSensor[key].value * -1 + (35 - dataSensor[key].value);
        if (x > 0.5) {
          temp[key] = (x / 30).toFixed(2);
        } else {
          temp[key] = 0.1;
        }
      });
      setJarak(temp);

      const sorted = [...values].sort((a, b) => a - b);
      setMax(sorted[sorted.length - 1]);
      setMin(sorted[0]);
      let total = 0;
      sorted.forEach((val) => {
        total = total + val;
      });
      const average = (total / sorted.length).toFixed(2);
      setAvr(average);
    }
  }, [dataSensor, sensors, values]);

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
              {!realtime && (
                <Colxx md="3">
                  <ReactDatePicker
                    placeholderText="Pilih tanggal"
                    onChange={(date) => setSelectedTime(date)}
                    selected={selectedTime}
                    locale={id}
                    dateFormat="dd/MM/yyyy"
                  />
                </Colxx>
              )}
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
              ) : realtime ? (
                <BarChart
                  shadow
                  data={{
                    labels: sensors,
                    datasets: [
                      {
                        label: 'Nilai sensor',
                        borderColor: colors.themeColor1,
                        backgroundColor: colors.themeColor1_10,
                        data: values,
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              ) : (
                <LineChart
                  data={{
                    labels: [
                      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                      17, 18, 19, 20, 21, 22, 23,
                    ],
                    datasets: selectedData,
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
                <BarChart2
                  shadow
                  data={{
                    labels: [...Object.keys(jarak)],
                    datasets: [
                      {
                        label: 'Nilai jarak',
                        borderColor: colors.themeColor2,
                        backgroundColor: colors.themeColor2_10,
                        data: [...Object.values(jarak)],
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
