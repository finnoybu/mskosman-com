import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test('should navigate: home → subjects → subject detail → lesson', async ({
    page,
  }) => {
    // Navigate to home
    await page.goto('/');
    expect(page.url()).toContain('/');

    // Check home page loads
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Navigate to subjects page
    await page.click('a[href="/subjects"]');
    expect(page.url()).toContain('/subjects');

    // Subjects page should load
    const subjectsHeading = page.locator('h1');
    await expect(subjectsHeading).toBeVisible();

    // Click on Mathematics subject
    await page.click('a[href="/subjects/mathematics"]');
    expect(page.url()).toContain('/subjects/mathematics');

    // Subject detail page should load
    const subjectHeading = page.locator('h1');
    await expect(subjectHeading).toBeVisible();

    // Click on a lesson (first grade)
    const firstLessonLink = page.locator('a[href*="/lessons/mathematics-k"]').first();
    await expect(firstLessonLink).toBeVisible();
    await firstLessonLink.click();

    // Should navigate to lesson without 404
    await page.waitForURL(/\/lessons\/.*/, { timeout: 5000 });
    expect(page.url()).toContain('/lessons/');

    // Lesson page should have content
    const lessonHeading = page.locator('article h1');
    await expect(lessonHeading).toBeVisible();
  });

  test('should navigate: home → grades → grade detail → lesson', async ({
    page,
  }) => {
    // Navigate to home
    await page.goto('/');
    expect(page.url()).toContain('/');

    // Navigate to grades page
    await page.click('a[href="/grades"]');
    expect(page.url()).toContain('/grades');

    // Grades page should load
    const gradesHeading = page.locator('h1');
    await expect(gradesHeading).toBeVisible();

    // Click on Grade 4
    await page.click('a[href="/grades/4"]');
    expect(page.url()).toContain('/grades/4');

    // Grade detail page should load
    const gradeHeading = page.locator('h1');
    await expect(gradeHeading).toBeVisible();

    // Click on a lesson
    const firstLessonLink = page.locator('a[href*="/lessons/"]').first();
    await expect(firstLessonLink).toBeVisible();
    await firstLessonLink.click();

    // Should navigate to lesson without 404
    await page.waitForURL(/\/lessons\/.*/, { timeout: 5000 });
    expect(page.url()).toContain('/lessons/');

    // Lesson page should have content
    const lessonHeading = page.locator('article h1');
    await expect(lessonHeading).toBeVisible();
  });
});
