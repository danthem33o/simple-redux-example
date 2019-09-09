import React, { FunctionComponent } from 'react';

type Entity = { name: string, value: any };

export interface EntitiesListProps {
    entities: Entity[];
}

const EntitiesList: FunctionComponent<EntitiesListProps> = ({
    entities
}) => {
    return (
        <>
            <h1>Entities List</h1>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Value</td>  
                    </tr>
                </thead>
                <tbody>
                    {
                        entities.map(p => (
                            <tr key={p.name}>
                                <td>{p.name}</td>
                                <td>{p.value}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
};

export default EntitiesList;