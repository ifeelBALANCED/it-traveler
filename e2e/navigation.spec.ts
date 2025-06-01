import { test, expect } from '@playwright/test'

test.describe('Page Structure', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const title = await page.title()
    expect(title).toBeTruthy()
  })

  test('should have main content area', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    // Check if main content area exists and is visible
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Check if the page has some content
    const content = page.locator('main > *').first()
    await expect(content).toBeVisible()
  })
})
