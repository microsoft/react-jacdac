import { SRV_BUTTON } from "jacdac-ts"
import React, { useState } from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import bus from "./bus"
import { JacdacProvider } from "../context/Context"
import { useRoles } from "../hooks/useRoles"
import { useServiceProvider } from "./useServiceProvider"
import { useServices } from "../hooks/useServices"
import SimulatorToolbar from "./SimulatorToolbar"

const Demo = () => {
    const {
        roles: { button1, button2, button3 },
    } = useRoles({
        button1: { serviceClass: SRV_BUTTON },
        button2: { serviceClass: SRV_BUTTON },
        button3: { serviceClass: SRV_BUTTON },
    })
    useServiceProvider({ serviceClass: SRV_BUTTON })

    const buttons = useServices({ serviceClass: SRV_BUTTON })
    return (
        <>
            <SimulatorToolbar />
            <p>buttons:</p>
            <ul>
                {buttons?.map(button => (
                    <li key={button.id}>{button.toString()}</li>
                ))}
            </ul>
            <p>roles:</p>
            <ul>
                <li>button1: {button1?.toString() || "unbound"}</li>
                <li>button2: {button2?.toString() || "unbound"}</li>
                <li>button3: {button3?.toString() || "unbound"}</li>
            </ul>
        </>
    )
}

const StoryContext = () => {
    return (
        <JacdacProvider initialBus={bus}>
            <Demo />
        </JacdacProvider>
    )
}

export default {
    title: "Jacdac/useRoles",
    component: StoryContext,
} as ComponentMeta<typeof StoryContext>

const Template: ComponentStory<typeof StoryContext> = args => (
    <StoryContext {...args} />
)

export const ThreeButtons = Template.bind({})
