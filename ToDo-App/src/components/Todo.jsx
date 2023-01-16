import React,{useState,useEffect} from 'react';
import './Todo.css';

function Todo() {
  
  /*Todos dont disappear after reloading if we get them from local storage */
  const data = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : [];

  const [inputData, setInputData] = useState('')
  const [task, setTask] = useState(data);
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  // console.log(inputData);
  // console.log(task);

  /*Add Todos*/
  const addItem = () => {
    if (!inputData) {
      alert('Please fill the field')
    } else if (inputData && !toggle) {
      setTask(
        task.map((item) => {
          if (item.id === isEditItem) {
            return {...item,name:inputData}
          }

          return item;
        })
      );
      setToggle(true);
      setInputData('');
      setIsEditItem(null);
      
    }else {
      const allInputData = {id:new Date().getTime().toString(), name:inputData}
      setTask([...task, allInputData]);
      setInputData('');
    }  
  }
  
  /*edit individual task*/
  const editTask = (id) => {
    const editItem = task.find((item) => {
      return item.id === id
    });
    console.log(editItem);

    setToggle(false);

    setInputData(editItem.name);

    setIsEditItem(id);
  }

  /*delete individual task*/
  const deleteTask = (index) => {
    // console.log(key);
      const filteredArr = task.filter((item) => {
        return index !==  item.id
      })

    setTask(filteredArr);
    
  }
  
  /*Remove All tasks*/
  const removeAllHandler = () => {
    setTask([]);
  }

  useEffect(()=>{
    localStorage.setItem('task', JSON.stringify(task));
  },[task])
  
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          
          <img className='image' src='images/Todo.png' alt='Todo image'></img>
          
          <div  className='input-icons'>
            
            <input
              className="input-field"
              type='text'
              placeholder='✍️ Add your tasks here...'
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {
              toggle ?
                <i onClick={addItem} className="fa fa-plus " title='Add task'></i> :

                <i onClick={addItem} className="fa fa-edit" title='Update task'></i>

            }
          
          </div>
          
          {
            task.map((item) => {
              return (
                
                <div className="task" key={item.id}>
            
                  <p>{item.name}</p>
                 
                  <i onClick={() => editTask(item.id)} title='Edit task' className="fa fa-edit "></i>
              
                  <i onClick={() => deleteTask(item.id)} title='Remove task' className="fa fa-trash"></i>
                
                </div>
              
              )
            })
          }
         
         
          <button className='btn-danger'onClick={removeAllHandler}>Remove All</button>
        
        
        </div>
      </div>

      
    </>
  )
}

export default Todo