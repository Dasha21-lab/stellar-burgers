import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  ingredientsErrorSelector,
  ingredientsLoadingSelector,
  ingredientsSelector
} from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router';
import { fetchIngredients } from '../../services/thunk/ingredients-thunk';

export const IngredientDetails: FC = () => {
  
    const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(ingredientsSelector);
  
  // Находим ингредиент по ID
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};


// const ingredients = useSelector(ingredientsSelector);
  // const loading = useSelector(ingredientsLoadingSelector);
  // const error = useSelector(ingredientsErrorSelector);

  //   console.log('ingredients:', ingredients);
  // console.log('ingredients length:', ingredients?.length);
  // console.log('ingredients type:', typeof ingredients);

  // const params = useParams();

  
  // const ingredientData = ingredients?.find((item) => item._id === params.id);

  // console.log('params:', params);
  // console.log('params.id:', params.id);
  // console.log('ingredientData:', ingredientData);

  // if (error) {
  //   return <div>Ошибка загрузки: {error}</div>;
  // }

  // // const displayData = ingredientData || ingredients[0];
  
  // if (!ingredientData || loading) {
  //   return <Preloader />;
  // }