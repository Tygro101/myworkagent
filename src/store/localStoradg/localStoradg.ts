import { AppState } from "../state";

const emptyState:AppState = {
    startWorkDate:''
}
export const loadState =():AppState=>{
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return emptyState;
        }
        return JSON.parse(serializedState);
    }catch(err){
        return undefined;
    }
}

export const saveState = (state:AppState)=>{
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }catch(err){
        
    }
}