import { stub } from 'sinon';

const getReactReduxMock = () => ({
  connect: stub().returns(component => component)
});

export default getReactReduxMock;
