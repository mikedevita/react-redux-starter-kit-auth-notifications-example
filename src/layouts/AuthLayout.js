import '../styles/core.scss';

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Statelesss Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// AuthLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
function AuthLayout ({ children }) {
  return (
    <div className='page-container'>
      <div className='view-container'>
        {children}
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: React.PropTypes.element
};

export default AuthLayout;
