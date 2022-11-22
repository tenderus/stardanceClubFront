import React from "react";

type OptionContext = {
    option: string
}

export const OptionContext = React.createContext<OptionContext>({option: ''});