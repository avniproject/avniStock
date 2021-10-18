import {storiesOf} from '@storybook/react-native';
import React from 'react';
import BottomActionButtons from '../../../src/components/BottomActionButtons';

storiesOf('Bottom Action Buttons', module).add('BottomActionButtons', () => (
  <BottomActionButtons
    onCancel={() => console.log('Cancel pressed')}
    onSave={() => console.log('Save pressed')}
  />
));
