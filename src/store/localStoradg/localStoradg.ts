import { AppState } from "../state";

const emptyState:AppState = {
    generalSettings:{start:false},
    startWorkDate:'',
    days:[],
    months:[],
    years:[]
}
export const loadState =():AppState=>{
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return emptyState;
        }
        return emptyState;//JSON.parse(serializedState);
    }catch(err){
        return undefined;
    }
}

export const saveState = (state:AppState)=>{
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', '');
    }catch(err){
        
    }
}