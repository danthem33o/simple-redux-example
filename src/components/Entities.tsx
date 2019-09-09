import React, { FunctionComponent } from 'react';
import EntitiesListContainer from '../containers/EntitiesListContainer';
import AddEntityContainer from '../containers/AddEntityContainer';

const Entities: FunctionComponent<any> = () => {
    return (
        <>
            <EntitiesListContainer />
            <br />
            <AddEntityContainer />
        </>
    );
}

export default Entities;