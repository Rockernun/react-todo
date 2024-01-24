import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const {
    register, handleSubmit, setValue
  } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log('add to do', data.toDo);
    //  Form이 제출될 경우, input을 비운다. 첫 번째 인자로 input의 register에 넣어준 이름 사용, 2번 인자로 바꿔줄 input 값
    setValue("toDo", ""); 
  }
  return <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo", {
          required: "Please write a To Do",  //  에러에 메시지 표시
        })} placeholder="Write a to do" />
        <button>Add</button>
      </form>
  </div>;
}

//  handleSubmit 함수를 사용할 때는 첫 번째 매개변수로 데이터가 유효할 때 호출되는 다른 함수를 받는 것.
//  원한다면, 데이터가 유효하지 않을 때 호출될 다른 함수를 2번째 매개변수로 넣을 수도 있다.  

export default ToDoList;