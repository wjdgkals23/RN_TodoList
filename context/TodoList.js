import React, { createContext } from 'react';

const UserContext = createContext({
    todoList: [],
    updateUsername: () => {},
});

export class UserProvider extends React.Component {
    updateUsername = newTodoList => {
        this.setState({ todoList: newTodoList });
    };

    state = {
        username: 'user',
        updateUsername: this.updateUsername,
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