import React, {useContext, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import currency from 'currency.js';
import AppContext from '../../context/AppContext';
import zh from './language/zh.json';
import {useI18n} from '@shopify/react-i18n';
import {Col, Form, Input, PageHeader, Row, Table, Typography} from 'antd';
import ShipBuild from '../../type/ShipBuild';
import useAsyncEffect from 'use-async-effect';
import {findAllShipBuild} from '../../service/ShipService';
import Group from '../../type/Group';
// eslint-disable-next-line
import {findAllGroups} from '../../service/GroupService';
import Label from '../../type/Label';

const Text = Typography.Text;

interface ShipQuotesPropType extends RouteComponentProps {

}

interface FilterType {
  name: string;
}

interface ShipType {
  name: string;
  group: string;
  groupId: number;
  buildTime: number|null;
  techLevel: number|null;
  quotes: number|null;
  note: any;
}

const ShipQuotes = (props: ShipQuotesPropType) => {
  const appContext = useContext(AppContext);
  const currentLanguage = appContext.language;
  const [ships, setShips] = useState([] as ShipType[]);
  const [materialEfficiency] = useState(0.96);
  const [materialCostPercentage] = useState(0.8);
  const [profit] = useState(0.2);
  const [filters, setFilters] = useState({} as FilterType);
  // const [groups, setGroups] = useState([] as Group[]);
  const [i18n] = useI18n({
    id: 'shipQuotes',
    fallback: zh,
    translations: locale => {
      switch (locale) {
        case 'zh':
          return zh;
        default:
          return undefined;
      }
    },
  });
  useAsyncEffect(async () => {
    // @ts-ignore
    const results =await Promise.all([findAllShipBuild(), findAllGroups()]);
    const shipBuilds = results[0] as ShipBuild[];
    const groupMap = {} as {[key:string]: Label};
    // @ts-ignore
    results[1].forEach((g: Group) => {
      groupMap[g.id] = g.label;
    })
    const data = shipBuilds.map((ship: ShipBuild) => ({
      // @ts-ignore
      name: ship['label'][currentLanguage],
      // @ts-ignore
      group: groupMap[ship.groupId] ? groupMap[ship.groupId][currentLanguage] : '',
      groupId: ship.groupId,
      buildTime: ship.buildTime,
      techLevel: ship.techLevel,
      quotes: currency(Math.floor(((((ship.mineCost || 0) + (ship.planetaryResourceCost || 0)) * materialEfficiency + (ship.blueprintCost || 0)) * materialCostPercentage + (ship.buildCost || 0)) * ( 1 + profit)), { pattern: '#', separator: ',', precision: 0 }).format(),
      note: <>
        {ship.buildCost ? null : <div><Text>{i18n.translate('ShipQuotes.table.missingBuildCost')}</Text></div>}
        {ship.mineCost ? null : <div><Text>{i18n.translate('ShipQuotes.table.missingMineCost')}</Text></div>}
        {ship.planetaryResourceCost ? null : <div><Text>{i18n.translate('ShipQuotes.table.missingPr')}</Text></div>}
        {ship.blueprintCost ? null : <div><Text>{i18n.translate('ShipQuotes.table.missingBPCost')}</Text></div>}
      </>
    }))
    // @ts-ignore
    setShips(data);
    // setGroups(results[1] as Group[]);
  }, [])

  const columns = [
    {
      title: i18n.translate("ShipQuotes.table.name"),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: i18n.translate("ShipQuotes.table.group"),
      dataIndex: 'group',
      key: 'group'
    },
    {
      title: i18n.translate("ShipQuotes.table.buildTime"),
      dataIndex: 'buildTime',
      key: 'buildTime'
    },
    {
      title: i18n.translate("ShipQuotes.table.techLevel"),
      dataIndex: 'techLevel',
      key: 'techLevel'
    },
    {
      title: i18n.translate("ShipQuotes.table.quotes"),
      dataIndex: 'quotes',
      key: 'quotes'
    },
    {
      title: i18n.translate("ShipQuotes.table.note"),
      dataIndex: 'note',
      key: 'note'
    },
  ];

  let filtedShips = ships;
  if (filters.name) {
    filtedShips = filtedShips.filter(ship => ship.name.indexOf(filters.name) >= 0);
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title={i18n.translate('ShipQuotes.title')}
        backIcon={false}
      />
      <Row>
        <Col span={16}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label={i18n.translate("ShipQuotes.table.name")}
              name="name"
            >
              <Input onChange={e => setFilters({...filters, name: e.target.value})}/>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Table
        columns={columns}
        pagination={{ position: ['bottomCenter'] }}
        dataSource={filtedShips}
      />
    </div>
  );
}

export default ShipQuotes;
