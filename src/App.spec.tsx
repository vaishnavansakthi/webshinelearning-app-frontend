
import TestRenderer from 'react-test-renderer';
import App from './App';

test('Renders the main page', () => {
  const component = TestRenderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
