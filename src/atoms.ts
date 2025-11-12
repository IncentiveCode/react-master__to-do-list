import { atom } from 'jotai';

// category enum 
/**
export enum Categories {
	"To-do" = "To-do", 
	"Doing" = "Doing", 
	"Done" = "Done"
}

export interface IToDo {
	id: number;
	content: string;
	category: Categories;
}

export const categoryState = atom<Categories>(Categories["To-do"]);
 */

// challenge : custom category
export interface IToDo {
	id: number;
	content: string;
	category: string;
}

export const categoryState = atom("To-do");
export const categoriesState = atom<string[]>(["To-do", "In-progress", "Done"]);

export const toDoState = atom<IToDo[]>([]);

/**
// not use
export const getToDo = atom(
	(get) => get(toDoState).filter((item) => item.category === Categories["To-do"])
);

export const getDoing = atom(
	(get) => get(toDoState).filter((item) => item.category === Categories["Doing"])
);

export const getDone = atom(
	(get) => get(toDoState).filter((item) => item.category === Categories["Done"])
);
 */

export const filteredItem = atom(
	(get) => {
		const category = get(categoryState);
		return get(toDoState).filter((item) => item.category === category);
	}
);