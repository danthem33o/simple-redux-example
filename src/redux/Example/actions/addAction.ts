import Action from "./@types/Action";

export type AddActionPayload <TEntity> = { target: string; entity: TEntity };

const addAction = <TEntity> ({ target, entity }: AddActionPayload<TEntity>): Action<AddActionPayload<TEntity>> => ({
    type: 'ADD_ENTITY',
    target,
    entity
});

export default addAction;