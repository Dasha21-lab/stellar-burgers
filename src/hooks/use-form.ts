import { ChangeEvent, useState } from 'react';

export type FormValues = { [key: string]: string };

export function useForm<T extends FormValues>(
  initialValues: T
): [
  T,
  (values: T | ((prev: T) => T)) => void,
  (e: ChangeEvent<HTMLInputElement>) => void
] {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setValues((prevValues) => ({ ...prevValues, [target.name]: target.value }));
  };

  return [values, setValues, handleChange];
}
