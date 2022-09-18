import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';

import { MontyHome, MontyHomeProps } from '.';

export default {
  component: MontyHome,
  title: 'HomePage/MontyHome',
} as Meta;

const base: MontyHomeProps = {
  title: 'Home page (specific) feature',
  isTiltEnabled: true,
  onMontyHomeSelected: action('onMontyHomeSelected'),
};

const Template: Story<MontyHomeProps> = (args) => <MontyHome {...base} {...args} />;

export const Default = Template.bind({});

export const TiltDisabled = Template.bind({});
const TiltDisabledArgs: MontyHomeProps = {
  ...base,
  isTiltEnabled: false,
};
TiltDisabled.args = TiltDisabledArgs;
