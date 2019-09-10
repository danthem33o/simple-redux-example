import React, { FC, Component, useState } from 'react';

type Model = {
    touchedField: { [key: string]: any };
    errors: { [key: string]: any };
    values: { [key: string]: any };
};

interface HOCProps {
}

// Higher order components as decorators recieve the WrappedComponent as an argument and returns a component that returns the passed component.
// HOCs as decorators MUST be wrapped in a function that takes in the component to render as an argument. The function MUST then return a
// component. This is the most common form of HOCs in our system.
const decoratedHoc = (WrappedComponent) => {
    return class HOC extends Component {
        state = {
            touchedField: {},
            errors: {},
            values: {}
        };
        
        render () {
            return <WrappedComponent {...this.state} />;
        }
    }
};

export default decoratedHoc;

// Consumed as...

// Functional components does not allow us to use '@' to wrap our decorators around our components.
const PresentationalComponent = decoratedHoc(({
    values,
    errors
}) => {
    return (
        <form>
            <input name='userName' value={values['userName']} className={!!errors['userName'] ? 'error' : ''} />
            <input name='password' value={values['password']} className={!!errors['password'] ? 'error' : ''} />
        </form> 
    );
});

// or...

// Class components can be decorated by using '@', then the class (component in this case) it sits above is passed in automatically to the decorator 
// HOC.
@decoratedHoc
class PresentationalComponentAsClass extends Component<any> {
    render () {
        const { 
            values,
            errors
        } = this.props;

        return (
            <form>
                <input name='userName' value={values['userName']} className={!!errors['userName'] ? 'error' : ''} />
                <input name='password' value={values['password']} className={!!errors['password'] ? 'error' : ''} />
            </form>
        );
    }
}