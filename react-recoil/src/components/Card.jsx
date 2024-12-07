import PropTypes from "prop-types";

const Card = ({ title, description, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.any,
};

export default Card;
