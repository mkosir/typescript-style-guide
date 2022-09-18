import { Story, Meta } from '@storybook/react';

import { Status404Page } from '.';

export default {
  component: Status404Page,
  title: 'Status404Page',
} as Meta;

const Template: Story = (args) => <Status404Page {...args} />;

export const Default = Template.bind({});
