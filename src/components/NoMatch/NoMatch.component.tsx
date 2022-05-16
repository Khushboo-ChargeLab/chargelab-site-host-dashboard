import { memo } from 'react';
import { Link } from 'react-router-dom';

export const NoMatch = memo(() => (
  <div>
    <div>Nothing to see here</div>
    <Link to='/'>Go to the home page</Link>
  </div>
));
