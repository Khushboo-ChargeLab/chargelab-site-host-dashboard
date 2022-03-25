import PropTypes from 'prop-types';
import { Label, LabelType } from '.';

export const FormInput = ({ label = '', error = '', ...props }) => (
  <div className="block">
    <div className="block pb-2">
      <Label type={LabelType.LABEL_M} text={label} />
    </div>

    <div className="block">
      <input
        className="pl-3 pr-3 pt-2.5 pb-2.5 rounded text-sm font-sans text-black bg-silver"
        {...props}
      />
    </div>

    {error && (
    <Label type={LabelType.ERROR} text={error} />
    )}
  </div>
);

FormInput.defaultProps = {
  label: '',
  error: '',
};

FormInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};
