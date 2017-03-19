const getReactReduxMock = () => ({
  connect: jasmine.createSpy('react-redux.connect').and.returnValue(component => component)
});

export default getReactReduxMock;
