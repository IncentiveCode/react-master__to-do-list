import { useAtom } from "jotai"
import { Helmet } from "react-helmet";
import { Title, Wrapper, ToDoListStyle } from "./ToDoStyle";
import { filteredItem } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDoItem from "./components/ToDoItem";
import CategoryArea from "./components/CategoryArea";

function ToDoApp() {
	const [toDos] = useAtom(filteredItem);

	return (
		<Wrapper>
			<Helmet>
				<title>To-Do List</title>
			</Helmet>

			<Title>To-Do List</Title>
			<hr/>

			<CategoryArea />

			<CreateToDo />

			<ToDoListStyle>
				{toDos.map((item) => (
					<ToDoItem
						key={item.id}
						{...item} 
					/>
				))}
			</ToDoListStyle>
		</Wrapper>
	)
}

export default ToDoApp;