import React, { Component } from 'react';
import './Todo.css'



class Todo extends Component {

    state = {
        task: '',
        tasks: [
            // {
            //     id: 1,
            //     task: 'Test Task',
            //     completed: true
            // },
            // {
            //     id: 2,
            //     task: 'Test Task1',
            //     completed: true
            // },
            // {
            //     id: 3,
            //     task: 'Test Task2',
            //     completed: false
            // },
            // {
            //     id: 4,
            //     task: 'Test Task3',
            //     completed: false
            // },
            // {
            //     id: 5,
            //     task: 'Test Task5',
            //     completed: true
            // },
        ],
        filters: [
            {
                name: 'All',
                active: true
            },
            {
                name: 'Active',
                active: false
            },
            {
                name: 'Completed',
                active: false
            },
        ],
      currentFilter: 'All'
        
    }


    // temporarily string task input in state
     onTaskAddHandler = (value) => {
        this.setState({...this.state, task: value});
        // console.log(value);
        // console.log(this.state);
    }


    // onclick filters changing filter state

    onFilterClickHandler = (name) => {
        console.log(name);
        switch(name) {
            case 'All':
                let newFl1 = [...this.state.filters];
                let fl1 = newFl1.map((filter) => {
                    if(filter.name === 'All') {
                        filter.active = true;
                    }
                    else {
                        filter.active = false;

                    }
                    return filter;
                }); 
                return this.setState({
                    ...this.state,
                    filters: fl1,
                    currentFilter: 'All'
                });
            case 'Completed':
                let newFl2 = [...this.state.filters];
                let fl2 = newFl2.map((filter) => {
                    if(filter.name === 'Completed') {
                        filter.active = true;
                    }
                    else {
                        filter.active = false;

                    }
                    return filter;
                }); 

                return this.setState({
                    ...this.state,
                    filters: fl2,
                    currentFilter: 'Completed'
                });
            case 'Active':
                let newFl3 = [...this.state.filters];
                let fl3 = newFl3.map((filter) => {
                    if(filter.name === 'Active') {
                        filter.active = true;
                    }
                    else {
                        filter.active = false;

                    }
                    return filter;
                }); 
                return this.setState({
                    ...this.state,
                    filters: fl3,
                    currentFilter: 'Active'
                });
               
            default:
                break;
        }
    }


    // when task checkbx clicked 
    onCheckboxChangeHandler = (event, task_id) => {
        console.log(event.target.checked,task_id);
        let taskItems = [...this.state.tasks];
        let newTaskItems = taskItems.map((task) => {
            if(task.id === task_id) {
                task.completed = !task.completed
            }
            return task;
        });
        this.setState({...this.state, tasks: newTaskItems});

    }

    // ondelete task
    onDeleteHandler = (task_id) => {
        let taskItems = [...this.state.tasks];
        let filteredItems = taskItems.filter((task) => task.id !== task_id);
        this.setState({...this.state, tasks: filteredItems});
    }

    // when user typing finished and pressed enter

    onEnterHandler = (event) => {
        if(event.key === 'Enter' || event.keyCode === 13) {
            console.log("Enter Pressed");
            // adding new task here
            let newTask = {
                id: parseInt(Math.random() * 100),
                task: this.state.task,
                completed: false
            }

            let oldItems = this.state.tasks;
            let newItems = [...oldItems, newTask];
            this.setState({
                ...this.state,
                task: '',
                tasks: newItems
            });
        }
    }

    render() {

        // rendering tasks based on the filter choosen
        let todoItems = this.state.tasks.map((task,index) => {
            if(this.state.currentFilter === 'All') {
                if(task.completed) {
                    return (
                        <div className="TodoItem" key={index}>
                            <input type="checkbox" checked={task.completed}  onChange={(event) => {
                               this.onCheckboxChangeHandler(event, task.id)
                           }} />
                            <label><del>{task.task}</del></label>
                            <span onClick={() => this.onDeleteHandler(task.id)}>X</span>
                            
                        </div>
                    )
                }
                else {
                    return (
                        <div className="TodoItem" key={index}>
                           <input type="checkbox" checked={task.completed} onChange={(event) => {
                               this.onCheckboxChangeHandler(event, task.id)
                           }} />
                           <label>{task.task}</label>
                           <span onClick={() => {
                               let check = window.confirm("This task is active, Do you want to delete ?");
                               if(check) {
                                    this.onDeleteHandler(task.id)
                               }
                           } }>X</span>
    
                       </div>
                       )
                }
            }
            else if(this.state.currentFilter === "Completed") {
                if(task.completed) {
                    return (
                        <div className="TodoItem" key={index}>
                            <input type="checkbox" checked={task.completed}  onChange={(event) => {
                               this.onCheckboxChangeHandler(event, task.id)
                           }} />
                            <label><del>{task.task}</del></label>
                            <span onClick={() => this.onDeleteHandler(task.id)}>X</span>
                            
                        </div>
                    )
                }
            }
            else if(this.state.currentFilter === "Active"){
                if(!task.completed) {
                    return (
                        <div className="TodoItem" key={index}>
                           <input type="checkbox" checked={task.completed} onChange={(event) => {
                               this.onCheckboxChangeHandler(event, task.id)
                           }} />
                           <label>{task.task}</label>
                           <span  onClick={() => {
                               let check = window.confirm("This task is active, Do you want to delete ?");
                               if(check) {
                                    this.onDeleteHandler(task.id)
                               }
                           } }>X</span>
    
                       </div>
                       )
                }
                
            }
            // return task;         
        });


        // counting active tasks using array reduce method
        let count = this.state.tasks.reduce((total, task) => {
            if(!task.completed){
               return  total += 1;
            }
            return total;
        },0); //start value


       
        // rendering filters based on active or not
        let filters = this.state.filters.map((filter, index) => {
            if(filter.active) {
                return <p className="active" key={index} onClick={() => this.onFilterClickHandler(filter.name)}>{filter.name}</p>;
            }else {
                return <p key={index} onClick={() => this.onFilterClickHandler(filter.name)}>{filter.name}</p>;
            }
        });


        return (
            <div className="Todo">
                <h1>Todos</h1>
                <input 
                    type="text" 
                    placeholder="What's next"
                    value={this.state.task}
                    onChange={(event) => {
                    this.onTaskAddHandler(event.target.value);
                }} onKeyUp={(event) => {this.onEnterHandler(event)}} />

                {/* Todo Items */}
                <div>
                    {todoItems}
                </div>

                {/* Count and Filters */}
                <div >
                    <p>{count} active tasks</p>
                </div>


                <div className="Filters">
                   {filters}
                </div>

            </div>
        )
    }
}


export default Todo;


