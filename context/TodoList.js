import React, { createContext } from 'react';
import _ from "underscore";

const UserContext = createContext({
    todoList: [],
    addListItem: () => {},
    removeTodoListItem: () => {},
    changeTodoItemDone: () => {},
});

export class UserProvider extends React.Component {

    addListItem = (data) => {
        let newItem = { id: Date.now().toString(), content: data.content, date: data.date, done: false };
        this.setState({todoList: [...this.state.todoList, newItem]});
    };

    removeTodoListItem = (item) => {
        console.log("temp");
        console.log(item);
        this.setState({todoList: _.reject(this.state.todoList, (listItem) => { return listItem.id === item.id; })})
    };

    changeTodoItemDone = (item) => {
        console.log("changestate");
        console.log(item);
        let ind = _.findIndex(this.state.todoList, (listItem) => { return listItem.id === item.id });
        let newList = JSON.parse(JSON.stringify(this.state.todoList));
        newList[ind].done = true;
        this.setState({todoList: newList});
    };

    state = {
        todoList: [],
        removeTodoListItem: this.removeTodoListItem,
        addListItem: this.addListItem,
        changeTodoItemDone: this.changeTodoItemDone,
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