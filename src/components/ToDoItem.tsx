// import { useAtom, type PrimitiveAtom } from "jotai"
import { useAtom } from "jotai"
import { categoriesState, IToDo, toDoState } from "../atoms"
import { DeleteButton, ToDoContentStyle, ToDoItemStyle } from "../ToDoStyle"

/**
type RemoveFn = (item: PrimitiveAtom<IToDo>) => void
type ToDoItemProps = {
  atom: PrimitiveAtom<IToDo>
  remove: RemoveFn
}

function ToDoItem({ atom, remove }: ToDoItemProps) {
	const [item, setItem] = useAtom(atom);
	return (
		<ToDoItemStyle>
			<ToDoContentStyle>{item.content}</ToDoContentStyle>
			<button>To-Do</button>
			<button>Doing</button>
			<button>Done</button>
			<button onClick={() => remove(atom)}>Delete</button>
		</ToDoItemStyle>
	);
}
 */

function ToDoItem(item: IToDo) {
	const [categories] = useAtom(categoriesState);
	const [list, setList] = useAtom(toDoState);

	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { 
			currentTarget: { name },
		} = event;
		// console.log(name);

		setList((oldList) => {
			const index = oldList.findIndex((toDo) => toDo.id === item.id);
			const newCategory = name
			const updagedToDo: IToDo = { id: item.id, content: item.content, category: newCategory };
			const result = [
				...oldList.slice(0, index), 
				updagedToDo, 
				...oldList.slice(index + 1)
			]

			localStorage.setItem("toDos", JSON.stringify(result));
			return result;
		})
	};

	const onRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
		setList((oldList) => {
			const result = oldList.filter((toDo) => toDo.id !== item.id);

			localStorage.setItem("toDos", JSON.stringify(result));
			return result;
		});
	};

	return (
		<ToDoItemStyle>
			<ToDoContentStyle>{item.content}</ToDoContentStyle>
			{categories.map((category) => (
				item.category !== category && (
					<button key={category} name={category} onClick={onClick}>{category}</button>
				)
			))}
			<DeleteButton onClick={onRemove}>x</DeleteButton>
		</ToDoItemStyle>
	);
}

export default ToDoItem;