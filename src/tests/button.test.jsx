import { mount } from '@vue/test-utils'
import { describe, expect, it, test } from 'vitest'

import Button from '../components/ui/et-button/index.vue'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button type="primary" />)

    expect(wrapper.classes()).toContain('et-button--primary')
  })

  // expect(wrapper.findComponent(Search).exists()).toBeTruthy()

  test('render text', () => {
    const buttonText = 'hello world'
    const wrapper = mount(() => (
      <Button
        type="default"
        v-slots={{
          default: () => buttonText
        }}
      />
    ))

    expect(wrapper.text()).toEqual(buttonText)
  })

  test('handle click', async () => {
    const wrapper = mount(() => <Button type="primary" />)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
