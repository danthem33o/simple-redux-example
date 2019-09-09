import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntitiesList from '../components/EntitiesList';
import toArray from '../utils/toArray';

type Entity = { name: string, value: any };

interface PropsFromState {
    entities?: Entity[];
}

class EntitiesListContainer extends Component<Partial<PropsFromState>> {
    render () {
        const {
            entities
        } = this.props;

        return <EntitiesList entities={entities || []} />;
    }
}

const mapStateToProps = (state: any = {}) => {
    return {
        entities: toArray<any, Entity>(state.entities, p => ({ name: p, value: state.entities[p] }))
    }
};

export default connect(mapStateToProps)(EntitiesListContainer);