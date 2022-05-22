import {
    ButtonReg,
    DeviceFilter,
    JDService,
    PotentiometerReg,
    ServiceFilter,
    SRV_BUTTON,
    SRV_POTENTIOMETER,
} from "jacdac-ts"
import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import bus from "./bus"
import { JacdacProvider } from "../context/Context"
import SimulatorToolbar from "./SimulatorToolbar"
import { useServices } from "../hooks/useServices"
import { useRegister } from "../hooks/useRegister"

const DemoService = (props: { identifier: number; service: JDService }) => {
    const { identifier, service } = props
    const register = useRegister(service, identifier)
    return <span style={{ marginLeft: "0.5rem" }}>{register.name}</span>
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
    title: "Jacdac/useRegister",
    component: StoryContext,
    argTypes: {
        serviceClass: { control: "number" },
        identifier: { control: "number" },
    },
} as ComponentMeta<typeof StoryContext>

const Template: ComponentStory<typeof StoryContext> = args => (
    <StoryContext {...args} />
)

export const ButtonPressure = Template.bind({})
ButtonPressure.args = {
    serviceClass: SRV_BUTTON,
    identifier: ButtonReg.Pressure,
}

export const SliderPosition = Template.bind({})
SliderPosition.args = {
    serviceClass: SRV_POTENTIOMETER,
    identifier: PotentiometerReg.Position,
}
