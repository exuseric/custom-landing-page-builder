/**
 * Generates a clean domain-friendly string from a business title by removing 
 * punctuation, business suffixes, and formatting for subdomain use.
 * 
 * The function performs the following transformations:
 * 1. Converts to lowercase
 * 2. Replaces '&' with 'and'
 * 3. Removes punctuation and symbols
 * 4. Removes common business suffix words (co, inc, llc, etc.)
 * 5. Removes all non-alphanumeric characters
 * 
 * @param {string} title - The business or organization title to convert
 * @returns {string} A clean, alphanumeric string suitable for use as a subdomain
 * 
 * @example
 * // Basic company name
 * generateDomain("Acme Corp") // returns "acme"
 * 
 * @example  
 * // Name with punctuation and ampersand
 * generateDomain("Smith & Jones, LLC") // returns "smithandjones"
 * 
 * @example
 * // Complex business name
 * generateDomain("ABC Consulting Services, Inc.") // returns "abc"
 * 
 * @example
 * // Name with multiple suffixes
 * generateDomain("Global Tech Solutions Group") // returns "globaltech"
 */
export function generateDomain(title: string): string {
    return title
        .toLowerCase()
        // Replace & with 'and' first
        .replace(/&/g, ' and ')
        // Remove decorative punctuation and symbols first
        .replace(/[.'&\-,;:!?()[\]{}"|]/g, ' ')
        // Clean up extra spaces
        .replace(/\s+/g, ' ')
        .trim()
        // Remove specific business suffix words
        .split(' ')
        .filter(word => {
            const businessSuffixes = [
                'co', 'company', 'corp', 'corporation', 'ltd', 'limited', 'inc', 
                'incorporated', 'llc', 'plc', 'gmbh', 'sa', 'lda', 'sarl', 
                'unipessoal', 'pty', 'pvt', 'associates', 'partners', 'group', 
                'holdings', 'enterprises', 'solutions', 'services', 'consulting', 
                'consultants', 'lawyers', 'law', 'firm'
            ];
            return !businessSuffixes.includes(word.toLowerCase());
        })
        .join('')
        // Remove any remaining non-alphanumeric characters
        .replace(/[^\w]/g, '');
}