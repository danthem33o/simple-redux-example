import React, { FunctionComponent, useState } from 'react';

export interface AddEntityProps { addEntityToStore: (name: string, value: any) => void };

// We're saving each input's values to local state here to speed up re-rendering. If we were to add this to redux state
// it would greatly reduce the speed of our application. This is due to how we update Redux; every time we want to update
// Redux state we MUST dispatch actions, catch the action in a reducer and then manipulate the state.  

// It's far quicker to put small bits of state like this in the component's local state. If you do this you must be wary
// of where the local state lives. Remember: everytime you update state (redux & local state!) it WILL cause a re-render, 
// and if a component re-renders then it will also re-render all of its children.

// There is a way we can actually optimise this component to keep re-renders down. Consider the point above. This optimisation 
// is a common component pattern in React!
// Can you see how?
const AddEntity: FunctionComponent<AddEntityProps> = ({ addEntityToStore }) => {
    const [ entityName, setEntityName ] = useState('');
    const [ entityValue, setEntityValue ] = useState(null);

    const handleUpdateEntityName = (e: any) => setEntityName(e.target.value);
    const handleUpdateEntityValue = (e: any) => setEntityValue(e.target.value);
    
    const handleAddEntity = () => {
        addEntityToStore(entityName, entityValue)

        setEntityName(''); 
        setEntityValue(null);
    };

    return (
        <div>
            <input type='text' name='entityName' required onChange={handleUpdateEntityName} style={{ marginRight: 10 }} />
            <input type='text' name='entityValue' required onChange={handleUpdateEntityValue} />
            <br />

            <button onClick={handleAddEntity} style={{ marginTop: 10 }}>
                Add Entity!
            </button>
        </div>
    );
};

export default AddEntity;