import React, { Component } from 'react'
import { connect } from 'react-redux';
import AddEntity from '../components/AddEntity';
import { Dispatch } from 'redux';
import Action from '../redux/Example/actions/@types/Action';
import addAction, { AddActionPayload } from '../redux/Example/actions/addAction';

interface PropsFromDispatch {
    addToStore?: (target: string, entity: any) => void;
}

class AddEntityContainer extends Component<PropsFromDispatch> {
    private handleAddEntityToStore = (name: string, value: any) => {
        const {
            addToStore
        } = this.props; 
        
        addToStore && addToStore(name, value);
    }

    render () {
        return <AddEntity addEntityToStore={this.handleAddEntityToStore} />;
    }
}

// We don't need to map anything from state, this is only responsible for updating state!
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action<AddActionPayload<any>>>) => {
    return {
        addToStore: (target: string, entity: any) => dispatch(addAction({target, entity})) 
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddEntityContainer);