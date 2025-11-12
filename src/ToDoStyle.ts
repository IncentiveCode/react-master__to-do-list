import styled from "styled-components";

export const Wrapper = styled.div`
	padding: 20px 20px;
	max-width: 1024px;
	margin: 0 auto;
`;

export const CategoryWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

export const Title = styled.h1`
	font-size: 18px;
	font-weight: bold;
`;

export const SubTitle = styled.h3`
	font-size: 15px;
	font-weight: 500;
`;

export const FormStyle = styled.form`
	display: flex;
	gap: 10px;
`;

export const ToDoListStyle = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const ToDoItemStyle = styled.li`
	display: flex;
	gap: 5px;
`;

export const ToDoContentStyle = styled.span`
	flex-grow: 1;
`;