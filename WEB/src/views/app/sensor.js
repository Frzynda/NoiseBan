/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Table,
  CardTitle,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { api } from 'constants/defaultValues';
import { ThemeColors } from 'helpers/ThemeColors';
import { BarChart, ScatterChart } from 'components/charts';
import Switch from 'rc-switch';
import { NotificationManager } from 'components/common/react-notifications';

const Sensor = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [dataSensor, setDataSensor] = useState({});
  const [jarak, setJarak] = useState({});
  const [sensors, setSensors] = useState([]);
  const [values, setValues] = useState([]);
  const [showModal, setShowModal] = useState({
    show: false,
    selected: '',
  });

  const fetchData = async () => {
    await axios.get(`${api}/data.json`).then((response) => {
      const x = response.data ? [...Object.keys(response.data)] : [];
      const y = [];
      const data = { ...dataSensor };
      x.forEach((i) => {
        const newestValue = response.data[i][response.data[i].length - 1];
        y.push(newestValue.value);
        data[i] = newestValue;
      });
      setSensors(x);
      setValues(y);
      setDataSensor(data);
      setLoading(false);
    });
  };

  const addSensor = async () => {
    setLoading(true);
    const prev = [...sensors];
    const keys = prev.map((i) => parseInt(i[i.length - 1]));
    let now = new Date();
    now.setHours(now.getHours() + 7);

    let newData = {};
    if (prev.includes(`sensor_${prev.length + 1}`)) {
      let newKey = keys
        .map((i, index) => {
          if (index + 1 !== i) {
            return index + 1;
          }
        })
        .filter((x) => x !== undefined)[0];
      newData[`sensor_${newKey}`] = [
        {
          timestamp: now,
          value: 0,
        },
      ];
    } else {
      newData[`sensor_${prev.length + 1}`] = [
        {
          timestamp: now,
          value: 0,
        },
      ];
    }
    try {
      await axios.patch(`${api}/data.json`, newData).then((response) => {
        if (response.status === 200) {
          NotificationManager.success(
            `Berhasil menambahkan sensor!`,
            'Berhasil',
            2000,
            null,
            null,
            ''
          );
        }
        fetchData();
      });
    } catch (e) {
      NotificationManager.error(e.message, 'Gagal', 2000, null, null, '');
    }
  };

  const deleteSensor = async (key) => {
    setLoading(true);
    try {
      await axios.delete(`${api}/data/${key}.json`).then((response) => {
        NotificationManager.success(
          `Berhasil menghapus ${key}!`,
          'Berhasil',
          2000,
          null,
          null,
          ''
        );
        fetchData();
      });
    } catch (e) {
      NotificationManager.error(e.message, 'Gagal', 2000, null, null, '');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    const id = setInterval(fetchData, 1500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (sensors.length > 0) {
      let temp = {};
      sensors.map((key) => {
        const x = dataSensor[key].value * -1 + (35 - dataSensor[key].value);
        if (x > 0.5) {
          temp[key] = (x / 30).toFixed(2);
        } else {
          temp[key] = 0.1;
        }
      });
      setJarak(temp);
    }
  }, [dataSensor]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.sensor" match={match} />
          <Separator className="mb-5" />
        </Colxx>
        <Colxx xxs="12">
          <Card>
            {loading ? (
              <div className="loading" />
            ) : (
              <CardBody>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <p className="h6 font-weight-bold my-auto">Daftar sensor</p>
                  <Button color="primary btn-shadow" onClick={addSensor}>
                    Tambah
                  </Button>
                </div>
                <Table>
                  <thead>
                    <tr className="font-weight-bold">
                      <td width="5%">#</td>
                      <td width="35%">Nama</td>
                      <td width="25%">Nilai keributan saat ini</td>
                      <td width="25%">Jarak keributan saat ini</td>
                      <td width="10%">Hapus</td>
                    </tr>
                  </thead>
                  <tbody>
                    {sensors.length > 0 &&
                      sensors.map((val, index) => (
                        <tr
                          key={index}
                          style={{
                            background: (index + 1) % 2 === 0 ? '#FFF3E7' : '',
                          }}
                        >
                          <td>{index + 1}</td>
                          <td>{val}</td>
                          <td>{dataSensor[val].value} dB</td>
                          <td>
                            {dataSensor[val].value > 0
                              ? jarak[val]
                              : `> ${jarak[val]}`}{' '}
                            m
                          </td>
                          <td>
                            <i
                              className="simple-icon-trash font-weight-bold text-danger p-2"
                              style={{
                                cursor: 'pointer',
                                fontSize: '1rem',
                              }}
                              onClick={() =>
                                setShowModal({
                                  show: true,
                                  selected: val,
                                })
                              }
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            )}
          </Card>
        </Colxx>
      </Row>
      <Modal isOpen={showModal.show}>
        <ModalHeader toggle={() => setShowModal({ show: false })}>
          <p className="h6 my-2">
            Yakin menghapus <strong>{showModal.selected}</strong>?
          </p>
        </ModalHeader>
        <ModalFooter className="py-3">
          <Button
            outline
            color="primary"
            onClick={() => setShowModal({ show: false })}
          >
            Batal
          </Button>
          <Button
            color="danger btn-shadow"
            onClick={() => {
              deleteSensor(showModal.selected);
              setShowModal({ show: false, selected: '' });
            }}
          >
            Hapus
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Sensor;
