import React from 'react'
import { render } from '@testing-library/react'

export function createRendererWithProviders(providers) {
  const AllTheProviders = ({ children }) => {

    return providers.reduceRight(
      ((inner, config) => React.createElement(config[0], config[1], inner) )
      , children
    )
  }

  return (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options })
}