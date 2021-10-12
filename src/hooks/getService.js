import BeanRegistry from '../framework/bean/BeanRegistry';

export const getService = serviceName => {
  return BeanRegistry.getService(serviceName);
};
