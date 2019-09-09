import React, { FC, ReactElement, useState } from 'react';

type Model = {
    touchedField: { [key: string]: any };
    errors: { [key: string]: any };
    values: { [key: string]: any };
};

export interface RenderPropAsChild {
    // Overwrite Reacts implementation of children and force it to expect a function.
    children(model: Model): ReactElement;
}

// The render prop pattern is a type of HOC. It works by passing it a component to render as a property, where the property 
// is a function that returns a coSmponent. 
// Then our common logic is injected into the function by calling it and passing the common logic in as arguments to the function.
const RenderPropAsChild: FC<RenderPropAsChild> = ({
    children
}) => {
    // This is an extremely simple example. Imagine this state tracked values of a form, particularly its values, errors and whether the fields have been touched.
    // This component shifts the responsiblity of tracking said fields away from the presentational component (in this example children(state), and allowes it to
    // work out creating the form. It can then use thi render prop HOC to track the state of itself and consume common operations for setting/mutating/tracking state.
    const [state, setState] = React.useState<Model>({
        touchedField: {},
        errors: {},
        values: {}
    });

    // Finally, we call the childen function to get the presentation component. The property name can be an arbitrary, however React allows you to overwrite its 
    // standard children interface by specifying it in the interface above. 
    return children(state);
}

// This Render prop will be consumed in the following way...
const ExamplePresentationComponent: FC<any> = (props) => {
    return (
        <form>
            <RenderPropAsChild>
                {
                    // The values have been passed down from RenderPropAsChild
                    ({ values, errors, touchedField } /* statePassedFromRenderAsChild */) => (
                        <>
                            <input name='userName' value={values['userName']} className={!!errors['userName'] ? 'error' : ''} />
                            <input name='password' value={values['password']} className={!!errors['password'] ? 'error' : ''} />
                        </>
                    )
                }
            </RenderPropAsChild>
        </form>
    )
}