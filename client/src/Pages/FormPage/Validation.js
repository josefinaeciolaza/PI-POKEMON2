//  const imagenExReg = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;
//  function validation(form){
//     let errors: {};

//     if(!form.name){
//         errors.name = "Obligatory field";
//         }else{
//             errors.name = "" ;
//         } else if(form.name.length < 4 || form.name.length > 15) {
//             errors.name = 'Name must be longer than three characters... And less than 15!'
//         } else if(!/^[a-zA-Z\s]*$/.test(form.name)) {
//             errors.name = "only letters and spaces"
//         }
//         if(!form.image){
//             errors.image = "Obligatory field";
//         }else{
//             errors.image= "";
//         }else if(!imagenExReg.test(form.image)){
//             errors.image = "image invalid"
//         }
//         if(form.hp === 0 || form.attack === 0 || form.defense === 0 || form.speed === 0 || form.height === 0 || form.weight === 0) {
//             errors.hp = 'Complete all stats!'
//         }
    
//         return errors
// }

