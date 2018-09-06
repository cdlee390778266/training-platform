import Vue from 'vue'
import App from '@/App.vue'

describe('App', () => {
  it('has created', () => {
  	expect(typeof App.created).toBe('function')
  })
})
