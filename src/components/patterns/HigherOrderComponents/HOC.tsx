import React, { FC, useState } from 'react';

type Model = {
    touchedField: { [key: string]: any };
    errors: { [key: string]: any };
    values: { [key: string]: any };
};

interface HOCProps {
    PresentationalComponent: React.ElementType;
}

const HOC: FC<HOCProps> = ({
    PresentationalComponent
}) => {
    const [state, setState] = React.useState<Model>({
        touchedField: {},
        errors: {},
        values: {}
    });

    return (
        <PresentationalComponent {...state} />
    );
};

export default HOC;

// Consumed as...

// The presentational component doesn't care where the properties come from, only that it is passed to it. This leaved a much cleaner
// API to use the component, makes it more testable and re-usable across multiple projects but makes it harder to track down
// where the properties have come from.
const ExamplePresentationComponent: FC<Model> = ({
    touchedField,
    errors,
    values
}) => {
    return (
        <form>
            <input name='userName' value={values['userName']} className={!!errors['userName'] ? 'error' : ''} />
            <input name='password' value={values['password']} className={!!errors['password'] ? 'error' : ''} />
        </form>
    );
};

// Traditional higher order components make it more difficult to get the properties, but does allow us to shift the responsibility of rendering
// the HOC to another component.
const ExamplePage: FC<any> = () => {
    // The example page renders the HOC and passess the persentational component as the component
    // to render.
    return (
        <HOC 
            PresentationalComponent={ExamplePresentationComponent}
        />
    );
};