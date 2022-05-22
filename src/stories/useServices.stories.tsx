import { DeviceFilter, ServiceFilter, SRV_BUTTON } from "jacdac-ts"
import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import bus from "./bus"
import { JacdacProvider } from "../context/Context"
import SimulatorToolbar from "./SimulatorToolbar"
import { useServices } from "../hooks/useServices"

const Demo = (props: ServiceFilter) => {
    const services = useServices(props)
    return (
        <>
            <SimulatorToolbar />
            <p>devices: {services.length}</p>
            <ul>
                {services.map(service => (
                    <li key={service.id}>service {service.friendlyName} {service.specification.name}</li>
                ))}
            </ul>
        </>
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
    title: "Jacdac/useServices",
    component: StoryContext,
    argTypes: {
        serviceClass: { control: "number" },
        serviceName: { control: "text" },
        announced: { control: "boolean" },
    },
} as ComponentMeta<typeof StoryContext>

const Template: ComponentStory<typeof StoryContext> = args => (
    <StoryContext {...args} />
)

export const NoFilter = Template.bind({})
NoFilter.args = {}

export const Announced = Template.bind({})
Announced.args = {
    announced: true,
}

export const ButtonsByName = Template.bind({})
ButtonsByName.args = {
    serviceName: "button",
    announced: true,
}

export const ButtonsByServiceClass = Template.bind({})
ButtonsByServiceClass.args = {
    serviceClass: SRV_BUTTON,
    announced: true,
}
