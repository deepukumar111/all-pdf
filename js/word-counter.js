document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const sentenceCount = document.getElementById('sentence-count');
    const paragraphCount = document.getElementById('paragraph-count');
    const clearButton = document.getElementById('clear-text');
    const copyButton = document.getElementById('copy-text');

    // Update counts when text changes
    textInput.addEventListener('input', updateCounts);

    // Clear text functionality
    clearButton.addEventListener('click', function() {
        textInput.value = '';
        updateCounts();
    });

    // Copy text functionality
    copyButton.addEventListener('click', function() {
        textInput.select();
        document.execCommand('copy');
        
        // Show feedback
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyButton.innerHTML = originalText;
        }, 2000);
    });

    function updateCounts() {
        const text = textInput.value;

        // Count words
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        wordCount.textContent = words;

        // Count characters
        charCount.textContent = text.length;

        // Count sentences
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
        sentenceCount.textContent = sentences;

        // Count paragraphs
        const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
        paragraphCount.textContent = paragraphs;
    }

    // Initialize counts
    updateCounts();
}); 