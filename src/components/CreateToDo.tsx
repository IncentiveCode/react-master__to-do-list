import { SubmitHandler, useForm } from "react-hook-form";
import { useAtom } from 'jotai';
import { categoryState, IToDo, toDoState } from "../atoms";
import { FormStyle } from "../ToDoStyle";
import { useEffect } from "react";

interface IForm {
	text: string;
}

const toDoKey = "toDos";

function CreateToDo() {
	const [category] = useAtom(categoryState);
	const [list, setList] = useAtom(toDoState);

	useEffect(() => {
		const load = localStorage.getItem(toDoKey);
		console.log("useEffect (to-do)", load);

		if (load) {
			const json: IToDo[] = JSON.parse(load);
			setList(json);
		} else {
			localStorage.setItem(toDoKey, "[]");
		}

	}, [setList]);
	

	// use react-hook-form
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const handleValid: SubmitHandler<IForm> = ({ text }: IForm) => {
		const newItem = { id: Date.now(), content: text, category };

		setList((oldList) => [
			newItem,
			...oldList
		]);
		setValue("text", "");

		const updatedToDos = [newItem, ...list];
		localStorage.setItem(toDoKey, JSON.stringify(updatedToDos));
	};

	return (
		<>
			<hr />
			<FormStyle onSubmit={handleSubmit(handleValid)}>
				<input 
					{...register("text", {
						required: "Please write a new to-do",
					})}
					placeholder="Write a new to-do"
					style={{ flexGrow: 1 }}
				/>
				<input type="submit" value="Add To-Do" />
			</FormStyle>
			<hr />
		</>
	);
}

export default CreateToDo;