<template>
    <section>
        <h2>Add To Do</h2>
        <br>
        <form @submit.prevent="addTodo()" v-if="agregar">
            <input type="text" placeholder="Add to do" name="" id="" v-model="todo.nombre"><br>
            <button type="submit">Add</button>
        </form>
         <form @submit.prevent="updateTodo(todoEdit)" v-else>
            <h3>Edit To do</h3>
            <input type="text" name="" id="" placeholder="Edit to do" v-model="todoEdit.nombre"><br>
            <button type="submit">Edit</button>
            <button @click="agregar = true">Cancel</button>
        </form>
        <br>
        <table border="1px">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Todo</th>
                    <th>Date</th>
                    <th colspan="2">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="nota in todos">
                    <th> {{nota._id}} </th>
                    <th> {{nota.nombre}} </th>
                    <th> {{nota.date}} </th>
                    <th><button @click="activeTodo(nota._id)">Update</button></th>
                    <th><button @click="deleteTodo(nota._id)">Delete</button></th>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    export default{
        data(){
            return{
                todos: [],
                todo: {nombre: ''},
                agregar: true,
                todoEdit: {},
            }
        },
        created(){
            this.getTodos();
        },
        methods:{
            getTodos(){
                this.axios.get('/getTodos')
                .then((res) => {
                    //console.log(res.data);
                    this.todos = res.data;
                })
                .catch((e) => {
                    console.log('erro..' + e);
                })
            },
            activeTodo(id){
                this.agregar = false;
                this.axios.get(`/getTodos/${id}`)
                .then(res => {
                    this.todoEdit = res.data;
                })
                .catch(e => {
                    console.log(e.response);
                })
            },
            updateTodo(todo){
                this.axios.put(`/updateTodo/${todo._id}`, todo)
                .then(res => {
                    const index = this.todos.findIndex(n => n._id === res.data._id);

                    this.todos[index].nombre = res.data.nombre;

                    this.agregar = true;

                })
                .catch(e => {
                    console.log(e.response);
                })
            },
            deleteTodo(id){
                this.axios.delete(`/deleteTodo/${id}`)
                .then(res => {
                    let index = this.todos.findIndex(item => item._id === res.data._id);

                    this.todos.splice(index, 1);
                })
                .catch(e => {
                    console.log(e.response);
                });
            },
            addTodo(todo){
                this.axios.post('/newTodo', this.todo)
                .then(res => {
                    this.todos.push(res.data);
                    this.todo.nombre = '';
                })
                .catch( e => {
                    if(e.response.data.error.errors.nombre.message){
                        console.log(e.response.data.error.errors.nombre.message);
                    }
                })
            }

        }
    }
</script>