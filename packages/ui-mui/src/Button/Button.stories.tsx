import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '.';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const base: ButtonProps = {
  text: 'Click Me',
  isDisabled: false,
  size: 'medium',
  bgColor: undefined,
  onClick: action('onClick'),
};

const Template: Story<ButtonProps> = (args) => <Button {...base} {...args} />;

export const Default = Template.bind({});
Default.args = base;

export const LongText = Template.bind({});
const LongTextArgs: ButtonProps = {
  ...base,
  text: 'Really Looooong Text',
};
LongText.args = LongTextArgs;

export const Disabled = Template.bind({});
const DisabledArgs: ButtonProps = {
  ...base,
  isDisabled: true,
};
Disabled.args = DisabledArgs;

export const RedBgColor = Template.bind({});
const RedBGColorArgs: ButtonProps = {
  ...base,
  bgColor: 'red',
};
RedBgColor.args = RedBGColorArgs;
