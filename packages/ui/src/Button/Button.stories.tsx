import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '.';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const base: ButtonProps = {
  text: 'Click Me',
  onClick: action('onClick'),
};

const Template: Story<ButtonProps> = (args) => <Button {...base} {...args} />;

export const Default = Template.bind({});

export const LongText = Template.bind({});
const LongTextArgs: ButtonProps = {
  ...base,
  text: 'Really Looooong Text',
};
LongText.args = LongTextArgs;
