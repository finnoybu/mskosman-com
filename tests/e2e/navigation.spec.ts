import { test, expect, type Page } from '@playwright/test';

// The home page links to Lesson Plans; Lesson Plans is the hub that links to
// the Subjects and Grades indexes. These tests follow that real path.

async function openLessonPlans(page: Page) {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Lesson Plans' }).first().click();
  await expect(page).toHaveURL(/\/lesson-plans\/?$/);
  await expect(page.locator('h1')).toBeVisible();
}

async function openFirstLesson(page: Page, hrefContains: string) {
  const lessonLink = page.locator(`main a[href*="${hrefContains}"]`).first();
  await expect(lessonLink).toBeVisible();
  await lessonLink.click();
  await expect(page).toHaveURL(/\/lessons\/[^/]+\/?$/);
  await expect(page.locator('article h1')).toBeVisible();
}

test.describe('Navigation Flow', () => {
  test('home → lesson plans → subjects → subject detail → lesson', async ({ page }) => {
    await openLessonPlans(page);

    await page.locator('main a[href="/subjects"]').first().click();
    await expect(page).toHaveURL(/\/subjects\/?$/);
    await expect(page.locator('h1')).toBeVisible();

    await page.locator('main a[href="/subjects/mathematics"]').first().click();
    await expect(page).toHaveURL(/\/subjects\/mathematics\/?$/);
    await expect(page.locator('h1')).toBeVisible();

    await openFirstLesson(page, '/lessons/mathematics-k');
  });

  test('home → lesson plans → grades → grade detail → lesson', async ({ page }) => {
    await openLessonPlans(page);

    await page.locator('main a[href="/grades"]').first().click();
    await expect(page).toHaveURL(/\/grades\/?$/);
    await expect(page.locator('h1')).toBeVisible();

    await page.locator('main a[href="/grades/4"]').first().click();
    await expect(page).toHaveURL(/\/grades\/4\/?$/);
    await expect(page.locator('h1')).toBeVisible();

    await openFirstLesson(page, '/lessons/');
  });
});

test.describe('Phone layout', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test('menu button opens the nav and pages fit the screen', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#nav-toggle');
    const panel = page.locator('#mobile-nav');
    await expect(toggle).toBeVisible();
    await expect(panel).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(panel).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();

    await toggle.click();
    await panel.getByRole('link', { name: 'Lesson Plans' }).click();
    await expect(page).toHaveURL(/\/lesson-plans\/?$/);

    for (const path of ['/', '/lesson-plans', '/grades/4', '/lessons/mathematics-4']) {
      await page.goto(path);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, `${path} scrolls sideways`).toBeLessThanOrEqual(clientWidth);
    }
  });
});
