import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  ingredientsErrorSelector,
  ingredientsLoadingSelector,
  ingredientsSelector
} from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(ingredientsSelector);
  const loading = useSelector(ingredientsLoadingSelector);
  const error = useSelector(ingredientsErrorSelector);
  const { id } = useParams<{ id: string }>();

  // Находим ингредиент по ID
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData || loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
