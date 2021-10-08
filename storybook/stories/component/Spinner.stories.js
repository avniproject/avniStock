import {storiesOf} from '@storybook/react-native';
import React from 'react';
import Spinner from '../../../src/components/Spinner';

storiesOf('Spinner', module).add('Spinner', () => <Spinner show={true} />);
