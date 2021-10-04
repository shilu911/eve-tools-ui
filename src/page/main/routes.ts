import ShipQuotes from '../shipQuotes/ShipQuotes';

const routes: [RouteType] = [
  {
    label: {
      zh: '舰船估价'
    },
    path: 'ship-quotes',
    component: ShipQuotes
  },
]

interface RouteLabelType {
  [key: string]: string;
}

export interface RouteType {
  label: RouteLabelType,
  path: string,
  component: any
}



export default routes;
