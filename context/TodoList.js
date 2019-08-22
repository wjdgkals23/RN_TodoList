import React, { createContext } from 'react';
import _ from "underscore";

const UserContext = createContext({
    todoList: [],
    addListItem: () => {},
    removeTodoListItem: () => {},
});

export class UserProvider extends React.Component {

    addListItem = (data) => {
        let newItem = { id: Date.now().toString(), content: data.content, date: data.date };
        this.setState({todoList: [...this.state.todoList, newItem]});
    };

    removeTodoListItem = (item) => {
        console.log("temp");
        console.log(item);
        this.setState({todoList: _.reject(this.state.todoList, (listItem) => { return listItem.id === item.id; })})
    };

    state = {
        todoList: [],
        removeTodoListItem: this.removeTodoListItem,
        addListItem: this.addListItem,
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export const UserConsumer = UserContext.Consumer;