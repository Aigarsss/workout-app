import { mockData } from '@App/MockApi/mockData';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                navigate('/workout');
            }}
        >
            <label htmlFor="roundTime">Round duration</label>
            <input type="number" defaultValue={1} name="roundTime" />

            <label>Rest duration</label>
            <input type="number" defaultValue={1} />

            <label>Round count</label>
            <input type="number" defaultValue={1} />

            <fieldset>
                <legend>Select excercise types</legend>
                <div>
                    <input type="checkbox" name="abs" value="abs" />
                    <label htmlFor="abs">Abs</label>
                </div>
                <div>
                    <input type="checkbox" name="legs" value="legs" />
                    <label htmlFor="legs">Legs</label>
                </div>
            </fieldset>

            <button>Button</button>
        </form>
    );
};

export default Home;
