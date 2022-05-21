import { DeviceFilter, SRV_BUTTON } from "jacdac-ts"
import React from "react"
import { useDevices } from "../hooks/useDevices"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import bus from "./bus"
import { JacdacProvider } from "../context/Context"

const Demo = (props: DeviceFilter) => {
    console.log(props)
    const devices = useDevices(props)
    return (
        <ul>
            {devices.map(device => (
                <li key={device.id}>device {device.describe()}</li>
            ))}
        </ul>
    )
}

const StoryContext = (props: DeviceFilter) => {
    return (
        <JacdacProvider initialBus={bus}>
            <Demo {...props} />
        </JacdacProvider>
    )
}

export default {
    title: "Jacdac/useDevices",
    component: StoryContext,
    argTypes: {
        serviceClass: { control: "number" },
        serviceName: { control: "text" },
    },
} as ComponentMeta<typeof StoryContext>

const Template: ComponentStory<typeof StoryContext> = args => (
    <StoryContext {...args} />
)

export const NoFilter = Template.bind({})
NoFilter.args = {}

export const ButtonsByName = Template.bind({})
ButtonsByName.args = {
    serviceName: "button",
}

export const ButtonsByServiceClass = Template.bind({})
ButtonsByServiceClass.args = {
    serviceClass: SRV_BUTTON,
}
