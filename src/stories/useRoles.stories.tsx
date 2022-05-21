import { DeviceFilter, SRV_BUTTON } from "jacdac-ts"
import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import bus from "./bus"
import { JacdacProvider } from "../context/Context"
import { useRoles } from "../hooks/useRoles"
import { useServiceProvider } from "./useServiceProvider"

const Demo = () => {
    const {
        roles: { button1, button2 },
    } = useRoles({
        button1: { serviceClass: SRV_BUTTON },
        button2: { serviceClass: SRV_BUTTON },
    })
    useServiceProvider({ serviceClass: SRV_BUTTON })
    useServiceProvider({ serviceClass: SRV_BUTTON })
    return (
        <>
            <p>roles:</p>
            <ul>
                <li>button1: {button1?.id || "unbound"}</li>
                <li>button2: {button2?.id || "unbound"}</li>
            </ul>
        </>
    )
}

const StoryContext = (props: DeviceFilter) => {
    useServiceProvider(props)
    return (
        <JacdacProvider initialBus={bus}>
            <Demo {...props} />
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

export const TwoButtons = Template.bind({})
