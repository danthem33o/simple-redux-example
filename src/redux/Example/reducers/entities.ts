import Action from "../actions/@types/Action";
import { AddActionPayload } from "../actions/addAction";

// This is a generic add reducer - its only job is to add anything to state with the privided target key.
const entities = (state: any = {}, { type, target, entity }: Action<AddActionPayload<any>>) => {
    // Every action requires a type in order to point to the correct case statement.
    switch (type) {
        case 'ADD_ENTITY': 
            if (!target || !entity) {
                return state;
            }

            // We never change state directly. To 'update' state we create and return a new object. 
            return {
                ...state,
                [target]: entity
            };

        default:
            // Every reducer switch statement MUST return state as its default case.
            return state;
    }
}

export default entities;