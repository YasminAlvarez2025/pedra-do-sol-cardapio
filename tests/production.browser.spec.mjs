import { test, expect } from '@playwright/test'

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:5177'
    ? route.continue()
    : route.abort())
})

test('links existentes do cardápio carregam a interface independente', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const path of ['/', '/#cardapio-coco-bambu', '/c/8Ks29']) {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('link[rel="stylesheet"][href*="/App-"]')).toHaveCount(1)
    await expect.poll(() => page.locator('#root').innerText()).toMatch(/CATEGORIAS|indisponível|não encontrad/i)
    await expect(page.locator('.tc-app')).toHaveCount(0)
    await expect(page.locator('link[rel="stylesheet"][href*="/CardsApp-"]')).toHaveCount(0)
  }
  expect(errors).toEqual([])
})
