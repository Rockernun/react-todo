import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import { StringLiteral } from "typescript";

//  atom에 접근하려면, useRecoilValue 함수를 이용
//  atom의 type이 ToDo의 배열임을 알려주기
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

interface IForm {
  toDo: string;
}

interface IToDo {  //  할 일, 하고 있는 일, 한 일
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);  //  value랑 변경 함수 둘다 들고 있다.
  const {
    register, handleSubmit, setValue
  } = useForm<IForm>();
  const handleValid = ({toDo}: IForm) => {
    setToDos(oldToDos => [{text:toDo, id:Date.now(), category:"TO_DO"}, ...oldToDos])  //  ...oldToDos는 배열 안의 요소를 반환
    setValue("toDo", ""); 
  };
  return <div>
    <h1>To Dos</h1>
    <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo", {
          required: "Please write a To Do", 
        })} placeholder="Write a to do" />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => (
        <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
  </div>;
}

export default ToDoList;