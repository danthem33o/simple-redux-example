import React, { FC, ReactElement, useState } from 'react';

type Model = {
    touchedField: { [key: string]: any };
    errors: { [key: string]: any };
    values: { [key: string]: any };
};


export interface RenderPropAsChild {
    render(model: Model): ReactElement;
}

// The render prop pattern is a type of HOC. It works by passing it a component to render as a property, where the property 
// is a function that returns a coSmponent. 
// Then our common logic is injected into the function by calling it and passing the common logic in as arguments to the function.
const RenderPropAsChild: FC<RenderPropAsChild> = ({
    render
}) => {
    // This is an extremely simple example. Imagine this state tracked values of a form, particularly its values, errors and whether the fields have been touched.
    // This component shifts the responsiblity of tracking said fields away from the presentational component (in this example render(state), and allows it to
    // work out creating the form. It can then use thi render prop HOC to track the state of itself and consume common operations for setting/mutating/tracking state.
    const [state, setState] = React.useState<Model>({
        touchedField: {},
        errors: {},
        values: {}
    });

    return render(state);
}

// This Render prop will be consumed in the following way...
const ExamplePresentationComponent: FC<any> = (props) => {
    return (
        <form>
            { /* While this is a very useful pattern for moving very common logic into one place, there is a potential downside if the render prop has local state:
                everything rendered under 'RenderPropAsChild' will be re-rendered when state changes. This could potentially cause hundreds of re-renders and re-render a full view! 
                In our case, to update values, every time a user types in the input we will be changing state and therefore causing a re-render. Imagine if this was a comments box with
                a max of 1000 characters. That's a possible of 1000 continuous re-renders, and imagine if this render prop was wrapped around a full view! That would cause incredibly slow render times.
                
                As an exercise, try and mimic this setup with multiple inputs on a large screen, where the render prop was wrapped around the full view. Watch how slow it gets! 
                Alternatively, drop this render prop component in a view, add some functions to update state and watch how it re-renders.
                */}
            <RenderPropAsChild 
                render={
                    // One of the benefits of render props is that you can see easily which properties you have access to and you know exactly where they're coming from. One of the major issues
                    // with more typical higher order components is that you can't tell exactly where the properties your component is recieving have come from. This can make code clean up
                    // removing redundant code difficult. However, the more render props you use the more likely you can find yourself in 'pyramid hell'; a scenario where you have so many 
                    // properties being passed to you by render props that if you try to alter your render prop or remove it from the component, it breaks all of the code inside of it. 
                    ({ values, errors, touchedField } /* statePassedFromRenderAsChild */) => (
                        <>
                            <input name='userName' value={values['userName']} className={!!errors['userName'] ? 'error' : ''} />
                            <input name='password' value={values['password']} className={!!errors['password'] ? 'error' : ''} />
                        </>
                    )
                }
            />
        </form>
    )
}