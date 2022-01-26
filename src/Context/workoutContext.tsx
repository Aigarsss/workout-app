import { createContext, useContext, useReducer } from 'react';
import React from 'react';
import { useApp } from '@App/Context/useApp';

const WorkoutContext = createContext<any>({});

const WorkoutContextProvider: React.FC = ({ children }) => {
    const data = useApp();

    return <WorkoutContext.Provider value={{ ...data }}> {children} </WorkoutContext.Provider>;
};

export default WorkoutContextProvider;

export const useWorkoutContext = () => useContext(WorkoutContext);
