import React, {useState} from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import './style.css';

const App = () => {
    const [todo, setTodo] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");  
    const [todos, setTodos] = useState([]);
    // const [allCategory, setAllCategory] = useState([]);
    const [searchfield, setSearchfield] = useState("");
    const [allCategories, setallcategories] = useState(new Set());
    const [searchtodo, setSearchtodo] = useState("");
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [searchcat, setSearchcat] = useState("");
    const [result,setResult] = useState([]);

    // const [state, setstate] = useState({
    //     query: '',
    //     list: []
    // })
    // const

    useEffect(() => {
        let arr = localStorage.getItem("todos");
        // alert(arr);
        if(arr){
            setTodos(JSON.parse(arr));
        }else{
            setTodos([]);
        }
    },[])

    useEffect(()=>{
        getallCategory();
    },[todos])

    // const 

    const addTodo = () =>{
        const id = uuid();
        // const date;
        setTodos([...todos, {id : id, text : todo, status: false, time: date, type: category}]);
        
        localStorage.setItem("todos",JSON.stringify([...todos, {id : id, text : todo, status: false, time: date, type: category}]))
    
    };
    const deleteTodo = (id) => {
        setTodos(todos.filter((t) => t.id !== id));
        localStorage.setItem("todos", JSON.stringify(todos.filter((t) => t.id !== id)))
    };
    const markasDone = (id) => {
        setTodos(
            todos.map((t) => {
                if(t.id === id){
                    t.status =!t.status;
                }
                return t;
            })
        )
    }
    const getallCategory = () => {
        // const allCategories = new Set();
        let arr_temp=[];
        {todos.map(todo =>(
            arr_temp.push(todo.type)
        ))}
        setallcategories(arr_temp)
    }
    // const searchfun = (info) =>{
    //     const result = info.filter(t => {
    //         return (t.lowercase().includes(info.lowercase()));
    //     }
    //   );
    // }
    const handleChange = () =>{
        setResult(todos.filter(todo =>{
            let flag=true;
            if(searchtodo.length>0){
                if(!todo.text.includes(searchtodo)){
                    flag=false;
                }
            }    
            if(searchcat.length>0){
                if(todo.type!== searchcat){
                    flag=false;
                }
            }
            if(date1.length > 0){
                if(((new Date(todo.time)) < (new Date(date1)))){
                    flag = false;
                }
            }
            if(date2.length > 0){
                if(((new Date(todo.time)) > (new Date(date2)))){
                    flag = false;
                }                
            }
            return flag;   
        }))
    }
    
    return(
        <>
            <div style={{display:"flex", flexDirection:"row", justifyContent: "center"}}><h1>Todo list</h1></div>
           <div style={{display:"flex", justifyContent: "space-evenly"}}>
           <input value = {todo} 
           onChange = {(e) => setTodo(e.target.value)} 
           type = "text" placeholder="Add your task here"></input>
           {/* <button onClick={addTodo}>Add</button> */}
           <input value = {date} onChange = {(e) => setDate(e.target.value)} type = "date">
            {/* <button onClick={}>submit</button> */}
           </input >
           <input value = {category} onChange = {(e) => setCategory(e.target.value)} type="text" placeholder="Add category here"/>
            <button onClick={addTodo} style={{marginLeft:"10px"}}>submit</button>
            </div> 
           <div className="todos">
            <ol>
                {todos.map((todo) => {
                    return(
                        <li key={todo.id} style = {{marginTop:'20px'}}>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                            <button type="checkbox" onClick={() => {markasDone(todo.id)}} style={{}}>Mark as Done</button>
                            {todo.status === true ? <s>{todo.text}</s>: todo.text}
                            <button onClick={() => deleteTodo(todo.id)}>delete</button>
                            <p>{todo.time}</p>
                            <p>{todo.type}</p>
                            </div>                            
                        </li>
                    );
                    // return <li>{todo}</li>
                })}                
            </ol>
            {/* <button onClick={handleChange}> search </button> */}
            {/* //{searchList()} */}
            {/* <input value={} */}
           </div>
           <div>
                <>
                    <div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly"}}>
                        <span><h2 style={{marginLeft:"100px"}}>Start Date</h2></span>
                        <span><h2 style={{marginRight:"200px"}}>End Date</h2></span>                    
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly"}}>
                        <input value={searchtodo} onChange={(e)=>setSearchtodo(e.target.value)} type ="text" placeholder="Search Task"></input>
                        <input onChange={(e)=>setDate1(e.target.value)} value = {date1} type="date"/>
                        <input onChange={(e)=>setDate2(e.target.value)} value={date2}type="date"/>
                        <select onChange={(e)=>setSearchcat(e.target.value)} style={{width:'30%', marginLeft:'20px'}}>
                            <option>all</option>
                            {(Array.from(allCategories)).map((singlecat) => (
                                <option>{singlecat}</option>
                            ))}</select>
                        {/* <input value = {searchcat} type="text" placeholder="search by categroy"  onChange={(e)=>setSearchcat(e.target.value)}></input>  */}
                        <button onClick={handleChange} style={{marginLeft:"10px"}} >submit!</button>
                    </div>
                 
                </>
                <ul>
                    {
                        (result.map(todo => {
                            return <li key={todo.id}>{todo.text}</li>
                        }))
                    }
                </ul>
           </div>
           {/* <p>{todo}</p> */}
           <div >
                    {/* <div>
                        <button onClick={getallCategory}>Get All categories</button>
                    </div> */}
                    <div style={{display: 'flex',justifyContent:'center'}}>
                         <h1 style={{justifyContent:'center'}}>All Categories</h1>
                    </div>
                    <div style={{display: 'flex',justifyContent:'center', flexDirection:'column', width:'100%', alignItems:'center'}}>
                        {(Array.from(allCategories)).map((singlecat) => (
                            <h2><li >{singlecat}</li></h2>
                        ))}
                    </div>

           </div>
        </>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));
