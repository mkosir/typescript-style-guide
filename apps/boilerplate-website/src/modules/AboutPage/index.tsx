import { Button } from 'ui';

export const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <Button text="Boop" onClick={() => console.log('Boop')} />
    </div>
  );
};
