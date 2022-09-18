import { Button } from 'ui';

export const HomePage = () => {
  // const test = "test333" + 1;

  // if (test === null) {
  //   return <div></div>;
  // }

  return (
    <div>
      <h1>Home</h1>
      <Button text="Boop" onClick={() => console.log('Boop')} />
    </div>
  );
};
