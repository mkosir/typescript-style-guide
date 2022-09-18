import { MontyHome } from './components/MontyHome';

export const HomePage = () => {
  return (
    <div className="m-5">
      <h2 className="text-xl font-medium leading-tight text-black">Home Page</h2>
      <MontyHome
        title="Home page (specific) feature"
        isTiltEnabled={true}
        className="mt-5"
        onMontyHomeSelected={(isHome) =>
          isHome ? console.log('Congrats') : console.log('Sorry, better luck next time')
        }
      />
    </div>
  );
};
