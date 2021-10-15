import {storiesOf} from '@storybook/react-native';
import React from 'react';
import ProductCard from '../../../src/components/ProductCard';

storiesOf('Product card', module).add('Card', () => (
  <ProductCard name={'Paracetamol'} quantity={10} unit={'Tablet'} />
));
