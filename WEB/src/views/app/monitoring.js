/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, CardTitle, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { api } from 'constants/defaultValues';
import { ThemeColors } from 'helpers/ThemeColors';
import { BarChart } from 'components/charts';

const Monitoring = ({ match }) => {
  const colors = ThemeColors();
  const [loading, setLoading] = useState(false);
  const [dataSensor, setDataSensor] = useState({
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Nilai sensor',
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [0, 0, 0, 0, 0, 0],
        borderWidth: 1,
      },
    ],
  });

  const fetchData = async () => {
    await axios.get(api).then((response) => {
      setLoading(false);
      const data = response.data;
      setDataSensor({
        labels: [...Object.keys(data)],
        datasets: [
          {
            label: 'Nilai sensor',
            borderColor: colors.themeColor1,
            backgroundColor: colors.themeColor1_10,
            data: [...Object.values(data)],
            borderWidth: 1,
          },
        ],
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setInterval(() => {
      fetchData();
    }, 1500);
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.monitoring" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {loading ? (
        <div className="loading" />
      ) : (
        <Row className="mb-2">
          <Colxx xxs="6" className="mb-2">
            <Card className="p-4">
              <CardTitle>Tingkat keributan</CardTitle>
              <div className="chart-container">
                <BarChart shadow data={dataSensor} />
              </div>
            </Card>
          </Colxx>
        </Row>
      )}
    </>
  );
};

export default Monitoring;
