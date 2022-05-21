import { DeviceFilter } from "jacdac-ts"
import React from "react"
import { useDevices } from "../hooks/useDevices"
import { ComponentStory, ComponentMeta } from "@storybook/react"

const Demo = (props: DeviceFilter) => {
    const devices = useDevices(props)
    return (
        <li>
            {devices.map(device => (
                <ul key={device.id}>device {device.name}</ul>
            ))}
        </li>
    )
}

export default {
    title: "Jacdac/useDevices",
    component: Demo,
    argTypes: {
        serviceClass: { control: "number" },
        serviceName: { control: "text" },
    },
} as ComponentMeta<typeof Demo>

const Template: ComponentStory<typeof Demo> = args => <Demo {...args} />

export const NoFilter = Template.bind({})
NoFilter.args = {}
