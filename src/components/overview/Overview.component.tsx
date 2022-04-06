import { Sessions, Summary, ChargerStatusChart } from '.';

export const Overview = () => (
  <>
    <div className='flex w-full'>
      <div className='inline-block w-2/5 pr-3'>
        <ChargerStatusChart />
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