import React from "react"
import { JacdacProvider } from "../src/context/Context"

export const decorators = [Story => <JacdacProvider>{Story()}</JacdacProvider>]

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}
