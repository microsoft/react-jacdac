import {
    ButtonReg,
    JDService,
    PotentiometerReg,
    RelayReg,
    ServiceFilter,
    SRV_BUTTON,
    SRV_POTENTIOMETER,
    SRV_RELAY,
} from "jacdac-ts"
import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import bus from "./bus"
import { JacdacProvider } from "../context/Context"
import SimulatorToolbar from "./SimulatorToolbar"
import { useServices } from "../hooks/useServices"
import { useRegister } from "../hooks/useRegister"
import { useRegisterBoolValue } from "../hooks/useRegisterValue"

const DemoService = (props: { identifier: number; service: JDService }) => {
    const { identifier, service } = props
    const register = useRegister(service, identifier)
    const active = useRegisterBoolValue(register)
    return (
        <span style={{ marginLeft: "0.5rem" }}>
            {register.name}: {active ? "on" : "off"}
        </span>
    )
}

const Demo = (props: { identifier: number } & ServiceFilter) => {
    const { identifier } = props
    const services = useServices(props)
    return (
        <>
            <SimulatorToolbar />
            <p>registers: {services.length}</p>
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        service {service.friendlyName}{" "}
                        {service.specification.name}
                        <DemoService
                            service={service}
                            identifier={identifier}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

const StoryContext = (props: { identifier: number } & ServiceFilter) => {
    return (
        <JacdacProvider initialBus={bus}>
            <Demo {...props} />
        </JacdacProvider>
    )
}

export default {
    title: "Jacdac/useRegisterBoolValue",
    component: StoryContext,
    argTypes: {
        serviceClass: { control: "number" },
        identifier: { control: "number" },
    },
} as ComponentMeta<typeof StoryContext>

const Template: ComponentStory<typeof StoryContext> = args => (
    <StoryContext {...args} />
)

export const RelayActive = Template.bind({})
RelayActive.args = {
    serviceClass: SRV_RELAY,
    identifier: RelayReg.Active,
}
