import renderer from 'react-test-renderer';
import Button from './Button'; 

describe('Button component', () => {
  it('renders a button with provided text', () => {
    const tree = renderer.create(<Button text="Click me" className='text-black' color='primary' disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
  