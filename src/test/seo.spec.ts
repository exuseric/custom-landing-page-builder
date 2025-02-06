import { describe, it, expect, assert } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { getData } from '../../src/utils/pocketbase';
const record = await getData();

const htmlPath = path.resolve(__dirname, `../../build/${record.finalUrl.slice(8)}/index.html`);
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

describe('SEO Checklist Tests', () => {
    it('Title tag with maximum 60 characters', () => {
        const title = document.querySelector('title') as HTMLTitleElement;
        expect(title).not.toBeNull();
        expect(title?.textContent?.length).toBeLessThanOrEqual(60);
    });

    it('Meta description tag with maximum 160 characters', () => {
        const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        expect(metaDesc).not.toBeNull();
        expect(metaDesc.content.length).toBeLessThanOrEqual(160);
    });

    it('Search console meta tag', () => {
        const metaDesc = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement;
        expect(metaDesc).not.toBeNull();
        expect(metaDesc.content).not.toBe('');
    });

    it('One H1 tag on the page', () => {
        const h1Tags = document.querySelectorAll('h1');
        expect(h1Tags.length).toBe(1);
    });

    it('iframe has title', () => {
        const iframe = document.querySelector('iframe')
        const title = iframe?.getAttribute("title")
        expect(title).not.toBeNull()
    })

    it('Properly structured heading hierarchy', () => {
        const headings = document.querySelectorAll('h2, h3') as NodeListOf<HTMLHeadingElement>;

        // Ensure at least one H2 exists
        const h2Tags = Array.from(headings).filter(h => h.tagName === 'H2');
        expect(h2Tags.length).toBeGreaterThan(0);

        // Validate structure of headings
        let lastH2: HTMLHeadingElement | null = null;

        headings.forEach((heading: HTMLHeadingElement, index: number) => {
            const tagName = heading.tagName;

            if (tagName === 'H2') {
                // Update the last seen H2 and ensure it has text
                lastH2 = heading;
                assert(expect(heading?.textContent?.trim()).not.toBe(''), `H2 at position ${index} is empty.`);
            } else if (tagName === 'H3') {
                // Ensure H3 has text
                assert(expect(heading?.textContent?.trim()).not.toBe(''), `H3 at position ${index} is empty.`);

                // Ensure there's a preceding H2 for this H3
                assert(expect(lastH2).toBeTruthy(), `H3 at position ${index} is not preceded by an H2.`);
            }
        });
    });

    it('Non-empty alt text', () => {
        const images = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
        images.forEach((img) => {
            const src = img.getAttribute('src') || 'unknown source';
            const hasAlt = img.hasAttribute('alt');
            // First check: alt attribute exists
            expect(hasAlt, `Image (${src}) is missing alt attribute`).toBe(true);

            if (hasAlt) {
                // Second check: alt text is not empty
                const altText = img.getAttribute('alt');
                if (altText) {
                    expect(altText.trim()).not.toBeNull();
                    expect(altText.trim().length, `${src} has empty alt text`).toBeGreaterThan(0);
                }
            }
        });
    });

    it('Valid canonical tag', () => {
        const canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

        // Check if canonical tag exists
        expect(canonicalTag, 'Canonical tag is missing').not.toBeNull();

        // Check if href attribute exists and is not empty
        const href = canonicalTag.getAttribute('href');
        expect(href, 'Canonical tag is missing href attribute').not.toBeNull();
        href && expect(href.trim().length, 'Canonical tag has empty href').toBeGreaterThan(0);

        // Check if href is a valid URL
        href && expect(() => new URL(href), 'Canonical tag href is not a valid URL').not.toThrow();
    });

    it('External link to Yellow Pages', () => {
        const links = document.querySelectorAll('a[href]') as NodeListOf<HTMLLinkElement>;
        const validExternalDomains = [
            'https://www.paginasamarelas.co.ao/',
            'https://www.paginasamarelas.cv/',
            'https://www.pajinakinur.tl/',
            'https://www.yellowpageskenya.com/',
            'https://www.paginasamarelas.co.mz/',
            'https://www.paginasamarelas.st/',
            'https://www.yellow.co.tz/',
            'http://www.yellowpages.co.ug/'
        ];

        // Find external links that match our valid domains
        const externalLinks = Array.from(links).filter(link => {
            const href = link.getAttribute('href');
            return validExternalDomains.some(domain =>
                href?.toLowerCase()?.includes(domain)
            );
        });

        expect(externalLinks, 'No external links found on the page').toBeTruthy();

        // Check for Yellow Pages link, including within list items
        const yellowPagesLink = Array.from(links).some(link => {
            const href = link.getAttribute('href');
            const linkText = link?.textContent?.toLowerCase();
            const parentListText = link?.closest('li')?.textContent?.toLowerCase() || '';

            return validExternalDomains.some(domain => href?.toLowerCase()?.includes(domain)) ||
                linkText?.includes('yellow pages') ||
                parentListText.includes('yellow pages');
        });

        expect(yellowPagesLink, 'No link to Yellow Pages found').toBe(true);
    });

    it('Set to index', () => {
        const indexMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
        expect(indexMeta).not.toBeNull();
        expect(indexMeta.content).toBe('index, follow');
    })

    it('All links should have an href attribute', () => {
        const links = document.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
        links.forEach(link => {
            const href = link.getAttribute('href');
            expect(href).not.toBeNull();
            expect(href?.trim()?.length).toBeGreaterThan(0); 
        })
    })
    // Add similar tests for other checklist items
});

describe('QA Checklist Tests', () => {
    it('Valid interactive elements (links, buttons, and navigation)', () => {
        // Check all buttons
        const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
        buttons.forEach(button => {
            const buttonText = button?.textContent?.trim();
            const type = button.getAttribute('type');

            // Check if button has proper configuration
            const hasFormAttr = button.hasAttribute('form') ||
                button.hasAttribute('formaction') ||
                button.closest('form');

            // If button has type, validate it's a proper value
            if (type) {
                expect(
                    ['submit', 'button', 'reset', 'menu'].includes(type),
                    `Button "${buttonText}" has invalid type: ${type}`
                ).toBe(true);

                // Additional checks based on button type
                if (type === 'submit') {
                    expect(
                        hasFormAttr,
                        `Submit button "${buttonText}" should be associated with a form`
                    ).toBe(true);
                }

                if (type === 'reset') {
                    expect(
                        hasFormAttr,
                        `Reset button "${buttonText}" should be associated with a form`
                    ).toBe(true);
                }
            } else {
                // If no type, must have onclick or form association
                expect(
                    hasFormAttr,
                    `Button "${buttonText}" missing type needs onclick handler or form association`
                ).toBe(true);
            }
        });
    });

    it('Responsive design elements are present', () => {
        // Check viewport meta tag
        const viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        expect(viewportMeta, 'Viewport meta tag is missing').not.toBeNull();
        expect(
            viewportMeta.getAttribute('content'),
            'Viewport meta tag should include width and initial-scale'
        ).toMatch(/width=device-width.*initial-scale=1/);

        // Check for responsive images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src') || 'unknown source';

            // Check for srcset or picture element parent
            const hasResponsiveFeatures =
                img.hasAttribute('srcset') ||
                img.hasAttribute('sizes') ||
                img.closest('picture') !== null;

            // Check if image has max-width style or class
            const style = dom.window.getComputedStyle(img);
            const hasResponsiveStyle =
                style.maxWidth === '100%' ||
                img.className.includes('responsive') ||
                img.className.includes('fluid');

            expect(
                hasResponsiveFeatures || hasResponsiveStyle,
                `Image (${src}) should have responsive features (srcset, sizes, picture element) or responsive styling`
            ).toBe(true);
        });
    });
});

describe('Accessibility Tests', () => {
    it('Toggle button should have toggle aria-expanded', () => { 
        const toggleButton = document.querySelector('[data-menu-toggle]') as HTMLButtonElement;
        const hasAriaExpanded = toggleButton.hasAttribute('aria-expanded')

        assert(expect(hasAriaExpanded).toBe(true), 'Toggle button should have aria-expanded attribute');
    })
});