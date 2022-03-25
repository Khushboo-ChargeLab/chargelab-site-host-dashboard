import { useDispatch, useSelector } from 'react-redux';
import { Label, LabelType } from '.';
import {
  chargelab, overviewSelected, chargers, pricing,
  access, company, payout, rfid,
  learning, help, chargerSelected, overview,
  pricingS, accessS,
} from '../../lib';
import { setCurrentNavigation } from '../../stores/reducers/app-navigation.reducer';
import { AppNavigator } from '../../stores/types/App-Navigator.interface';
import { getCurrentNavigation } from '../../stores/selectors/app-navigation.selector';

const menu:AppNavigator[] = [
  { path: '/overview', title: 'Overview' },
  { path: '/chargers', title: 'Chargers' },
  { path: '/Pricing', title: 'Pricing' },
  { path: '/Access', title: 'Access' },
  { path: '/Company', title: 'Company' },
  { path: '/Payout', title: 'Payout' },
  { path: '/RFID', title: 'RFID cards' },
  { path: '/Learning', title: 'Learning' },
  { path: '/Help', title: 'Help' },
];

export const AppSideBar = () => {
  const dispatch = useDispatch();
  const active = useSelector(getCurrentNavigation);

  const navigate = (_menu:AppNavigator) => {
    dispatch(setCurrentNavigation(_menu));
  };

  return (
    <div className="w-60 bg-white h-full block pl-5 pr-5 absolute">
      <img src={chargelab} alt="" className="pt-10 pr-3 pl-3 mb-10" />

      <div onClick={() => navigate(menu[0])} className={`flex items-center w-50 pr-20 cursor-pointer rounded mb-4 ${active.path === menu[0].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[0].path ? overviewSelected : overview} alt="" className="pt-2 pb-2 pl-3 pr-4" />
        <Label text="Overview" type={LabelType.LABEL_S} className={active.path === menu[0].path ? 'text-blue2' : 'text-grey6'} />
      </div>

      <div className="block pl-3">
        <Label text="CHARGER MANAGEMENT" type={LabelType.LABEL_XS} />
      </div>

      <div onClick={() => navigate(menu[1])} className={`flex items-center w-50 pr-20 cursor-pointer rounded mt-2 ${active.path === menu[1].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[1].path ? chargerSelected : chargers} alt="" className="pt-2 pb-2 pl-4 pr-4" />
        <Label text="Chargers" type={LabelType.LABEL_S_G6} className={active.path === menu[1].path ? 'text-blue2' : 'text-grey6'} />
      </div>
      <div onClick={() => navigate(menu[2])} className={`flex items-center w-50 pr-20 cursor-pointer rounded ${active.path === menu[2].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[2].path ? pricingS : pricing} alt="" className="pt-2 pb-2 pl-4 pr-4" />
        <Label text="Pricing" type={LabelType.LABEL_S_G6} className={active.path === menu[2].path ? 'text-blue2' : 'text-grey6'} />
      </div>
      <div onClick={() => navigate(menu[3])} className={`flex items-center w-50 pr-20 cursor-pointer rounded ${active.path === menu[3].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[3].path ? accessS : access} alt="" className="pt-2 pb-2 pl-4 pr-4" />
        <Label text="Access" type={LabelType.LABEL_S_G6} className={active.path === menu[3].path ? 'text-blue2' : 'text-grey6'} />
      </div>

      <div className="block pl-3 mt-4">
        <Label text="ADMIN" type={LabelType.LABEL_XS} />
      </div>
      <div onClick={() => navigate(menu[4])} className={`flex items-center w-50 pr-20 cursor-pointer rounded mt-2 ${active.path === menu[4].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[4].path ? chargerSelected : company} alt="" className="pt-2 pb-2 pl-4 pr-4" />
        <Label text="Company" type={LabelType.LABEL_S_G6} className={active.path === menu[4].path ? 'text-blue2' : 'text-grey6'} />
      </div>
      <div onClick={() => navigate(menu[5])} className={`flex items-center w-50 pr-20 cursor-pointer rounded ${active.path === menu[5].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[5].path ? chargerSelected : payout} alt="" className="pt-2 pb-2 pl-4 pr-4" />
        <Label text="Payout" type={LabelType.LABEL_S_G6} className={active.path === menu[5].path ? 'text-blue2' : 'text-grey6'} />
      </div>
      <div onClick={() => navigate(menu[6])} className={`flex items-center w-50 pr-20 cursor-pointer rounded ${active.path === menu[6].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[6].path ? chargerSelected : rfid} alt="" className="pt-2 pb-2 pl-4 pr-4" />
        <Label text="RFID cards" type={LabelType.LABEL_S_G6} className={active.path === menu[6].path ? 'whitespace-pre text-blue2' : 'whitespace-pre text-grey6'} />
      </div>

      <div className="block pl-3 mt-4">
        <Label text="RESOURCES" type={LabelType.LABEL_XS} />
      </div>
      <div onClick={() => navigate(menu[7])} className={`flex items-center w-50 pr-20 cursor-pointer rounded mt-2 ${active.path === menu[7].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[7].path ? chargerSelected : learning} alt="" className="pt-2 pb-2 pl-4 pr-4" />
        <Label text="Learning" type={LabelType.LABEL_S_G6} className={active.path === menu[7].path ? 'text-blue2' : 'text-grey6'} />
      </div>
      <div onClick={() => navigate(menu[8])} className={`flex items-center w-50 pr-20 cursor-pointer rounded ${active.path === menu[8].path ? 'bg-silver' : ''}`}>
        <img src={active.path === menu[8].path ? chargerSelected : help} alt="" className="pt-2 pb-2 pl-4 pr-4" />
        <Label text="Help" type={LabelType.LABEL_S_G6} className={active.path === menu[8].path ? 'text-blue2' : 'text-grey6'} />
      </div>
    </div>
  );
};
