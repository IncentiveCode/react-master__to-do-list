import { SubmitHandler, useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { categoriesState, categoryState } from '../atoms';
import { CategoryWrapper, FormStyle } from '../ToDoStyle';
import { useEffect } from 'react';

interface ICategoryForm {
	newCategory: string;
}

const categoriesKey = "categories";
const defaultCategories = ["To-do", "In-progress", "Done"];

function CategoryArea() {
	const [categories, setCategories] = useAtom(categoriesState);

	useEffect(() => {
		const load = localStorage.getItem(categoriesKey);
		console.log("useEffect (category)", load);

		if (load) {
			const json: string[] = JSON.parse(load);
			setCategories(json);
		} else {
			localStorage.setItem(categoriesKey, JSON.stringify(defaultCategories));
		}
	}, [setCategories]);

	// use react-hook-form
	const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<ICategoryForm>();
	const handleValid: SubmitHandler<ICategoryForm> = ({ newCategory }: ICategoryForm) => {

		if (categories.includes(newCategory)) {
			setError(
				"newCategory",
				{ message: "존재하는 카테고리입니다." },
				{ shouldFocus: true }
			);
			return;
		}

		setCategories((categories) => [
			...categories,
			newCategory
		]);
		setValue("newCategory", "");

		const updatedCategories = [...categories, newCategory];
		localStorage.setItem(categoriesKey, JSON.stringify(updatedCategories));
	};

	// use jotai atom
	const [category, setCategory] = useAtom(categoryState);
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value);
	};

	return (
		<CategoryWrapper>
			<select name="category" value={category} onInput={onInput}>
				{categories.map((c) => (
					<option key={c} value={c}>{c}</option>
				))}
			</select>

			<FormStyle style={{ justifyContent: 'end' }} onSubmit={handleSubmit(handleValid)}>
				<input 
					{...register("newCategory")}
					placeholder="Write a new category"
				/>
				<input type="submit" value="Add Category" />
				{errors?.newCategory?.message ? (
					<span>{errors.newCategory.message}</span>
				) : null}
			</FormStyle>
		</CategoryWrapper>
	);
}

export default CategoryArea;