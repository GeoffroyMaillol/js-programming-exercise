import { render, screen } from '@testing-library/react';
import UserDataDisplay from './UserDataDisplay';
import SearchForUserData from './SearchForUserData';
import React, { act } from 'react';

type Props = React.ComponentProps<typeof SearchForUserData>;
let childProps: Props;

jest.mock('./SearchForUserData', () => {
  const MockChild = (props: Props) => {
    React.useLayoutEffect(() => {
      childProps = props;
    }, [props]);

    return <div>Mock Child</div>;
  };

  MockChild.displayName = 'MockSearchForUserData';
  return {
    __esModule: true,
    default: MockChild,
  };
});

test('shows error message in snackbar', () => {
  render(<UserDataDisplay />);
  expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  act(() => {
    childProps.onError("Something went wrong");
  });

  expect(screen.getByText("Something went wrong")).toBeInTheDocument();
});
