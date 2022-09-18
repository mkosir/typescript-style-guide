import { MontyHome } from './components/MontyHome';

export const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <MontyHome
        title="Home page (specific) feature"
        isTiltEnabled={true}
        onMontyHomeSelected={(isHome) =>
          isHome ? console.log('Congrats') : console.log('Sorry, better luck next time')
        }
      />
    </div>
  );
};
