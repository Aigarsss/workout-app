import { mockData } from '@App/MockApi/mockData';
import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';


// TODO types
const formReducer = (state: any, event: { [key: string]: any }) => {
    return {
        ...state,
        [event.name]: event.value
    };
};

const defaultState = {
    roundLength: 3,
    breakLength: 2,
    totalRounds: 5
};

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useReducer(formReducer, defaultState);
    const types = [
        {
            label: 'No Excercise',
            code: 'noExcercise'
        },
        {
            label: 'Abs',
            code: 'abs'
        },
        {
            label: 'Legs',
            code: 'legs'
        },
        {
            label: 'Chest',
            code: 'chest'
        },
        {
            label: 'Triceps',
            code: 'triceps'
        },
        {
            label: 'Warm Up',
            code: 'warmUp'
        },
        {
            label: 'Shoulders',
            code: 'shoulders'
        }
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value
        });
    };

    console.log(formData);

    return (
        <form
            onSubmit={(event: React.SyntheticEvent) => {
                event.preventDefault();
                // navigate('/workout');
            }}
        >
            <label htmlFor="roundLength">Round duration</label>
            <input type="number" defaultValue={1} name="roundLength" onChange={handleChange} />

            <label>Break duration</label>
            <input type="number" defaultValue={1} name="breakLength" onChange={handleChange} />

            <label>Round count</label>
            <input type="number" defaultValue={1} name="totalRounds" onChange={handleChange} />

            <label>
           <p>Apples</p>
           <select name="apple" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="fuji">Fuji</option>
               <option value="jonathan">Jonathan</option>
               <option value="honey-crisp">Honey Crisp</option>
           </select>
         </label>

            <fieldset>
                <legend>Select excercise types</legend>
                {types.map((type) => {
                    return (
                        <div key={type.code}>
                            <input
                                type="checkbox"
                                id={type.code}
                                name={type.code}
                                value={type.code}
                                onChange={handleChange}
                            />
                            <label htmlFor={type.code}>{type.label}</label>
                        </div>
                    );
                })}
            </fieldset>

            <button>Button</button>
        </form>
    );
};

export default Home;
