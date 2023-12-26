// import { Gender } from '@/utils/types';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { AuthFormInput } from '../Inputs';

// // type ProfileFormDefaultValues = {
// //   userName: string;
// //   email: string;
// //   gender: Gender;
// // };

// const ProfileForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FieldValues>({
//     defaultValues: {
//       userName: '',
//       email: '',
//       gender: '',
//     },
//   });

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     console.log(data);
//   };

//   return (
//     <div>
//       <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
//         <input type="text" name="userName" />
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;
