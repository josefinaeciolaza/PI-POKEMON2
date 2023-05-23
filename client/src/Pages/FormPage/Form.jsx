import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTypes, addPokemon } from "../../Redux/actions";
import './Form.css'

const imagenExReg = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;

function validate(form){
    let errors = {}

   if(!form.name){
       errors.name = "Obligatory field";
       }else{
           errors.name = "" ;
       }
        if(form.name.length < 4 || form.name.length > 15) {
           errors.name = 'Name must be longer than three characters... And less than 15!'
       } else if(!/^[a-zA-Z\s]*$/.test(form.name)) {
           errors.name = "only letters and spaces"
       }
       if(!form.image){
           errors.image = "Obligatory field";
       }else{
           errors.image= "";
       }
        if(!imagenExReg.test(form.image)){
           errors.image = "image invalid"
       }
       if(form.hp === 0 || form.attack === 0 || form.defense === 0 || form.speed === 0) {
           errors.hp = 'Complete all stats!'
       }
   
       return errors
}

export default function Form (){
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const typesAll = useSelector(state => state.types) // mediante useSelector accedo a la parte del estado types que contiene a todos los temperamentos y los guardo en typesAll.

 function handleClick() { //funcion que navega al home
    navigate('/home');
  }

 useEffect(() => {
    dispatch(getTypes());
 }, [dispatch]);

 const [form, setForm] = useState({ //estado inicial del formulario
    name: '',
    image: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: []
 })

 const [errors, setErrors] = useState({
})

 function handleChange (event){ // cambio del estado inicial al que escriba el usuario
    const property = event.target.name; 
    const value = event.target.value;
    setErrors(validate({...form, [property]: value}))
    setForm({
        ...form,
        [property]: value
    })
}

function selectHandle (event){
    if (form.types.includes(event.target.value)) {
        alert("Ese tipo ya esta seleccionado");
        return;
      }
    setForm({
        ...form,
        types: [...form.types, event.target.value],
    })
};
function handleDelete(event) {
    setForm({
      ...form,
      types: form.types.filter((type) => type !== event),
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(addPokemon(form));
    setForm({
        name: '',
        image: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [] 
    })
    alert("create")
  };

  const isFormValid = () => {
    return form.name && form.types && form.image;
  };


    return(
        <div>
       <button className="home" onClick={handleClick}>
            Go to Home
        </button>
    <form className="creat" onSubmit={submitHandler}>

{/*NAME*/}
        <div>
            <label>Name: </label>
            <input type="text" value={form.name} name="name" onChange={handleChange} />
            {errors.name && <span>{errors.name}</span>}
        </div>
{/*iMAGEN*/}        
        <div>
            <label>Image URL: </label>
            <input type="url" value={form.image} name="image" onChange={handleChange} />
            {errors.image && <span>{errors.image}</span>}
        </div>
        <div>
            <label>Hit Points: </label>
            <input type="range" min='1' max='200' value={form.hp} name="hp" onChange={handleChange}/>
            <span>{form.hp}</span> {/* Mostrar el valor seleccionado */}
            {errors.hp && <span>{errors.hp}</span>}
        </div>
        <div>
            <label>Attack: </label>
            <input type="range" min='1' max='200' value={form.attack} name="attack" onChange={handleChange} />
            <span>{form.attack}</span>
        </div>
        <div>
            <label>Defense: </label>
            <input type="range" min='1' max='200' value={form.defense} name="defense" onChange={handleChange} />
            <span>{form.defense}</span>
        </div>
        <div>
            <label>Speed: </label>
            <input type="range" min='1' max='200' value={form.speed} name="speed" onChange={handleChange} />
            <span>{form.speed}</span>
        </div>
        <div>
            <label>Height: </label>
            <input type="range" min='1' max='200' value={form.height} name="height" onChange={handleChange} />
            <span>{form.height}</span>
        </div>
        <div>
            <label>Weight: </label>
            <input type="range" min='1' max='200' value={form.weight} name="weight" onChange={handleChange} />
            <span>{form.weight}</span>
        </div>
        <div>
            <label>Type: </label>
            <select name="types"  value={form.types} onChange={selectHandle} >
                <option value="" >Select types</option>
                {typesAll.map((type) => ( //bucle map para generar las opciones de tipo basadas en el estado typesAll que se obtiene del store de Redux
                <option key={type.id} value={type.name}>
                {type.name}
                </option>
                ))}
            </select>
            <div>
        {form.types.map((selectedType) => (
          <span key={selectedType}>
            {selectedType}
            <button onClick={() => handleDelete(selectedType)}>X</button>
          </span>
        ))}
      </div>
        </div>
        <button className="botonCreat" type="submit" disabled={!isFormValid()}>Create POKEMON</button>
    </form>

    </div>
    )
};