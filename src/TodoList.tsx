import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
interface IForm {
  toDo: string;
}
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDos) => (
          <li key={toDos.id}>{toDos.text}</li>
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
// interface IForm {
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   password1: string;
//   extraError: string;
// }
// function ToDoList() {
//   const {
//     register,
//     handleSubmit,
//     formState,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   const onValid = (data: IForm) => {
//     if (data.password !== data.password1) {
//       setError(
//         "password1",
//         { message: "Password are not the same." },
//         { shouldFocus: true }
//       );
//     }
//     setError("extraError", { message: "Server Offline." });
//   };
//   console.log(formState.errors);
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("email", {
//             required: "Write here.",
//             validate: {
//               noNico: (value) =>
//                 value.includes("nico") ? "No nicos allowed" : true,
//               noNick: (value) =>
//                 value.includes("nicks") ? "No nick allowed" : true,
//             },
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only naver Email is allowed. ",
//             },
//           })}
//           placeholder="Email"
//         />
//         <span>{errors?.email?.message as string}</span>
//         <input
//           {...register("firstName", {
//             required: "Write here.",
//             validate: (value) =>
//               value.includes("nico") ? "No nicos allowed" : true,
//           })}
//           placeholder="First Name"
//         />
//         <span>{errors?.firstName?.message as string}</span>
//         <input
//           {...register("lastName", { required: "Write here." })}
//           placeholder="Last Name"
//         />
//         <span>{errors?.lastName?.message as string}</span>
//         <input
//           {...register("username", { required: "Write here.", minLength: 10 })}
//           placeholder="Username"
//         />
//         <span>{errors?.username?.message as string}</span>
//         <input
//           {...register("password", { required: "Write here.", minLength: 5 })}
//           placeholder="Password"
//         />
//         <span>{errors?.password?.message as string}</span>
//         <input
//           {...register("password1", {
//             required: "Password is required",
//             minLength: {
//               value: 5,
//               message: "Your password is too short.",
//             },
//           })}
//           placeholder="Password1"
//         />
//         <span>{errors?.password1?.message as string}</span>
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }
// export default ToDoList;
