import { createContext, useContext } from 'react';
import React from 'react';
import { useApp, UseApp } from '@App/Context/useApp';

const WorkoutContext = createContext<UseApp>({} as UseApp);

const WorkoutContextProvider: React.FC = ({ children }) => {
    const data = useApp();

    return <WorkoutContext.Provider value={{ ...data }}> {children} </WorkoutContext.Provider>;
};

export default WorkoutContextProvider;

export const useWorkoutContext = () => useContext(WorkoutContext);
