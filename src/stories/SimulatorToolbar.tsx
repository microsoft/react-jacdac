import { SRV_BUTTON, SRV_LED, SRV_POTENTIOMETER } from "jacdac-ts"
import React from "react"
import SimulatorButton from "./SimulatorButton"

export default function SimulatorToolbar(props: {}) {
    return (
        <div>
            <SimulatorButton serviceClass={SRV_BUTTON} />
            <SimulatorButton serviceClass={SRV_BUTTON} />
            <SimulatorButton serviceClass={SRV_POTENTIOMETER} />
            <SimulatorButton serviceClass={SRV_LED} />
        </div>
    )
}
