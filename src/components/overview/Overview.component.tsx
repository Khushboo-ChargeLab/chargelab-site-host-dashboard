import { Sessions, Summary, ChargerStatusChart } from '.';

export const Overview = () => {
  const chargerStatus = [
    {
      label: 'Available',
      value: 4,
      color: '#7CB342',
    },
    {
      label: 'Charging',
      value: 1,
      color: '#039BE5',
    },
    {
      label: 'Offline',
      value: 3,
      color: '#FFB300',
    },
    {
      label: 'Coming soon',
      value: 2,
      color: '#B0B8C1',
    },
  ];
  return (
    <>
      <div className='flex w-full'>
        <div className='inline-block w-2/5 pr-3'>
          <ChargerStatusChart data={chargerStatus} />
        </div>
        <div className='inline-block w-3/5 pl-3'>
          <Summary />
        </div>

      </div>

      <div className='mt-6 block'>
        <Sessions />
      </div>
    </>
    );
  };