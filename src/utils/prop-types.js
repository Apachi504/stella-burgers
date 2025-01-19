import PropTypes from 'prop-types';

export const ingredientsPropTypes= PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    _id: PropTypes.string,
    key: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.number,
    id: PropTypes.string,
    success: PropTypes.bool,
    });